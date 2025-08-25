<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiFetch } from '../utils/api'
import { RouterLink } from 'vue-router'

interface Project {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  featuredImage?: string
  projectUrl?: string
  githubUrl?: string
  author: {
    name: string
  }
  category: {
    name: string
    color: string
  }
  tags: Array<{
    tag: {
      name: string
      slug: string
    }
  }>
}

const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await apiFetch('/posts?category=Projects&status=PUBLISHED')
    const data = await response.json()
    projects.value = data.posts || []
  } catch (err) {
    console.error('Error fetching projects:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})

function getTagList(project: Project): string[] {
  return project.tags?.map(t => t.tag.name) || []
}

// Format date to display in our monospace style
const formatDate = (dateString?: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="p-12">
    <!-- Page Title + Tagline -->
    <div class="mb-16">
      <h1 class="text-3xl font-bold mb-3">Projects</h1>
      <p class="text-text-secondary max-w-[70ch] text-lg font-light mb-6">
        Technology solutions developed by the APDA Tech Committee
      </p>
    </div>
    
    <div v-if="loading" class="space-y-8">
      <div v-for="i in 3" :key="i" class="animate-pulse border-b border-blueprint-blue/10 pb-8">
        <div class="h-6 bg-gray-200 w-1/4 mb-3"></div>
        <div class="h-4 bg-gray-100 w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-100 w-1/2 mb-8"></div>
        <div class="flex space-x-4">
          <div class="h-8 w-20 bg-gray-200 rounded"></div>
          <div class="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-red-500 mb-8">
      {{ error }}
      <p class="text-text-secondary mt-2">Unable to load projects.</p>
    </div>

    <div v-else-if="projects.length === 0" class="text-text-secondary">
      <p>No projects available.</p>
    </div>

    <div v-else>
      <!-- Projects Grid -->
      <div class="space-y-16">
        <div v-for="project in projects" :key="project.id" class="border-b border-blueprint-blue/10 pb-12">
          <div class="flex flex-col">
            <div class="mb-2 font-mono text-text-secondary text-sm">
              {{ formatDate(project.publishedAt) }}
            </div>
            
            <router-link :to="`/projects/${project.slug}`" class="group">
              <h2 class="text-2xl font-bold mb-4 text-blueprint-blue group-hover:underline decoration-2">
                {{ project.title }}
              </h2>
            </router-link>
            
            <p class="text-text-secondary mb-6 max-w-[70ch]">
              {{ project.excerpt || 'No description available' }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in getTagList(project)" 
                :key="tag"
                class="text-xs px-2 py-1 border border-text-secondary/20 text-text-secondary font-mono"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="flex gap-4">
              <a 
                v-if="project.githubUrl" 
                :href="project.githubUrl" 
                target="_blank"
                class="border border-blueprint-blue text-blueprint-blue px-4 py-2 text-sm inline-flex items-center gap-2 hover:bg-blueprint-blue/5 transition-colors"
              >
                <span>GitHub</span>
              </a>
              
              <a 
                v-if="project.projectUrl" 
                :href="project.projectUrl" 
                target="_blank"
                class="border border-blueprint-blue text-blueprint-blue px-4 py-2 text-sm inline-flex items-center gap-2 hover:bg-blueprint-blue/5 transition-colors"
              >
                <span>Live Demo</span>
              </a>
              
              <router-link 
                :to="`/projects/${project.slug}`"
                class="text-blueprint-blue inline-flex items-center group ml-auto"
              >
                View Project
                <span class="ml-1 text-blueprint-orange transition-transform duration-200 group-hover:translate-x-1">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- GitHub Link -->
      <div class="mt-12 pt-8 border-t border-blueprint-blue/10">
        <div class="font-mono text-sm text-text-secondary mb-4">
          More projects available on our GitHub
        </div>
        <a 
          href="https://github.com/APDA-Tech-Committee" 
          target="_blank"
          class="inline-block border border-blueprint-blue text-blueprint-blue px-6 py-3 hover:bg-blueprint-blue/5 transition-colors"
        >
          Visit GitHub Organization
        </a>
      </div>
    </div>
  </div>
</template>
