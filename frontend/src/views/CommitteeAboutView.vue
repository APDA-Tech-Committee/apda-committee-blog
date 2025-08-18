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

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/committees/${route.params.slug}`)
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
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-600">{{ error }}</p>
      <RouterLink to="/committees" class="btn-secondary mt-4 inline-block">← Back to Committees</RouterLink>
    </div>

    <div v-else-if="committee">
      <div class="card border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-8">
            <nav class="text-sm text-gray-500 mb-4">
              <RouterLink to="/committees" class="hover:text-gray-700">Committees</RouterLink>
              <span class="mx-2">›</span>
              <RouterLink :to="`/committees/${committee.slug}`" class="hover:text-gray-700">{{ committee.name }}</RouterLink>
              <span class="mx-2">›</span>
              <span class="text-gray-900">Members</span>
            </nav>
            
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              {{ committee.name }}
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated individuals who drive our committee's mission forward.
            </p>
          </div>

          <!-- Committee Navigation -->
          <div class="flex justify-center space-x-4">
            <RouterLink
              :to="`/committees/${committee.slug}`"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Overview
            </RouterLink>
            <RouterLink
              :to="`/committees/${committee.slug}/about`"
              class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Members
            </RouterLink>
            <RouterLink
              :to="`/committees/${committee.slug}/blog`"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Blog
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Members Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div v-if="committee.members.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">No members listed for this committee yet.</p>
        </div>

        <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="member in committee.members"
            :key="member.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <!-- Member Avatar -->
            <div class="bg-gradient-to-br from-primary-500 to-primary-600 h-32 flex items-center justify-center">
              <div v-if="member.imageUrl" class="w-20 h-20 rounded-full overflow-hidden">
                <img :src="member.imageUrl" :alt="member.name" class="w-full h-full object-cover">
              </div>
              <div v-else class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span class="text-2xl font-bold text-white">
                  {{ member.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- Member Info -->
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-1">
                {{ member.name }}
              </h3>
              <p class="text-primary-600 font-medium mb-3">
                {{ member.role }}
              </p>
              
              <p v-if="member.bio" class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ member.bio }}
              </p>
              
              <div v-if="member.email" class="flex items-center justify-between">
                <a 
                  :href="`mailto:${member.email}`"
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Committee Contact -->
        <div v-if="committee.contact" class="mt-16 text-center">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p class="text-gray-600 mb-4">
              Interested in getting involved or have questions about our work?
            </p>
            <a 
              :href="`mailto:${committee.contact}`"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            >
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
