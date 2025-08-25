<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { apiFetch } from '../utils/api'
import { useRoute, RouterLink } from 'vue-router'
import BlogCard from '../components/BlogCard.vue'

interface CommitteeMember {
  id: string
  name: string
  role: string
  bio?: string
  email?: string
  imageUrl?: string
  order: number
}

interface Post {
  id: string
  slug: string
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
  mission?: string
  contact?: string
  members: CommitteeMember[]
  posts: Post[]
}

const route = useRoute()
const committee = ref<Committee | null>(null)
const loading = ref(true)
const error = ref('')


const recentPosts = computed(() => committee.value?.posts.slice(0, 3) || [])
const chairMembers = computed(() => committee.value?.members.filter(m => m.role.toLowerCase().includes('chair')).slice(0, 3) || [])

onMounted(async () => {
  try {
    const response = await apiFetch(`/api/committees/${route.params.slug}`)
    committee.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <div class="w-20 h-20 bg-red-500 mx-auto mb-6 clip-hexagon"></div>
      <p class="text-red-600 mb-4 font-bold text-xl uppercase">{{ error }}</p>
      <RouterLink to="/committees" class="text-blue-600 hover:text-blue-700 font-semibold">← Back to Committees</RouterLink>
    </div>

    <div v-else-if="committee">
      <!-- Hero (inverted colors + smaller height) -->
      <div class="relative bg-white border-b border-gray-200">
        <div class="relative flex items-center justify-center px-6 py-12">
          <div class="relative max-w-4xl w-full mx-auto px-8 py-10 text-center backdrop-blur-md bg-white border border-gray-200 shadow-lg animate-float clipped-24">
            
            <div class="absolute top-0 left-0 w-6 h-6 bg-blue-600 opacity-20"></div>
            <div class="absolute top-0 right-0 w-5 h-5 bg-cyan-500 opacity-30"></div>
            <div class="absolute bottom-0 left-0 w-5 h-5 bg-indigo-600 opacity-25"></div>
            <div class="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 opacity-20"></div>

            <nav class="mb-3 text-sm text-gray-500">
              <RouterLink to="/committees" class="hover:text-blue-600">Committees</RouterLink>
              <span class="mx-2">›</span>
              <span class="text-blue-700 font-semibold">{{ committee.name }}</span>
            </nav>

            <h1 class="text-4xl font-black tracking-tight text-blue-700 mb-4 leading-tight relative z-10">
              {{ committee.name }}
            </h1>
            <p class="text-base text-gray-600 max-w-2xl mx-auto relative z-10">
              {{ committee.description }}
            </p>

            <!-- Tabs -->
            <div class="flex justify-center gap-4 mt-8 relative z-10">
              <RouterLink
                :to="`/committees/${committee.slug}`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-600 shadow-md transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 clipped-10"
                
              >
                Overview
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-blue-700 bg-white border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 clipped-10"
                
              >
                Members
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/blog`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-blue-700 bg-white border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 clipped-10"
                
              >
                Blog
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Content (unchanged from last version, still clipped glass/white cards) -->
      <div class="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2 space-y-12">
          <div v-if="committee.mission" class="relative p-10 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg clipped-20">
            <h2 class="text-2xl font-black text-blue-700 mb-4 uppercase tracking-tight">Our Mission</h2>
            <p class="text-gray-700 text-lg leading-relaxed">{{ committee.mission }}</p>
          </div>

          <div v-if="recentPosts.length > 0" class="relative p-10 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg clipped-20">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-black text-blue-700 uppercase tracking-tight">Recent Updates</h2>
              <RouterLink :to="`/committees/${committee.slug}/blog`" class="text-blue-600 hover:text-indigo-600 font-bold uppercase tracking-wide">
                View All →
              </RouterLink>
            </div>
            <div class="space-y-8">
              <BlogCard v-for="post in recentPosts" :key="post.id" :post="post" />
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-10">
          <div v-if="chairMembers.length > 0" class="relative p-8 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg clipped-20">
            <h3 class="text-xl font-black text-blue-700 mb-6 uppercase tracking-tight">Leadership</h3>
            <div class="space-y-5">
              <div v-for="member in chairMembers" :key="member.id" class="flex items-center space-x-4">
                <div class="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {{ member.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                </div>
                <div>
                  <p class="font-bold text-gray-900">{{ member.name }}</p>
                  <p class="text-sm text-gray-600">{{ member.role }}</p>
                </div>
              </div>
            </div>
            <RouterLink :to="`/committees/${committee.slug}/about`" class="block mt-6 text-blue-600 hover:text-indigo-600 font-bold uppercase tracking-wide text-sm">
              View All Members →
            </RouterLink>
          </div>

          <div v-if="committee.contact" class="relative p-8 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg clipped-20">
            <h3 class="text-xl font-black text-blue-700 mb-4 uppercase tracking-tight">Contact</h3>
            <a :href="`mailto:${committee.contact}`" class="text-blue-600 hover:text-indigo-600 font-semibold">
              {{ committee.contact }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

