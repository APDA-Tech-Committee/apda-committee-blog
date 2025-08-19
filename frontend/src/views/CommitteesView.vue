<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Committee {
  id: string
  name: string
  slug: string
  description: string
  mission?: string
  contact?: string
  _count: {
    members: number
    posts: number
  }
}

const committees = ref<Committee[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const API_URL =
      import.meta.env.PROD
        ? '/api'
        : (import.meta.env.VITE_API_URL ?? 'http://localhost:3000');
    const response = await fetch(`${API_URL}/committees`)
    if (!response.ok) throw new Error('Failed to fetch committees')
    committees.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(4,95,176,0.4),transparent_70%)] animate-pulse"></div>
      <div class="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div class="relative flex items-center justify-center px-6 py-8">
        <div class="relative max-w-3xl w-full mx-auto px-10 py-12 text-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl animate-float clipped-30">
          
          <!-- Colored corner accents -->
          <div class="absolute top-0 left-0 w-8 h-8 bg-blue-600 opacity-20"></div>
          <div class="absolute top-0 right-0 w-6 h-6 bg-cyan-500 opacity-30"></div>
          <div class="absolute bottom-0 left-0 w-6 h-6 bg-indigo-600 opacity-25"></div>
          <div class="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 opacity-20"></div>

          <h1 class="text-5xl font-black tracking-tight text-white mb-6 animate-text-stable leading-tight relative z-10">
            APDA
            <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient block mt-2 bg-[length:300%_300%]">
              Committees
            </span>
          </h1>
          <p class="text-lg text-gray-200 font-semibold uppercase tracking-wide relative z-10">
            Discover the dedicated committees that drive APDA forward
          </p>
        </div>
      </div>
    </div>

    <!-- Committees Grid -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
      </div>

      <div v-else-if="error" class="text-center py-16">
        <div class="w-20 h-20 bg-red-500 mx-auto mb-6 clip-hexagon"></div>
        <p class="text-red-600 mb-2 text-xl font-bold uppercase tracking-wider">{{ error }}</p>
        <p class="text-gray-500 font-semibold">Unable to load committees.</p>
      </div>

      <div v-else class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="committee in committees"
          :key="committee.id"
          class="group relative bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden clipped-20"
        >
          <div class="absolute top-0 left-0 w-3 h-3 bg-blue-600 opacity-20"></div>
          <div class="absolute top-0 right-0 w-3 h-3 bg-cyan-500 opacity-30"></div>
          <div class="absolute bottom-0 left-0 w-3 h-3 bg-indigo-600 opacity-25"></div>
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 opacity-20"></div>

          <div class="relative z-10 p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
              {{ committee.name }}
            </h3>
            <p class="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
              {{ committee.description }}
            </p>

            <div class="flex items-center justify-between text-sm font-medium text-gray-600 uppercase tracking-wide mb-8">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span>{{ committee._count.members }} member{{ committee._count.members !== 1 ? 's' : '' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>{{ committee._count.posts }} post{{ committee._count.posts !== 1 ? 's' : '' }}</span>
              </div>
            </div>

            <div class="flex gap-4">
              <RouterLink
                :to="`/committees/${committee.slug}`"
                class="flex-1 relative px-6 py-3 text-center font-bold text-white uppercase tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-600 transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 shadow-lg clipped-12"
              >
                Learn More
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="flex-1 relative px-6 py-3 text-center font-bold uppercase tracking-wider text-gray-700 bg-white border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 clipped-12"
              >
                Members
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
