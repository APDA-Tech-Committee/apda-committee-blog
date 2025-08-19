<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BlogCard from '../components/BlogCard.vue'

interface Post {
  id: string
  title: string
  excerpt?: string
  publishedAt?: string
  author: {
    name: string
  }
  category: {
    name: string
    color: string
  }
  _count: {
    comments: number
  }
}

interface Committee {
  id: string
  name: string
  slug: string
  description: string
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

const route = useRoute()
const committee = ref<Committee | null>(null)
const posts = ref<Post[]>([])
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
  pages: 0
})
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)

const fetchCommittee = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/committees/${route.params.slug}`)
    if (!response.ok) {
      throw new Error('Committee not found')
    }
    const data = await response.json()
    committee.value = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  }
}

const fetchPosts = async (page: number = 1) => {
  try {
    const response = await fetch(`http://localhost:3000/api/committees/${route.params.slug}/posts?page=${page}&limit=10`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
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
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await Promise.all([fetchCommittee(), fetchPosts()])
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <div class="w-20 h-20 bg-red-500 mx-auto mb-6 clip-hexagon"></div>
      <p class="text-red-600 mb-4 font-bold text-xl uppercase">{{ error }}</p>
      <RouterLink to="/committees" class="text-blue-600 hover:text-blue-700 font-semibold">← Back to Committees</RouterLink>
    </div>

    <div v-else-if="committee">
      <!-- Hero -->
      <div class="relative bg-white border-b border-gray-200">
        <div class="relative flex items-center justify-center px-6 py-12">
          <div class="relative max-w-4xl w-full mx-auto px-8 py-10 text-center backdrop-blur-md bg-white border border-gray-200 shadow-lg animate-float clipped-24">

            <div class="absolute top-0 left-0 w-6 h-6 bg-blue-600 opacity-20"></div>
            <div class="absolute top-0 right-0 w-5 h-5 bg-cyan-500 opacity-30"></div>
            <div class="absolute bottom-0 left-0 w-5 h-5 bg-indigo-600 opacity-25"></div>
            <div class="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 opacity-20"></div>

            <nav class="mb-3 text-sm text-gray-500">
              <RouterLink to="/committees" class="hover:text-blue-600">Committees</RouterLink>
              <span class="mx-2">›</span>
              <RouterLink :to="`/committees/${committee.slug}`" class="hover:text-blue-600">{{ committee.name }}</RouterLink>
              <span class="mx-2">›</span>
              <span class="text-blue-700 font-semibold">Blog</span>
            </nav>

            <h1 class="text-4xl font-black tracking-tight text-blue-700 mb-4 leading-tight relative z-10">
              {{ committee.name }}
            </h1>
            <p class="text-base text-gray-600 max-w-2xl mx-auto relative z-10">
              Stay updated with the latest news, insights, and activities from our committee.
            </p>

            <!-- Tabs -->
            <div class="flex justify-center gap-4 mt-8 relative z-10">
              <RouterLink
                :to="`/committees/${committee.slug}`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-blue-700 bg-white border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 clipped-10"
                
              >
                Overview
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-blue-700 bg-white border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 clipped-10"
                
              >
                Members
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/blog`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-600 shadow-md transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 clipped-10"
                
              >
                Blog
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Posts -->
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div v-if="posts.length === 0" class="text-center py-16">
          <div class="w-20 h-20 bg-gray-400 mx-auto mb-6 transform rotate-45"></div>
          <p class="text-gray-500 text-xl font-bold uppercase tracking-wider">No posts yet</p>
        </div>

        <div v-else>
          <div class="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 mb-16">
            <BlogCard v-for="post in posts" :key="post.id" :post="post" />
          </div>

          <!-- Pagination -->
          <div v-if="pagination.pages > 1" class="flex flex-col items-center space-y-6">
            <div class="flex items-center space-x-2">
              <button
                @click="loadPage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="px-5 py-3 bg-blue-600 text-white font-bold uppercase tracking-wide border-2 border-blue-600 relative transition-all duration-300 disabled:opacity-40 clipped-12"
                
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
                class="px-5 py-3 bg-blue-600 text-white font-bold uppercase tracking-wide border-2 border-blue-600 relative transition-all duration-300 disabled:opacity-40 clipped-12"
                
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
  </div>
</template>

