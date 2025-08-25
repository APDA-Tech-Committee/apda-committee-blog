<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface BlogPost {
  id: string | number
  title: string
  slug: string
  excerpt?: string
  author: { name: string; position?: string } | string
  publishedAt?: string
  date?: string
  category: { name: string; color?: string } | string
  image?: string
  featuredImage?: string
  projectUrl?: string
  githubUrl?: string
  _count?: { comments: number }
}

const props = defineProps<{ post: BlogPost }>()

const formattedDate = computed(() => {
  const dateStr = props.post.publishedAt || props.post.date
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
})

const authorName = computed(() => {
  return typeof props.post.author === 'string'
    ? props.post.author
    : props.post.author.name
})

const categoryName = computed(() => {
  return typeof props.post.category === 'string'
    ? props.post.category
    : props.post.category.name
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
  <article class="border-b border-blueprint-blue/10 pb-8 mb-8">
    <div class="font-mono text-text-secondary text-sm mb-2">
      {{ formattedDate }}
    </div>
    
    <RouterLink :to="postUrl" class="group">
      <h2 class="text-xl font-bold mb-3 text-blueprint-blue group-hover:underline decoration-2">
        {{ post.title }}
      </h2>
    </RouterLink>
    
    <p v-if="post.excerpt" class="text-text-secondary mb-4 max-w-[70ch]">
      {{ post.excerpt }}
    </p>
    
    <div class="flex items-center gap-4">
      <div class="font-mono text-sm text-text-secondary">
        By {{ authorName }}
      </div>
      
      <div class="text-xs border border-blueprint-blue/30 text-blueprint-blue px-2 py-1">
        {{ categoryName }}
      </div>
      
      <div class="font-mono text-xs text-text-secondary">
        {{ commentCount }} comments
      </div>
    </div>
  </article>
</template>
