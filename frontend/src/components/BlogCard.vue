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
  <article class="card hover:shadow-xl transition-shadow duration-300">
    <div class="aspect-h-48 aspect-w-full">
      <img 
        :src="imageUrl" 
        :alt="post.title"
        class="h-48 w-full object-cover"
      />
    </div>
    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <span 
          :class="categoryColor"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        >
          {{ categoryName }}
        </span>
        <time v-if="formattedDate" class="text-sm text-gray-500">{{ formattedDate }}</time>
      </div>
      
      <!-- Committee badge if present -->
      <div v-if="post.committee" class="mb-2">
        <RouterLink 
          :to="`/committees/${post.committee.slug}`"
          class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
        >
          {{ post.committee.name }}
        </RouterLink>
      </div>
      
      <RouterLink :to="postUrl">
        <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer">
          {{ post.title }}
        </h3>
      </RouterLink>
      
      <p v-if="post.excerpt" class="text-gray-600 mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span class="text-sm font-medium text-white">
                {{ authorName.charAt(0) }}
              </span>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ authorName }}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <span v-if="post._count?.comments" class="text-xs text-gray-500">
            {{ post._count.comments }} comment{{ post._count.comments !== 1 ? 's' : '' }}
          </span>
          <RouterLink
            :to="postUrl"
            class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
          >
            Read more →
          </RouterLink>
        </div>
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
