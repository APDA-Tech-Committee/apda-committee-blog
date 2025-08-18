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
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
            APDA Committees
          </h1>
          <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the dedicated committees that drive the American Parliamentary Debate Association forward.
            Each committee focuses on specific aspects of our community and mission.
          </p>
        </div>
      </div>
    </div>

    <!-- Committees Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        <p>{{ error }}</p>
      </div>

      <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="committee in committees"
          :key="committee.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              {{ committee.name }}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ committee.description }}
            </p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{{ committee._count.members }} member{{ committee._count.members !== 1 ? 's' : '' }}</span>
              <span>{{ committee._count.posts }} post{{ committee._count.posts !== 1 ? 's' : '' }}</span>
            </div>

            <div class="flex space-x-2">
              <RouterLink
                :to="`/committees/${committee.slug}`"
                class="flex-1 text-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors duration-200"
              >
                Learn More
              </RouterLink>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
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

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
