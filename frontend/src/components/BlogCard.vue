<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { type Post } from '../utils/staticData'

// Use Post type from staticData
interface BlogPost extends Post {}

const props = defineProps<{ post: BlogPost }>()

const formattedDate = computed(() => {
  const dateStr = props.post.publishedAt
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
})

const authorName = computed(() => {
  return props.post.author.name
})

const categoryName = computed(() => {
  return props.post.category.name
})

// Simplified category styling that matches our blueprint design
const categoryStyle = computed(() => {
  const colors: Record<string, string> = {
    Organization: 'bg-purple-100 text-purple-800',
    Rules: 'bg-yellow-100 text-yellow-800',
    Events: 'bg-red-100 text-red-800'
  }
  return colors[categoryName.value] || 'bg-gray-100 text-gray-800'
})

const postUrl = computed(() => `/blog/${props.post.slug}`)

const commentCount = computed(() => {
  return props.post._count?.comments || 0
})
</script>

<template>
  <article>
    <!-- Top divider line -->
    <hr class="content-divider" />
    
    <!-- Post content with consistent spacing -->
    <div class="py-8">
      <div class="font-mono text-text-secondary text-sm mb-4">
        {{ formattedDate }}
      </div>
      
      <RouterLink :to="postUrl" class="group">
        <h2 class="text-xl font-bold mb-4 group-hover:text-blueprint-blue flex items-center">
          {{ post.title }}
        </h2>
      </RouterLink>
      
      <p v-if="post.excerpt" class="text-text-secondary mb-6 max-w-[70ch]">
        {{ post.excerpt }}
      </p>
      
      <div class="flex items-center gap-6">
        <div class="font-mono text-sm text-text-secondary">
          By {{ authorName }}
        </div>
        
        <div class="text-xs text-black">
          {{ categoryName }}
        </div>
        
        <div class="font-mono text-xs text-text-secondary">
          {{ commentCount }} comments
        </div>
      </div>
    </div>
  </article>
</template>
