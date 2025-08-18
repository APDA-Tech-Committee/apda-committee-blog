<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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

const recentPosts = computed(() => {
  return committee.value?.posts.slice(0, 3) || []
})

const chairMembers = computed(() => {
  return committee.value?.members.filter(member => 
    member.role.toLowerCase().includes('chair')
  ).slice(0, 3) || []
})

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
      <RouterLink to="/committees" class="text-primary-600 hover:text-primary-700 mt-4 inline-block">
        ← Back to Committees
      </RouterLink>
    </div>

    <div v-else-if="committee">
      <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-8">
            <nav class="text-sm text-gray-500 mb-4">
              <RouterLink to="/committees" class="hover:text-gray-700">Committees</RouterLink>
              <span class="mx-2">›</span>
              <span class="text-gray-900">{{ committee.name }}</span>
            </nav>
            
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
              {{ committee.name }}
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              {{ committee.description }}
            </p>
          </div>

          <div class="flex justify-center space-x-4">
            <RouterLink
              :to="`/committees/${committee.slug}`"
              class="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              :class="{ 'bg-primary-700': route.name === 'committee-detail' }"
            >
              Overview
            </RouterLink>
            <RouterLink
              :to="`/committees/${committee.slug}/about`"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <div v-if="committee.mission" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ committee.mission }}
              </p>
            </div>

            <div v-if="recentPosts.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Recent Updates</h2>
                <RouterLink
                  :to="`/committees/${committee.slug}/blog`"
                  class="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All →
                </RouterLink>
              </div>
              
              <div class="space-y-6">
                <BlogCard
                  v-for="post in recentPosts"
                  :key="post.id"
                  :post="post"
                />
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- Leadership -->
            <div v-if="chairMembers.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Leadership</h3>
              <div class="space-y-4">
                <div v-for="member in chairMembers" :key="member.id" class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <div class="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span class="text-primary-600 font-medium">
                        {{ member.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ member.name }}</p>
                    <p class="text-sm text-gray-600">{{ member.role }}</p>
                  </div>
                </div>
              </div>
              <RouterLink
                :to="`/committees/${committee.slug}/about`"
                class="block mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All Members →
              </RouterLink>
            </div>

            <!-- Contact Information -->
            <div v-if="committee.contact" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <a 
                :href="`mailto:${committee.contact}`"
                class="text-primary-600 hover:text-primary-700"
              >
                {{ committee.contact }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
