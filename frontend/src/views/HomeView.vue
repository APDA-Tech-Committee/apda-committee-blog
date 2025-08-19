<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { RouterLink } from 'vue-router'
import backgroundImage from '../assets/background.jpg'

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
    <div class="lg:w-1/2 lg:fixed lg:left-0 lg:top-0 relative overflow-hidden h-screen flex items-center justify-center z-30">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" :style="`background-image: url(${backgroundImage})`"></div>
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      

      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.2),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_center,rgba(4,95,176,0.2),transparent_60%)] animate-mesh-morph"></div>
      
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced"></div>
      <div class="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-enhanced animation-delay-2000"></div>
      <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-enhanced animation-delay-4000"></div>
      <div class="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced animation-delay-6000"></div>
      
      <div class="relative z-10 max-w-xl mx-auto px-8 text-center backdrop-blur-xl bg-white/10 border border-white/20 p-10 lg:p-12 animate-float shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:via-blue-400/5 before:to-transparent before:backdrop-blur-sm clipped-30"
      >

        <div class="absolute top-0 left-0 w-8 h-8 bg-blue-600 opacity-20"></div>
        <div class="absolute top-0 right-0 w-6 h-6 bg-cyan-500 opacity-30"></div>
        <div class="absolute bottom-0 left-0 w-6 h-6 bg-indigo-600 opacity-25"></div>
        <div class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 opacity-20"></div>
        
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
              class="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-blue-500/30 transition-all duration-500 overflow-hidden transform-gpu uppercase tracking-wider before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600 before:via-blue-600 before:to-cyan-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 clipped-12" style="transform: perspective(1000px);"
            >
              <span class="relative z-10 flex items-center justify-center">
                <div class="w-0 h-0 border-t-[6px] border-t-white border-r-[6px] border-r-transparent border-b-[6px] border-b-white border-l-[6px] border-l-transparent mr-3 group-hover:rotate-45 transition-transform duration-300"></div>
                Explore Committees
              </span>
              <div class="absolute top-2 left-2 w-full h-full bg-blue-900/50 -z-10 clipped-12">
              </div>
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-base font-bold leading-6 text-gray-200 hover:text-white transition-all duration-300 group flex items-center justify-center py-4 relative overflow-hidden uppercase tracking-wider before:absolute before:bottom-0 before:left-0 before:w-0 before:h-1 before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 hover:before:w-full before:transition-all before:duration-300"
            >
              Learn more 
              <div class="ml-3 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent group-hover:translate-x-2 group-hover:scale-110 transition-all duration-200"></div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:w-1/2 lg:ml-auto fixed top-1/4">
      <div class="fixed top-[5%] left-1/2 z-50 bg-white w-full lg:w-1/2">

        
        <div class="relative z-50 p-8 lg:p-12">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-2 h-20 bg-blue-600 transform skew-x-12"></div>
                <div>
                  <h2 class="text-3xl font-black text-gray-900 tracking-tight uppercase">
                    Latest Updates
                  </h2>
                  <div class="w-24 h-2 bg-blue-600 mt-2 transform skew-x-12"></div>
                </div>
              </div>
              <p class="text-lg text-gray-700 font-bold max-w-md uppercase tracking-wide">
                Stay informed about APDA committee activities and developments.
              </p>
            </div>
            <div class="hidden lg:block w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 clip-pentagon"></div>
          </div>
        </div>
      </div>
      </div>

      <div class="lg:w-1/2 lg:ml-auto relative inset-y-[17%]">
        <div class="p-8 lg:p-12 space-y-8 z-0">
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>

        <div v-else-if="error" class="text-center py-16">
          <div class="w-20 h-20 bg-red-500 mx-auto mb-6 clip-hexagon"></div>
          <p class="text-red-600 mb-2 text-xl font-bold uppercase tracking-wider">{{ error }}</p>
          <p class="text-gray-500 font-semibold">Unable to load updates.</p>
        </div>

        <div v-else-if="blogPosts.length === 0" class="text-center py-16">
          <div class="w-20 h-20 bg-gray-400 mx-auto mb-6 transform rotate-45"></div>
          <p class="text-gray-500 text-xl font-bold uppercase tracking-wider">No posts available yet.</p>
        </div>

        <div v-else class="space-y-8">
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div v-for="post in blogPosts" :key="post.id">
              <BlogCard :post="post" />
            </div>
          </div>
          
          <div class="text-center pt-8">
            <RouterLink
              to="/blog"
              class="group relative inline-block"
            >
              <div class="relative bg-blue-600 text-white px-10 py-5 font-black uppercase tracking-widest transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 border-2 border-blue-600 clipped-16"
              >
                <span class="relative z-10 flex items-center justify-center">
                  View All Posts
                  <div class="ml-4 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent group-hover:translate-x-2 transition-transform duration-200"></div>
                </span>
                <div class="absolute top-0 left-0 w-4 h-4 bg-cyan-400"></div>
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-indigo-700"></div>
              </div>
              <div class="absolute top-2 left-2 w-full h-full bg-blue-800 -z-10 border-2 border-blue-800 clipped-16"></div>
            </RouterLink>
          </div>
        </div>
        </div>
      </div>

  </div>
</template>
