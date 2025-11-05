<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getProject, type Project } from '../utils/staticData'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const project = ref<Project | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchProject = async () => {
  try {
    loading.value = true
    error.value = null
    
    const slug = route.params.slug as string
    const data = await getProject(slug)
    project.value = data
  } catch (err) {
    console.error('Error fetching project:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred while loading the project'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatContent = (content: string) => {
  // This is a simplified markdown renderer - for production, consider using a library like marked or markdown-it
  
  // Process headings (## Heading) - up to h6
  let formatted = content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5 class="text-base font-bold mt-3 mb-1">$1</h5>')
    .replace(/^###### (.*$)/gm, '<h6 class="text-sm font-bold mt-2 mb-1">$1</h6>');
  
  // Process images before links (images use ![alt](url) syntax)
  formatted = formatted.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-6 rounded-lg shadow-md" />');
  
  // Process links
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blueprint-blue hover:underline" target="_blank" rel="noopener">$1</a>');
  
  // Process bold and italic text
  formatted = formatted
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // Process lists
  formatted = formatted
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/<\/li>\n<li>/g, '</li><li>');
  
  // Wrap lists in <ul>
  formatted = formatted
    .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc pl-6 my-4">$1</ul>');
  
  // Convert line breaks to paragraphs for better readability
  // Split by double newlines first to separate paragraphs
  const paragraphs = formatted.split(/\n\n+/);
  
  return paragraphs
    .map(paragraph => {
      // Skip wrapping if already has HTML tags
      if (paragraph.trim().startsWith('<')) {
        return paragraph;
      }
      // Otherwise wrap in paragraph tags
      return `<p class="mb-4">${paragraph.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
}

onMounted(() => {
  fetchProject()
})

// Watch for route changes to handle navigation between different projects
watch(() => route.params.slug, () => {
  if (route.name === 'project-detail') {
    fetchProject()
  }
})
</script>

<template>
  <div class="blueprint-grid min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="px-12 py-8">
      <hr class="content-divider" />
      <div class="py-8 text-center">
        <div class="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-xl font-bold mb-4">Project Not Found</h1>
        <p class="mb-6">{{ error }}</p>
        <router-link 
          to="/projects" 
          class="inline-flex items-center px-6 py-3 bg-blueprint-orange text-white group hover:no-underline hover:bg-blueprint-orange/90 transition-colors duration-150"
        >
          <span class="mr-1 transition-transform duration-200 group-hover:-translate-x-1">←</span> Back to Projects
        </router-link>
      </div>
      <hr class="content-divider" />
    </div>

    <!-- Project Content -->
    <article v-else-if="project">
      <!-- Top divider -->
      <hr class="content-divider" />
      
      <div class="px-12 py-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm mb-8">
          <router-link to="/" class="text-text-secondary hover:text-black">Home</router-link>
          <span class="text-blueprint-orange">→</span>
          <router-link to="/projects" class="text-text-secondary hover:text-black">Projects</router-link>
          <span class="text-blueprint-orange">→</span>
          <span class="text-black">{{ project.title }}</span>
        </nav>

        <!-- Project Header with line-centric design -->
        <header class="mb-8">
          <div v-if="project.category" class="mb-4">
            <span class="text-xs font-medium text-black">
              {{ project.category.name }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {{ project.title }}
          </h1>
          <p v-if="project.excerpt" class="text-xl text-text-secondary mb-6 leading-relaxed">
            {{ project.excerpt }}
          </p>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-text-secondary pb-6">
            <!-- Author with position and email if available -->
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>
                {{ project.author.name }}
                <span v-if="project.author.position" >
                  ({{ project.author.position }})
                </span>
              </span>
            </div>
            
            <div v-if="project.publishedAt" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <time :datetime="project.publishedAt">{{ formatDate(project.publishedAt) }}</time>
            </div>
            
            <!-- Email if available -->
            <div v-if="project.author.email" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a :href="`mailto:${project.author.email}`" class="hover:underline">
                {{ project.author.email }}
              </a>
            </div>
          </div>
        </header>

        <!-- External links -->
        <div v-if="project.projectUrl || project.githubUrl" class="flex flex-wrap gap-4 mb-8">
          <a 
            v-if="project.projectUrl" 
            :href="project.projectUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            View Project
          </a>
          <a 
            v-if="project.githubUrl" 
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer" 
            class="btn-outline flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
            </svg>
            GitHub Repository
          </a>
        </div>

        <!-- Content divider -->
        <hr class="content-divider" />

        <!-- Project Content -->
        <div class="px-12 py-10 prose prose-lg max-w-none">
          <div v-html="formatContent(project.content || '')" class="leading-relaxed"></div>
        </div>
        
        <!-- Tags with divider -->
        <hr class="content-divider" />
        <div v-if="project.tags && project.tags.length > 0" class="px-12 py-8">
          <h3 class="text-sm font-medium mb-4">Tags:</h3>
          <div class="flex flex-wrap gap-4">
            <span 
              v-for="tag in project.tags" 
              :key="tag.id"
              class="text-xs font-medium text-black"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- Navigation with divider -->
        <hr class="content-divider" />
        <div class="px-12 py-8">
          <div class="flex justify-between items-center">
            <router-link 
              to="/projects" 
              class="btn-outline flex items-center"
            >
              ← Back to Projects
            </router-link>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
