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
const pagination = ref({
  page: 1,
  limit: 12,
  total: 0,
  pages: 0
})
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)

const fetchPosts = async (page: number = 1) => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts?page=${page}&limit=12&status=PUBLISHED`)
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
  await fetchPosts()
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <!-- Modern Hero Section with Glass Morphism -->
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <!-- Animated background -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(4,95,176,0.4),transparent_70%)] animate-pulse"></div>
      <div class="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="text-center">
          <!-- Glass morphism container with floating animation -->
          <div class="inline-block p-8 lg:p-10 rounded-3xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl animate-float">
            <div class="animate-text-stable">
              <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-relaxed mb-6">
                APDA
                <span class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient block mt-2 pb-2 leading-relaxed">
                  Blog
                </span>
              </h1>
              <p class="text-lg lg:text- leading-8 text-gray-200 max-w-2xl mx-auto">
                Latest posts from committees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blog Posts -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
      </div>

      <div v-else-if="error" class="text-center">
        <div class="max-w-md mx-auto p-8 rounded-2xl bg-red-50 border border-red-200">
          <div class="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>

      <div v-else-if="posts.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto p-8 rounded-2xl bg-gray-50 border border-gray-200">
          <div class="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
          <p class="text-gray-600">
            There are no published blog posts yet. Check back soon for updates!
          </p>
        </div>
      </div>

      <div v-else>
        <!-- Posts Grid -->
        <div class="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-12">
          <BlogCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </div>

        <!-- Modern Pagination -->
        <div v-if="pagination.pages > 1" class="flex flex-col items-center space-y-4">
          <div class="flex items-center space-x-2">
            <button
              @click="loadPage(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="group relative p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600 disabled:hover:border-gray-200 disabled:hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <div class="flex space-x-1">
              <button
                v-for="page in pagination.pages"
                :key="page"
                @click="loadPage(page)"
                class="px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                :class="[
                  page === currentPage
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="loadPage(currentPage + 1)"
              :disabled="currentPage >= pagination.pages"
              class="group relative p-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600 disabled:hover:border-gray-200 disabled:hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Results summary with modern styling -->
          <div class="text-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <span class="text-sm text-gray-600">
              Showing <span class="font-medium text-gray-900">{{ (currentPage - 1) * pagination.limit + 1 }}</span> to 
              <span class="font-medium text-gray-900">{{ Math.min(currentPage * pagination.limit, pagination.total) }}</span> 
              of <span class="font-medium text-gray-900">{{ pagination.total }}</span> posts
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateZ(0) perspective(1000px) rotateX(0deg) rotateY(0deg); 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  50% { 
    transform: translateY(-20px) translateZ(15px) perspective(1000px) rotateX(1deg) rotateY(0.5deg); 
    box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15);
  }
}

@keyframes text-stable {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-1px); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
  transform-style: preserve-3d;
}

.animate-text-stable {
  animation: text-stable 6s ease-in-out infinite;
}
</style>
