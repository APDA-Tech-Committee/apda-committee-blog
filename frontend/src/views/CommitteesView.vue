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
    const response = await fetch('http://localhost:3000/api/committees')
    if (!response.ok) {
      throw new Error('Failed to fetch committees')
    }
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
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center h-[40vh]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(4,95,176,0.4),transparent_70%)] animate-pulse"></div>
      <div class="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="relative z-10 text-center w-full">
        <div class="inline-block p-8 lg:p-10 rounded-3xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl animate-float">
          <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            APDA
            <span class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient block mt-2">
              Committees
            </span>
          </h1>
          <p class="text-lg lg:text-xl leading-8 text-gray-200 max-w-2xl mx-auto">
            Discover the dedicated committees that drive the American Parliamentary Debate Association forward.
          </p>
        </div>
      </div>
    </div>

    <!-- Committees Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
      </div>

      <div v-else-if="error" class="text-center">
        <div class="max-w-md mx-auto p-8 rounded-2xl bg-red-50 border border-red-200">
          <div class="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-red-900 mb-2">Something went wrong</h3>
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>

      <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="committee in committees"
          :key="committee.id"
          class="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        >
          <div class="p-6">
            <div class="mb-4">
              <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                {{ committee.name }}
              </h3>
              <p class="text-gray-600 line-clamp-3 leading-relaxed">
                {{ committee.description }}
              </p>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-6">
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span class="font-medium">{{ committee._count.members }}</span>
                <span>member{{ committee._count.members !== 1 ? 's' : '' }}</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span class="font-medium">{{ committee._count.posts }}</span>
                <span>post{{ committee._count.posts !== 1 ? 's' : '' }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-3">
              <RouterLink
                :to="`/committees/${committee.slug}`"
                class="flex-1 text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-purple-500/30"
              >
                Learn More
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="flex-1 text-center px-4 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200 bg-white"
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
