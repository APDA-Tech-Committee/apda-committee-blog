<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  author: {
    name: string
  }
  category: {
    name: string
    color: string
  }
  committee?: {
    name: string
    slug: string
  }
  _count: {
    comments: number
  }
}

interface BlogResponse {
  posts: Post[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const posts = ref<Post[]>([])
const pagination = ref({ page: 1, limit: 12, total: 0, pages: 0 })
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)

const fetchPosts = async (page: number = 1) => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts?page=${page}&limit=12&status=PUBLISHED`)
    if (!response.ok) throw new Error('Failed to fetch posts')
    const data: BlogResponse = await response.json()
    posts.value = data.posts
    pagination.value = data.pagination
    currentPage.value = page
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
}

const loadPage = async (page: number) => {
  loading.value = true
  await fetchPosts(page)
  loading.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await fetchPosts()
  loading.value = false
})
</script>

<template>
   <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(4,95,176,0.4),transparent_70%)] animate-pulse"></div>
      <div class="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <!-- Frosted centered hero block -->
      <div class="relative flex items-center justify-center px-6 py-12">
        <div class="relative max-w-3xl w-full mx-auto px-10 py-12 text-center backdrop-blur-xl bg-white/10 border clipped-30 border-white/20 shadow-2xl animate-float">
          
          <!-- Corner accents -->
          <div class="absolute top-0 left-0 w-8 h-8 bg-blue-600 opacity-20"></div>
          <div class="absolute top-0 right-0 w-6 h-6 bg-cyan-500 opacity-30"></div>
          <div class="absolute bottom-0 left-0 w-6 h-6 bg-indigo-600 opacity-25"></div>
          <div class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 opacity-20"></div>

          <h1 class="text-5xl font-black tracking-tight text-white mb-6 animate-text-stable leading-tight relative z-10">
            APDA
            <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient block mt-2 bg-[length:300%_300%]">
              Blog
            </span>
          </h1>
          <p class="text-lg text-gray-200 font-semibold uppercase tracking-wide relative z-10">
            Updates from APDA Committees
          </p>
        </div>
      </div>
    </div>



    <div class="max-w-7xl mx-auto px-8 py-16">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
      </div>

      <div v-else-if="error" class="text-center py-16">
        <div class="w-20 h-20 bg-red-500 mx-auto mb-6 clip-hexagon"></div>
        <p class="text-red-600 mb-2 text-xl font-bold uppercase tracking-wider">{{ error }}</p>
        <p class="text-gray-500 font-semibold">Unable to load posts.</p>
      </div>

      <div v-else-if="posts.length === 0" class="text-center py-16">
        <div class="w-20 h-20 bg-gray-400 mx-auto mb-6 transform rotate-45"></div>
        <p class="text-gray-500 text-xl font-bold uppercase tracking-wider">No posts available</p>
      </div>

      <div v-else>
        <div class="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-16">
          <BlogCard v-for="post in posts" :key="post.id" :post="post" />
        </div>

        <div v-if="pagination.pages > 1" class="flex flex-col items-center space-y-6">
          <div class="flex items-center space-x-2">
            <button
              @click="loadPage(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="px-4 py-3 bg-blue-600 text-white font-black uppercase tracking-widest border-2 border-blue-600 relative transition-all duration-300 disabled:opacity-40 clipped-12"
            >
              Prev
            </button>
            <button
              v-for="page in pagination.pages"
              :key="page"
              @click="loadPage(page)"
              class="px-5 py-3 font-bold uppercase tracking-wide border-2 relative transition-all duration-300 clipped-12"
              :class="[
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400'
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="loadPage(currentPage + 1)"
              :disabled="currentPage >= pagination.pages"
              class="px-4 py-3 bg-blue-600 text-white font-black uppercase tracking-widest border-2 border-blue-600 relative transition-all duration-300 disabled:opacity-40 clipped-12"
            >
              Next
            </button>
          </div>
          <div class="text-center px-6 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-gray-200 shadow-sm">
            <span class="text-sm font-semibold text-gray-800 tracking-wide">
              Showing {{ (currentPage - 1) * pagination.limit + 1 }}–{{ Math.min(currentPage * pagination.limit, pagination.total) }} of {{ pagination.total }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
