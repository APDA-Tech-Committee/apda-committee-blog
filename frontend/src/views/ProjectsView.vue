<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getProjects, type Project } from '../utils/staticData'
import { RouterLink } from 'vue-router'

const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    // Get all projects from the projects API
    const response = await getProjects(1, 50, 'PUBLISHED')
    projects.value = response.projects;
  } catch (err) {
    console.error('Error fetching projects:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})

function getTagList(project: Project): string[] {
  return project.tags?.map(tag => tag.name) || []
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
  <div class="blueprint-grid">
    <!-- Page Title + Tagline with top divider -->
    <hr class="content-divider" />
    <div class="px-12 py-10">
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
      <hr class="content-divider" />
      <div class="px-12 py-10">
        <h2 class="font-bold text-xl mb-8 text-blueprint-blue">All Projects</h2>
        <div class="space-y-16">
          <div v-for="project in projects" :key="project.id" class="border-b border-black pb-12">
          <div class="flex flex-col bg-white bg-opacity-50 p-4 -mx-4">
            <div class="mb-2 font-mono text-text-secondary text-sm">
              {{ formatDate(project.publishedAt) }}
            </div>
            
            <router-link :to="`/projects/${project.slug}`" class="group">
              <h2 class="text-2xl font-bold mb-4 text-blueprint-blue group-hover:underline decoration-2">
                {{ project.title }}
              </h2>
            </router-link>
            
            <p class="mb-6 max-w-[70ch] leading-relaxed">
              {{ project.excerpt || 'No description available' }}
            </p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tag in getTagList(project)" 
                :key="tag"
                class="text-xs px-2 py-1 border border-blueprint-blue/30 text-blueprint-blue font-mono bg-blueprint-blue/5"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="flex gap-4">
              <a 
                v-if="project.githubUrl" 
                :href="project.githubUrl" 
                target="_blank"
                class="border-2 border-blueprint-blue text-blueprint-blue px-4 py-2 text-sm font-medium inline-flex items-center gap-2 hover:bg-blueprint-blue/5 transition-colors"
              >
                <span>GitHub</span>
              </a>
              
              <a 
                v-if="project.projectUrl" 
                :href="project.projectUrl" 
                target="_blank"
                class="border-2 border-blueprint-blue text-blueprint-blue px-4 py-2 text-sm font-medium inline-flex items-center gap-2 hover:bg-blueprint-blue/5 transition-colors"
              >
                <span>Live Demo</span>
              </a>
              
              <router-link 
                :to="`/projects/${project.slug}`"
                class="text-blueprint-blue font-medium inline-flex items-center group ml-auto"
              >
                View Project
                <span class="ml-1 text-blueprint-orange transition-transform duration-200 group-hover:translate-x-1">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- GitHub Link -->
      <hr class="content-divider" />
      <div class="px-12 py-10">
        <div class="font-mono text-sm text-text-secondary mb-4">
          More projects available on our GitHub
        </div>
        <a 
          href="https://github.com/APDA-Tech-Committee" 
          target="_blank"
          class="inline-block border-2 border-blueprint-blue text-blueprint-blue px-6 py-3 font-medium hover:bg-blueprint-blue/5 transition-colors"
        >
          Visit GitHub Organization
        </a>
      </div>
      </div>
    </div>
  </div>
</template>
