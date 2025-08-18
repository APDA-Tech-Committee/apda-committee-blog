<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
            APDA Blog
          </h1>
          <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, updates, and stories from the American Parliamentary Debate Association community.
            Read the latest from our committees and members.
          </p>
        </div>
      </div>
    </div>

    <!-- Blog Posts -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="posts.length === 0" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <h3 class="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p class="text-gray-500">
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

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="flex justify-center items-center space-x-4">
          <button
            @click="loadPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div class="flex space-x-2">
            <button
              v-for="page in pagination.pages"
              :key="page"
              @click="loadPage(page)"
              class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
              :class="[
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="loadPage(currentPage + 1)"
            :disabled="currentPage >= pagination.pages"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        <!-- Results summary -->
        <div class="text-center mt-8 text-sm text-gray-600">
          Showing {{ (currentPage - 1) * pagination.limit + 1 }} to 
          {{ Math.min(currentPage * pagination.limit, pagination.total) }} 
          of {{ pagination.total }} posts
        </div>
      </div>
    </div>
  </div>
</template>
