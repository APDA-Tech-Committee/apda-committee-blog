<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPosts, type Post } from '../utils/staticData'

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
    const data = await getPosts(page, 12, 'PUBLISHED')
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
  <div class="blueprint-grid">
    <!-- Page Title + Tagline with top divider -->
    <hr class="content-divider" />
    <div class="px-12 py-10">
      <h1 class="text-3xl font-bold mb-3 text-blueprint-blue">Blog</h1>
      <p class="max-w-[70ch] text-lg leading-relaxed">
        Updates and articles from the APDA Tech Committee
      </p>
    </div>
    <hr class="content-divider" />

    <div v-if="loading" class="px-12 py-8">
      <div v-for="i in 3" :key="i" class="animate-pulse mb-12">
        <div class="h-6 bg-gray-200 w-1/4 mb-3"></div>
        <div class="h-4 bg-gray-100 w-3/4 mb-6"></div>
        <hr class="border-t border-gray-200" />
      </div>
    </div>

    <div v-else-if="error" class="px-12 py-8">
      <hr class="content-divider" />
      <div class="py-8">
        <p class="text-red-500 font-bold">{{ error }}</p>
        <p class="text-text-secondary mt-2">Unable to load blog posts.</p>
      </div>
      <hr class="content-divider" />
    </div>

    <div v-else-if="posts.length === 0" class="px-12 py-8">
      <hr class="content-divider" />
      <div class="py-8">
        <p class="text-text-secondary">No posts available.</p>
      </div>
      <hr class="content-divider" />
    </div>

    <div v-else>
      <!-- Blog Posts with structured line dividers -->
      <div>
        <div v-for="post in posts" :key="post.id">
          <!-- Each post has its own divider lines -->
          <hr class="content-divider" />
          <div class="px-12 py-8">
            <div class="font-mono text-text-secondary text-sm mb-4">
              {{ formatDate(post.publishedAt) }}
            </div>
            
            <router-link :to="`/blog/${post.slug}`" class="group">
              <h2 class="text-2xl font-bold mb-4 group-hover:text-blueprint-blue">
                {{ post.title }}
              </h2>
            </router-link>
            
            <p class="text-text-secondary mb-6 max-w-[70ch]">
              {{ post.excerpt || 'No excerpt available' }}
            </p>
            
            <div class="flex items-center gap-6">
              <div class="font-mono text-sm text-text-secondary">
                By {{ post.author.name }}
              </div>
              
              <div class="text-xs text-black">
                {{ post.category.name }}
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination with horizontal rule above -->
      <hr class="content-divider" />
      <div v-if="pagination.pages > 1" class="px-12 py-8 flex justify-between items-center">
        <div class="font-mono text-sm text-text-secondary">
          Page {{ currentPage }} of {{ pagination.pages }}
        </div>
        
        <div class="flex gap-2">
          <button
            @click="loadPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-4 py-2 border border-black text-black disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-300"
          >
            Previous
          </button>
          
          <button
            v-for="page in pagination.pages"
            :key="page"
            @click="loadPage(page)"
            class="px-3 py-2 font-mono"
            :class="page === currentPage ? 
              'border-b-2 border-black text-black' : 
              'text-text-secondary hover:text-black'"
          >
            {{ page }}
          </button>
          
          <button
            @click="loadPage(currentPage + 1)"
            :disabled="currentPage >= pagination.pages"
            class="px-4 py-2 border border-black text-black disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      
      <!-- Bottom divider -->
      <hr class="content-divider" />
    </div>
  </div>
</template>
