<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container mx-auto px-4 py-16">
      <div class="max-w-md mx-auto text-center p-8 rounded-2xl bg-red-50 border border-red-200">
        <div class="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-xl font-bold text-red-900 mb-4">Post Not Found</h1>
        <p class="text-red-700 mb-6">{{ error }}</p>
        <router-link 
          to="/blog" 
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium"
        >
          ← Back to Blog
        </router-link>
      </div>
    </div>

    <!-- Post Content -->
    <article v-else-if="post" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <router-link to="/" class="hover:text-blue-600">Home</router-link>
          <span>→</span>
          <router-link to="/blog" class="hover:text-blue-600">Blog</router-link>
          <span>→</span>
          <span class="text-gray-900">{{ post.title }}</span>
        </nav>

    <!-- Post Header -->
    <header class="mb-8">
      <div v-if="post.category" class="mb-4">
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-blue-100 text-blue-800': post.category.name === 'Announcement',
            'bg-green-100 text-green-800': post.category.name === 'Education',
            'bg-purple-100 text-purple-800': post.category.name === 'Organization',
            'bg-yellow-100 text-yellow-800': post.category.name === 'Rules',
            'bg-red-100 text-red-800': post.category.name === 'Events',
            'bg-gray-100 text-gray-800': !['Announcement','Education','Organization','Rules','Events'].includes(post.category.name)
          }"
        >
          {{ post.category.name }}
        </span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {{ post.title }}
      </h1>
      <p v-if="post.excerpt" class="text-xl text-gray-600 mb-6 leading-relaxed">
        {{ post.excerpt }}
      </p>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-6">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>{{ post.author.name }}</span>
            </div>
            
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
            </div>

            <div v-if="post.committee" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <router-link 
                :to="`/committees/${post.committee.slug}`"
                class="hover:text-blue-600"
              >
                {{ post.committee.name }}
              </router-link>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div v-if="post.featuredImage" class="mb-8">
          <img 
            :src="post.featuredImage" 
            :alt="post.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        <!-- Post Content -->
        <div class="prose prose-lg max-w-none mb-12">
          <div v-html="formatContent(post.content)"></div>
        </div>

        <!-- Tags -->
        <div v-if="post.tags && post.tags.length > 0" class="mb-8">
          <h3 class="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in post.tags" 
              :key="tag.tag.id"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              {{ tag.tag.name }}
            </span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="border-t border-gray-200 pt-8 mb-8">
          <div class="flex justify-between items-center">
            <router-link 
              to="/blog" 
              class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              ← Back to Blog
            </router-link>

            <div v-if="post.committee" class="text-center">
              <p class="text-sm text-gray-600 mb-2">More from this committee:</p>
              <router-link 
                :to="`/committees/${post.committee.slug}/blog`"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {{ post.committee.name }} Blog →
              </router-link>
            </div>
          </div>
        </nav>

      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Author {
  name: string
}

interface Category {
  name: string
  color: string
}

interface Committee {
  name: string
  slug: string
}

interface Tag {
  tag: {
    id: string
    name: string
  }
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  publishedAt: string
  author: Author
  category: Category | null
  committee: Committee | null
  tags: Tag[]
}

const route = useRoute()
const router = useRouter()

const post = ref<BlogPost | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPost = async () => {
  try {
    loading.value = true
    error.value = null
    
    const API_URL =
      import.meta.env.PROD
        ? '/api'
        : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000');
    const response = await fetch(`${API_URL}/posts/${route.params.slug}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog post not found')
      }
      throw new Error(`Failed to fetch post: ${response.statusText}`)
    }
    
    const data = await response.json()
    post.value = data
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred while loading the post'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatContent = (content: string) => {
  // Convert line breaks to paragraphs for better readability
  return content
    .split('\n\n')
    .map(paragraph => `<p class="mb-4">${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('')
}

onMounted(() => {
  fetchPost()
})

// Watch for route changes to handle navigation between different posts
import { watch } from 'vue'
watch(() => route.params.slug, () => {
  if (route.name === 'blog-post') {
    fetchPost()
  }
})
</script>
