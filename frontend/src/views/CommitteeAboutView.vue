<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

interface CommitteeMember {
  id: string
  name: string
  role: string
  bio?: string
  email?: string
  imageUrl?: string
  order: number
}

interface Committee {
  id: string
  name: string
  slug: string
  description: string
  mission?: string
  contact?: string
  members: CommitteeMember[]
}

const route = useRoute()
const committee = ref<Committee | null>(null)
const loading = ref(true)
const error = ref('')

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/api/committees/${route.params.slug}`)
    if (!response.ok) {
      throw new Error('Committee not found')
    }
    committee.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col relative overflow-hidden">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20 relative z-10">
      <div class="w-20 h-20 bg-red-500 mx-auto mb-6 clip-hexagon"></div>
      <p class="text-red-600 mb-4 font-bold text-xl uppercase">{{ error }}</p>
      <RouterLink to="/committees" class="text-blue-600 hover:text-blue-700 font-semibold">← Back to Committees</RouterLink>
    </div>

    <!-- Committee -->
    <div v-else-if="committee" class="relative z-10">
      <!-- Hero/Header -->
      <div class="relative bg-white border-b border-gray-200 shadow-md">
        <div class="relative flex items-center justify-center px-6 py-12">
          <div class="relative max-w-4xl w-full mx-auto px-8 py-10 text-center backdrop-blur-md bg-white border border-gray-200 shadow-lg animate-float clipped-24">

            <div class="absolute top-0 left-0 w-6 h-6 bg-blue-600 opacity-20"></div>
            <div class="absolute top-0 right-0 w-5 h-5 bg-cyan-500 opacity-30"></div>
            <div class="absolute bottom-0 left-0 w-5 h-5 bg-indigo-600 opacity-25"></div>
            <div class="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 opacity-20"></div>

            <nav class="mb-3 text-sm text-gray-500">
              <RouterLink to="/committees" class="hover:text-blue-600">Committees</RouterLink>
              <span class="mx-2">›</span>
              <RouterLink :to="`/committees/${committee.slug}`" class="hover:text-blue-600">{{ committee.name }}</RouterLink>
              <span class="mx-2">›</span>
              <span class="text-blue-700 font-semibold">Members</span>
            </nav>

            <h1 class="text-4xl font-black tracking-tight text-blue-700 mb-4 leading-tight relative z-10">
              {{ committee.name }}
            </h1>
            <p class="text-base text-gray-600 max-w-2xl mx-auto relative z-10">
              Meet the dedicated individuals who drive our committee's mission forward.
            </p>

            <!-- Tabs -->
            <div class="flex justify-center gap-4 mt-8 relative z-10">
              <RouterLink
                :to="`/committees/${committee.slug}`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-blue-700 bg-white border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 clipped-10"
                
              >
                Overview
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="px-5 py-2 font-bold uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-600 shadow-md transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 clipped-10"
                
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

      <!-- Members Grid -->
      <div class="max-w-7xl mx-auto px-6 py-16">
        <div v-if="committee.members.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No members listed for this committee yet.</p>
        </div>

        <div v-else class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="member in committee.members"
            :key="member.id"
            class="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl clipped-18"
          >
            <div class="bg-gradient-to-br from-blue-600 to-indigo-600 h-32 flex items-center justify-center relative">
              <div v-if="member.imageUrl" class="w-20 h-20 rounded-full overflow-hidden shadow-lg ring-4 ring-white z-10">
                <img :src="member.imageUrl" :alt="member.name" class="w-full h-full object-cover">
              </div>
              <div v-else class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white z-10">
                <span class="text-2xl font-bold text-white">
                  {{ member.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-blue-600 font-semibold mb-3">{{ member.role }}</p>
              <p v-if="member.bio" class="text-gray-600 text-sm mb-4 line-clamp-3">{{ member.bio }}</p>
              <div v-if="member.email">
                <a :href="`mailto:${member.email}`" class="text-blue-600 hover:text-indigo-600 text-sm font-bold">Contact</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Committee Contact -->
        <div v-if="committee.contact" class="mt-20 text-center">
          <div class="relative p-10 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg max-w-2xl mx-auto clipped-20">
            <h2 class="text-2xl font-black text-blue-700 mb-4 uppercase tracking-tight">Get in Touch</h2>
            <p class="text-gray-600 mb-4">Interested in getting involved or have questions about our work?</p>
            <a :href="`mailto:${committee.contact}`" class="px-6 py-3 font-bold uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-600 shadow-md transition-all duration-300 inline-block clipped-12">
              Contact Committee
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
