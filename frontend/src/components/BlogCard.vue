<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import apiFetch from '../utils/api' // Import apiFetch for API calls

interface BlogPost {
  id: string | number
  title: string
  slug: string
  excerpt?: string
  author: { name: string } | string
  publishedAt?: string
  date?: string
  category: { name: string; color?: string } | string
  committee?: { name: string; slug: string }
  image?: string
  featuredImage?: string
  _count?: { comments: number }
}

const props = defineProps<{ post: BlogPost }>()

const formattedDate = computed(() => {
  const dateStr = props.post.publishedAt || props.post.date
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
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

const categoryColor = computed(() => {
  if (typeof props.post.category === 'object' && props.post.category.color) {
    return `bg-[${props.post.category.color}] text-white`
  }
  const colors: Record<string, string> = {
    Announcement: 'bg-blue-100 text-blue-800',
    Education: 'bg-green-100 text-green-800',
    Organization: 'bg-purple-100 text-purple-800',
    Rules: 'bg-yellow-100 text-yellow-800',
    Events: 'bg-red-100 text-red-800'
  }
  return colors[categoryName.value] || 'bg-gray-100 text-gray-800'
})

const imageUrl = computed(() =>
  props.post.featuredImage ||
  props.post.image ||
  'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
)

const postUrl = computed(() => `/blog/${props.post.slug}`)
</script>

<template>
<article class="relative group h-full min-h-[520px] max-h-[520px]">
  <div
    class="relative z-10 bg-white overflow-hidden flex flex-col min-h-[520px] max-h-[520px]"
    :class="'clipped-16'"
  >
      <div class="relative overflow-hidden isolate clipped-16">
        <img
          :src="imageUrl"
          :alt="post.title"
          class="h-48 w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div class="absolute top-4 left-4">
          <span :class="categoryColor" class="inline-flex items-center px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
            {{ categoryName }}
          </span>
        </div>

        <div v-if="formattedDate" class="absolute top-4 right-4">
          <div class="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 shadow-lg">
            {{ formattedDate }}
          </div>
        </div>
      </div>

      <!-- Body (flex column so footer pins to bottom for equal visual height) -->
      <div class="p-6 flex flex-col grow">
        <div v-if="post.committee" class="mb-3">
          <!-- Committee link as clipped mini-button -->
          <RouterLink :to="`/committees/${post.committee.slug}`" class="relative inline-block">
            <div
              class="relative bg-white text-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-blue-600"
              :class="'clipped-10'"
            >
              <span class="relative z-10 flex items-center">{{ post.committee.name }}</span>
              <div class="absolute top-0 left-0 w-2 h-2 bg-cyan-400"></div>
              <div class="absolute bottom-0 right-0 w-1.5 h-1.5 bg-indigo-700"></div>
            </div>
            <div
              class="pointer-events-none absolute inset-0 -z-10 border-2 border-blue-200 bg-blue-200 translate-x-[4px] translate-y-[4px]"
              :class="'clipped-10'"
            ></div>
          </RouterLink>
        </div>

        <RouterLink :to="postUrl">
          <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 transition-colors cursor-pointer group-hover:text-blue-600">
            {{ post.title }}
          </h3>
        </RouterLink>

        <p v-if="post.excerpt" class="text-gray-600 mb-4 line-clamp-3">
          {{ post.excerpt }}
        </p>

        <div class="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="h-8 w-8 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
              <span class="text-sm font-semibold text-white">{{ authorName.charAt(0) }}</span>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ authorName }}</p>
          </div>

          <!-- Read button -->
          <RouterLink :to="postUrl" class="relative inline-block">
            <div
              class="relative bg-blue-600 text-white px-5 py-2 text-sm font-bold uppercase tracking-wider border-2 border-blue-600"
              :class="'clipped-12'"
            >
              <span class="relative z-10 flex items-center justify-center">
                Read
                <div class="ml-2 w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent transition-transform duration-200 group-hover:translate-x-1"></div>
              </span>
              <div class="absolute top-0 left-0 w-2.5 h-2.5 bg-cyan-400"></div>
              <div class="absolute bottom-0 right-0 w-2 h-2 bg-indigo-700"></div>
            </div>
            <div
              class="pointer-events-none absolute inset-0 -z-10 border-2 border-blue-800 bg-blue-800 translate-x-[6px] translate-y-[6px]"
              :class="'clipped-12'"
            ></div>
          </RouterLink>
        </div>
      </div>
    </div>

    
   <div
    class="absolute inset-0 -z-1 border-2 border-blue-800 bg-blue-800 translate-x-[10px] translate-y-[10px] h-[520px]"
    :class="'clipped-16'"
  ></div>

  <!-- Accent squares stay pinned to card corners -->
  <div class="absolute top-0 left-0 w-4 h-4 bg-cyan-400"></div>
  <div class="absolute bottom-0 right-0 w-3 h-3 bg-indigo-700"></div>
</article>
</template>
