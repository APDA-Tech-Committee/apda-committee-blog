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
  featuredImage?: string
  projectUrl?: string
  githubUrl?: string
  _count: {
    comments: number
  }
}

interface Update {
  date: string
  tag: string
  title: string
  description: string
  link?: string
}

const blogPosts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')

// Sample updates
const updates = ref<Update[]>([
  {
    date: 'August 24',
    tag: 'RFC:',
    title: 'Tech Committee 2025–2026 Roadmap',
    description: 'Stay informed about the upcoming debate season, including new tools and infrastructure improvements.',
    link: '/blog/tech-committee-roadmap'
  },
  {
    date: 'August 18',
    tag: 'Update:',
    title: 'Mit-Tab v3.4 Released',
    description: 'New features include improved judge allocation algorithm and real-time statistics dashboard.',
    link: '/projects/tabulator'
  },
  {
    date: 'August 10',
    tag: 'Guide:',
    title: 'Setting Up APDA Tech for Your Tournament',
    description: 'Step-by-step guide for tournament directors to set up and use our technology stack.',
    link: '/blog/tournament-tech-setup'
  }
])

onMounted(async () => {
  try {
    const response = await apiFetch('/posts?page=1&limit=4&status=PUBLISHED')
    const data = await response.json()
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
  <div class="p-8 md:p-12">
    <!-- Page Title + Tagline -->
    <div class="mb-16">
      <h1 class="text-3xl font-bold mb-3">APDA Tech Committee</h1>
      <p class="text-text-secondary max-w-[70ch] text-lg font-light mb-6">
        Building technology solutions for the American Parliamentary Debate Association.
      </p>
      
      <!-- Inline Stats Row -->
      <div class="font-mono text-text-secondary text-sm">
        Tools: 12  ·  Rounds Tabbed: 1.3k  ·  API P95: 38ms
      </div>
    </div>
    
    <!-- Latest Updates Section -->
    <div class="mb-16">
      <h2 class="text-blueprint-blue font-bold text-xl mb-6">Latest Updates</h2>
      
      <div v-if="loading" class="animate-pulse space-y-8">
        <div v-for="i in 3" :key="i" class="flex">
          <div class="w-24 h-4 bg-gray-200 rounded"></div>
          <div class="ml-4 flex-1">
            <div class="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500">
        {{ error }}
      </div>
      
      <div v-else class="space-y-8">
        <div v-for="update in updates" :key="update.title" class="group">
          <div class="flex items-start">
            <div class="w-24 font-mono text-text-secondary text-sm">
              {{ update.date }}
            </div>
            <div class="flex-1">
              <h3 class="text-blueprint-blue font-bold mb-2">
                <span class="mr-2">{{ update.tag }}</span>
                <router-link :to="update.link || '#'" class="hover:underline">
                  {{ update.title }}
                </router-link>
              </h3>
              <p class="text-text-secondary text-sm ml-4 max-w-[60ch]">
                {{ update.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Featured Project Section -->
    <div>
      <h2 class="font-bold text-xl mb-6">Featured Project</h2>
      
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="flex-1">
          <h3 class="font-medium text-xl mb-4">Mit-Tab Version 3.4</h3>
          <p class="text-text-secondary mb-4">
            Our flagship tournament management system has been updated with automatic judge assignments for outrounds.
          </p>
          <router-link to="/projects/tabulator" class="text-blueprint-blue font-light inline-flex items-center group">
            View the latest features and improvements 
            <span class="ml-1 text-blueprint-orange transition-transform duration-200 group-hover:translate-x-1">→</span>
          </router-link>
        </div>
        
        <div class="flex-1 max-w-md">
          <!-- Blueprint style wireframe illustration -->
          <div class="border border-blueprint-blue/60 rounded-md p-1">
            <div class="border-b border-blueprint-blue/60 pb-2 px-2 flex items-center">
              <div class="flex space-x-1 mr-2">
                <div class="w-2 h-2 rounded-full bg-blueprint-blue/30"></div>
                <div class="w-2 h-2 rounded-full bg-blueprint-blue/30"></div>
                <div class="w-2 h-2 rounded-full bg-blueprint-blue/30"></div>
              </div>
              <div class="h-4 bg-blueprint-blue/10 rounded w-full"></div>
            </div>
            <div class="p-4 space-y-4">
              <div class="flex justify-between">
                <div class="h-4 bg-blueprint-blue/10 w-1/4 rounded"></div>
                <div class="h-4 bg-blueprint-orange/10 w-1/6 rounded"></div>
              </div>
              <div class="h-24 bg-blueprint-blue/5 w-full rounded"></div>
              <div class="h-6 bg-blueprint-blue/10 w-3/4 rounded mx-auto"></div>
              <div class="flex justify-around">
                <div class="h-12 w-12 rounded-full bg-blueprint-blue/10"></div>
                <div class="h-12 w-12 rounded-full bg-blueprint-orange/10"></div>
                <div class="h-12 w-12 rounded-full bg-blueprint-blue/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
