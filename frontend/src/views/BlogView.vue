<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiFetch } from '../utils/api'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  author: {
    name: string
    position?: string
  }
  category: {
    name: string
    color: string
  }
  projectUrl?: string
  githubUrl?: string
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
    const response = await apiFetch(`/posts?page=${page}&limit=12&status=PUBLISHED`)
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

// Format date to display in our monospace style
const formatDate = (dateString?: string): string => {
  if (!dateString) return 'No date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  await fetchPosts()
  loading.value = false
})
</script>

<template>
  <div class="p-12">
    <!-- Page Title + Tagline -->
    <div class="mb-16">
      <h1 class="text-3xl font-bold mb-3">Blog</h1>
      <p class="text-text-secondary max-w-[70ch] text-lg font-light mb-6">
        Updates and articles from the APDA Tech Committee
      </p>
    </div>

    <div v-if="loading" class="space-y-8">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <div class="h-6 bg-gray-200 w-1/4 mb-3"></div>
        <div class="h-4 bg-gray-100 w-3/4 mb-10"></div>
      </div>
    </div>

    <div v-else-if="error" class="text-red-500 mb-8">
      {{ error }}
      <p class="text-text-secondary mt-2">Unable to load blog posts.</p>
    </div>

    <div v-else-if="posts.length === 0" class="text-text-secondary">
      <p>No posts available.</p>
    </div>

    <div v-else>
      <!-- Blog Posts Grid -->
      <div class="space-y-16 mb-16">
        <div v-for="post in posts" :key="post.id" class="border-b border-blueprint-blue/10 pb-12">
          <div class="flex flex-col">
            <div class="mb-2 font-mono text-text-secondary text-sm">
              {{ formatDate(post.publishedAt) }}
            </div>
            
            <router-link :to="`/blog/${post.slug}`" class="group">
              <h2 class="text-2xl font-bold mb-4 text-blueprint-blue group-hover:underline decoration-2">
                {{ post.title }}
              </h2>
            </router-link>
            
            <p class="text-text-secondary mb-4 max-w-[70ch]">
              {{ post.excerpt || 'No excerpt available' }}
            </p>
            
            <div class="flex items-center gap-4">
              <div class="font-mono text-sm text-text-secondary">
                By {{ post.author.name }}
              </div>
              
              <div class="text-xs border border-blueprint-blue/30 text-blueprint-blue px-2 py-1">
                {{ post.category.name }}
              </div>
              
              <div class="font-mono text-xs text-text-secondary">
                {{ post._count.comments }} comments
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.pages > 1" class="flex justify-between items-center pt-8 border-t border-blueprint-blue/10">
        <div class="font-mono text-sm text-text-secondary">
          Page {{ currentPage }} of {{ pagination.pages }}
        </div>
        
        <div class="flex gap-2">
          <button
            @click="loadPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-4 py-2 border border-blueprint-blue text-blueprint-blue disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-300"
          >
            Previous
          </button>
          
          <button
            v-for="page in pagination.pages"
            :key="page"
            @click="loadPage(page)"
            class="px-3 py-2 font-mono"
            :class="page === currentPage ? 
              'border-b-2 border-blueprint-blue text-blueprint-blue' : 
              'text-text-secondary hover:text-blueprint-blue'"
          >
            {{ page }}
          </button>
          
          <button
            @click="loadPage(currentPage + 1)"
            :disabled="currentPage >= pagination.pages"
            class="px-4 py-2 border border-blueprint-blue text-blueprint-blue disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-300"
          >
            Next
          </button>
        </div>
        
        <div class="font-mono text-xs text-text-secondary">
          {{ (currentPage - 1) * pagination.limit + 1 }}–{{ Math.min(currentPage * pagination.limit, pagination.total) }} of {{ pagination.total }}
        </div>
      </div>
    </div>
  </div>
</template>
