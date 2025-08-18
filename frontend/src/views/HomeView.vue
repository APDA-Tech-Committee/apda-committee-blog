<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { RouterLink } from 'vue-router'

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
    const response = await fetch('http://localhost:3000/api/posts?page=1&limit=4&status=PUBLISHED')
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
  <div class="h-screen flex flex-col lg:flex-row">
    <!-- Left Side - Hero with Floating Animation -->
    <div class="lg:w-1/2 relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Animated particle system -->
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-twinkle opacity-60"></div>
        <div class="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-twinkle animation-delay-1000 opacity-80"></div>
        <div class="absolute top-40 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-twinkle animation-delay-3000 opacity-70"></div>
        <div class="absolute bottom-32 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-twinkle animation-delay-2000 opacity-60"></div>
        <div class="absolute bottom-20 left-20 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-4000 opacity-90"></div>
        <div class="absolute top-1/3 right-10 w-1.5 h-1.5 bg-blue-300 rounded-full animate-twinkle animation-delay-5000 opacity-75"></div>
      </div>
      
      <!-- Dynamic gradient mesh background with morphing shapes -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.3),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.2),transparent_50%),radial-gradient(ellipse_at_center,rgba(4,95,176,0.3),transparent_60%)] animate-mesh-morph"></div>
      
      <!-- Floating orbs with improved effects -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced"></div>
      <div class="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-enhanced animation-delay-2000"></div>
      <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-enhanced animation-delay-4000"></div>
      <div class="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced animation-delay-6000"></div>
      
      <!-- Ultra-modern Glass morphism container with neural network effects -->
      <div class="relative z-10 max-w-xl mx-auto px-8 text-center backdrop-blur-md bg-gradient-to-br from-white/15 via-white/10 to-white/5 rounded-3xl border border-white/30 p-10 lg:p-12 animate-float shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/20 before:via-purple-500/10 before:to-transparent before:rounded-3xl before:blur-sm">
        <!-- Holographic accent lines -->
        <div class="absolute top-4 left-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent animate-shimmer"></div>
        <div class="absolute top-4 right-4 w-8 h-0.5 bg-gradient-to-l from-blue-400 to-transparent animate-shimmer animation-delay-1000"></div>
        <div class="absolute bottom-4 left-4 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-shimmer animation-delay-2000"></div>
        <div class="absolute bottom-4 right-4 w-10 h-0.5 bg-gradient-to-l from-indigo-400 to-transparent animate-shimmer animation-delay-3000"></div>
        
        <div class="animate-text-stable relative z-10">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-6 drop-shadow-lg">
            American Parliamentary
            <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-enhanced block mt-2 bg-[length:300%_300%]">
              Committees
            </span>
          </h1>
          <p class="text-lg lg:text-xl leading-8 text-gray-200 mb-8 max-w-lg mx-auto">
            Home page for all the committees working to make American Parliamentary Debate better.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/committees"
              class="group relative rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-500 overflow-hidden transform-gpu before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600 before:via-blue-600 before:to-cyan-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
            >
              <span class="relative z-10 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Explore Committees
              </span>
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-base font-semibold leading-6 text-gray-200 hover:text-white transition-all duration-300 group flex items-center justify-center py-3 relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 hover:before:w-full before:transition-all before:duration-300"
            >
              Learn more 
              <span aria-hidden="true" class="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-200 inline-block ml-1">→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Blog Posts -->
    <div class="lg:w-1/2 bg-gradient-to-b from-white to-gray-50 flex flex-col h-screen">
      <!-- Header -->
      <div class="p-6 lg:p-8 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">
          Latest Updates
        </h2>
        <div class="h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-3"></div>
        <p class="text-base text-gray-600">
          Stay informed about APDA committee activities.
        </p>
      </div>

      <!-- Blog Posts Content -->
      <div class="flex-1 p-6 lg:p-8 overflow-y-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-8">
          <p class="text-red-600 mb-2 text-sm">{{ error }}</p>
          <p class="text-gray-500 text-sm">Unable to load updates.</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="blogPosts.length === 0" class="text-center py-8">
          <p class="text-gray-500 text-sm">No posts available yet.</p>
        </div>

        <!-- Blog Posts Grid -->
        <div v-else class="space-y-6">
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div v-for="post in blogPosts" :key="post.id">
              <BlogCard :post="post" />
            </div>
          </div>
          
          <!-- View All Button -->
          <div class="text-center pt-4">
            <RouterLink
              to="/blog"
              class="group relative inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span class="relative z-10">View All Posts</span>
              <svg class="relative z-10 ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </RouterLink>
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

@keyframes blob-enhanced {
  0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
  25% { transform: translate(40px, -30px) scale(1.2) rotate(90deg); }
  50% { transform: translate(-30px, 40px) scale(0.8) rotate(180deg); }
  75% { transform: translate(20px, -20px) scale(1.1) rotate(270deg); }
  100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes shimmer {
  0% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; transform: translateX(0%); }
  100% { opacity: 0; transform: translateX(100%); }
}

@keyframes mesh-morph {
  0%, 100% { 
    filter: hue-rotate(0deg) brightness(1); 
    transform: scale(1) rotate(0deg);
  }
  25% { 
    filter: hue-rotate(30deg) brightness(1.1); 
    transform: scale(1.05) rotate(1deg);
  }
  50% { 
    filter: hue-rotate(60deg) brightness(0.9); 
    transform: scale(0.95) rotate(-1deg);
  }
  75% { 
    filter: hue-rotate(30deg) brightness(1.05); 
    transform: scale(1.02) rotate(0.5deg);
  }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gradient-enhanced {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateZ(0) perspective(1000px) rotateX(0deg) rotateY(0deg); 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  50% { 
    transform: translateY(-30px) translateZ(20px) perspective(1000px) rotateX(2deg) rotateY(1deg); 
    box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15);
  }
}

@keyframes text-stable {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-blob-enhanced {
  animation: blob-enhanced 12s infinite ease-in-out;
}

.animate-twinkle {
  animation: twinkle 3s infinite ease-in-out;
}

.animate-shimmer {
  animation: shimmer 2s infinite ease-in-out;
}

.animate-mesh-morph {
  animation: mesh-morph 20s infinite ease-in-out;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-5000 {
  animation-delay: 5s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-gradient-enhanced {
  background-size: 300% 300%;
  animation: gradient-enhanced 8s ease infinite;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
  transform-style: preserve-3d;
}

.animate-text-stable {
  animation: text-stable 8s ease-in-out infinite;
}
</style>
