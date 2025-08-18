<script setup lang="ts">
import { computed } from 'vue'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
}

const props = defineProps<{
  post: BlogPost
}>()

const formattedDate = computed(() => {
  return new Date(props.post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const categoryColor = computed(() => {
  const colors: Record<string, string> = {
    'Announcement': 'bg-blue-100 text-blue-800',
    'Education': 'bg-green-100 text-green-800',
    'Organization': 'bg-purple-100 text-purple-800',
    'Rules': 'bg-yellow-100 text-yellow-800',
    'Events': 'bg-red-100 text-red-800'
  }
  return colors[props.post.category] || 'bg-gray-100 text-gray-800'
})
</script>

<template>
  <article class="card hover:shadow-xl transition-shadow duration-300">
    <div class="aspect-h-48 aspect-w-full">
      <img 
        :src="post.image" 
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
          {{ post.category }}
        </span>
        <time class="text-sm text-gray-500">{{ formattedDate }}</time>
      </div>
      
      <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        {{ post.title }}
      </h3>
      
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span class="text-sm font-medium text-white">
                {{ post.author.charAt(0) }}
              </span>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ post.author }}</p>
          </div>
        </div>
        
        <RouterLink
          :to="`/blog/${post.id}`"
          class="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
        >
          Read more →
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
