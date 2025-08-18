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
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-600">{{ error }}</p>
      <RouterLink to="/committees" class="text-primary-600 hover:text-primary-700 mt-4 inline-block">
        ← Back to Committees
      </RouterLink>
    </div>

    <div v-else-if="committee">
      <!-- Committee Header -->
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-8">
            <nav class="text-sm text-gray-500 mb-4">
              <RouterLink to="/committees" class="hover:text-gray-700">Committees</RouterLink>
              <span class="mx-2">›</span>
              <RouterLink :to="`/committees/${committee.slug}`" class="hover:text-gray-700">{{ committee.name }}</RouterLink>
              <span class="mx-2">›</span>
              <span class="text-gray-900">Blog</span>
            </nav>
            
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              {{ committee.name }} Blog
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, insights, and activities from our committee.
            </p>
          </div>

          <!-- Committee Navigation -->
          <div class="flex justify-center space-x-4">
            <RouterLink
              :to="`/committees/${committee.slug}`"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Overview
            </RouterLink>
            <RouterLink
              :to="`/committees/${committee.slug}/about`"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Members
            </RouterLink>
            <RouterLink
              :to="`/committees/${committee.slug}/blog`"
              class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Blog
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Blog Posts -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div v-if="posts.length === 0" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <h3 class="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p class="text-gray-500">
              This committee hasn't published any blog posts yet. Check back soon for updates!
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
  </div>
</template>
