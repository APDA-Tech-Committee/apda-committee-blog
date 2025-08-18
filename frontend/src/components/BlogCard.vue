<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface BlogPost {
  id: string | number
  title: string
  slug: string
  excerpt?: string
  author: {
    name: string
  } | string
  publishedAt?: string
  date?: string
  category: {
    name: string
    color?: string
  } | string
  committee?: {
    name: string
    slug: string
  }
  image?: string
  featuredImage?: string
  _count?: {
    comments: number
  }
}

const props = defineProps<{
  post: BlogPost
}>()

const formattedDate = computed(() => {
  const dateStr = props.post.publishedAt || props.post.date
  if (!dateStr) return ''
  
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const authorName = computed(() => {
  if (typeof props.post.author === 'string') {
    return props.post.author
  }
  return props.post.author.name
})

const categoryName = computed(() => {
  if (typeof props.post.category === 'string') {
    return props.post.category
  }
  return props.post.category.name
})

const categoryColor = computed(() => {
  // If category has a color property, use it
  if (typeof props.post.category === 'object' && props.post.category.color) {
    return `bg-[${props.post.category.color}] text-white`
  }
  
  // Otherwise, use predefined colors based on category name
  const colors: Record<string, string> = {
    'Announcement': 'bg-blue-100 text-blue-800',
    'Education': 'bg-green-100 text-green-800',
    'Organization': 'bg-purple-100 text-purple-800',
    'Rules': 'bg-yellow-100 text-yellow-800',
    'Events': 'bg-red-100 text-red-800'
  }
  return colors[categoryName.value] || 'bg-gray-100 text-gray-800'
})

const imageUrl = computed(() => {
  return props.post.featuredImage || props.post.image || 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
})

const postUrl = computed(() => {
  return `/blog/${props.post.slug}`
})
</script>

<template>
  <article class="group bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-3 overflow-hidden h-full">
    <!-- Image with overlay effect -->
    <div class="relative aspect-h-32 aspect-w-full overflow-hidden">
      <img 
        :src="imageUrl" 
        :alt="post.title"
        class="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Category badge floating on image -->
      <div class="absolute top-4 left-4">
        <span 
          :class="categoryColor"
          class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm"
        >
          {{ categoryName }}
        </span>
      </div>
      
      <!-- Date badge -->
      <div v-if="formattedDate" class="absolute top-4 right-4">
        <div class="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 shadow-lg">
          {{ formattedDate }}
        </div>
      </div>
    </div>

    <div class="p-6">
      <!-- Committee badge if present -->
      <div v-if="post.committee" class="mb-3">
        <RouterLink 
          :to="`/committees/${post.committee.slug}`"
          class="inline-flex items-center px-3 py-1 rounded-xl text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 shadow-md"
        >
          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          {{ post.committee.name }}
        </RouterLink>
      </div>
      
      <!-- Title -->
      <RouterLink :to="postUrl">
        <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight">
          {{ post.title }}
        </h3>
      </RouterLink>
      
      <!-- Excerpt -->
      <p v-if="post.excerpt" class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {{ post.excerpt }}
      </p>
      
      <!-- Author and CTA -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
              <span class="text-sm font-semibold text-white">
                {{ authorName.charAt(0) }}
              </span>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ authorName }}</p>
          </div>
        </div>
        
        <RouterLink
          :to="postUrl"
          class="group/btn inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Read
          <svg class="ml-1 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
