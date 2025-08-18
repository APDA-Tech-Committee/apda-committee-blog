<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import HeroSection from '../components/HeroSection.vue'

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
  featuredImage?: string
  _count: {
    comments: number
  }
}

const blogPosts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/posts?page=1&limit=6&status=PUBLISHED')
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }
    const data = await response.json()
    // Extract just the posts array from the response
    blogPosts.value = data.posts || data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    console.error('Failed to fetch blog posts:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Latest Blog Posts -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Updates
          </h2>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about APDA committee activities, and community updates.
          </p>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <p class="text-gray-500">Unable to load latest updates. Please try again later.</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="blogPosts.length === 0" class="text-center">
          <p class="text-gray-500">No blog posts available yet.</p>
        </div>

        <!-- Blog Posts Grid -->
        <div v-else>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard
              v-for="post in blogPosts"
              :key="post.id"
              :post="post"
            />
          </div>
          
          <div class="text-center mt-12">
            <RouterLink
              to="/blog"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            >
              View All Posts
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
