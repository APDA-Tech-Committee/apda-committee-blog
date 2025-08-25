<template>
  <div class="blueprint-grid">
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
        <h1 class="text-xl font-bold mb-4">Post Not Found</h1>
        <p class="mb-6">{{ error }}</p>
        <router-link 
          to="/blog" 
          class="inline-flex items-center px-6 py-3 border border-black"
        >
          ← Back to Blog
        </router-link>
      </div>
      <hr class="content-divider" />
    </div>

    <!-- Post Content -->
    <div v-else-if="post">
      <!-- Top divider -->
      <hr class="content-divider" />
      
      <div class="px-12 py-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-text-secondary mb-8">
          <router-link to="/" class="hover:text-black">Home</router-link>
          <span>→</span>
          <router-link to="/blog" class="hover:text-black">Blog</router-link>
          <span>→</span>
          <span class="text-black">{{ post.title }}</span>
        </nav>

        <!-- Post Header with line-centric design -->
        <header class="mb-8">
          <div v-if="post.category" class="mb-4">
            <span class="text-xs font-medium text-black">
              {{ post.category.name }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {{ post.title }}
          </h1>
          <p v-if="post.excerpt" class="text-xl text-text-secondary mb-6 leading-relaxed">
            {{ post.excerpt }}
          </p>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-text-secondary pb-6">
            <!-- Author with position and email if available -->
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>
                {{ post.author.name }}
                <span v-if="post.author.position" class="text-xs opacity-75">
                  ({{ post.author.position }})
                </span>
              </span>
            </div>
            
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
            </div>
            
            <!-- Email if available -->
            <div v-if="post.author.email" class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a :href="`mailto:${post.author.email}`" class="hover:underline">
                {{ post.author.email }}
              </a>
            </div>
          </div>
        </header>
      </div>
      
      <!-- Content divider -->
      <hr class="content-divider" />

      <!-- Post Content -->
      <div class="px-12 py-10 prose prose-lg max-w-none">
        <div v-html="formatContent(post.content || '')" class="leading-relaxed"></div>
      </div>
      
      <!-- Tags with divider -->
      <hr class="content-divider" />
      <div v-if="post.tags && post.tags.length > 0" class="px-12 py-8">
        <h3 class="text-sm font-medium mb-4">Tags:</h3>
        <div class="flex flex-wrap gap-4">
          <span 
            v-for="tag in post.tags" 
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
            to="/blog" 
            class="inline-flex items-center border border-black px-4 py-2"
          >
            ← Back to Blog
          </router-link>

          <div class="text-center">
            <p class="text-sm text-text-secondary mb-2">More tech content:</p>
            <router-link 
              to="/blog"
              class="inline-flex items-center border border-black px-4 py-2"
            >
              Tech Committee Blog →
            </router-link>
          </div>
        </div>
      </div>

      <!-- Project Links with divider -->
      <hr class="content-divider" />
            <!-- End of content divider -->
      <hr class="content-divider" />
      
      <!-- Bottom divider -->
      <hr class="content-divider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getPost, type Post } from '../utils/staticData'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPost = async () => {
  try {
    loading.value = true
    error.value = null
    
    const slug = route.params.slug as string
    const data = await getPost(slug)
    post.value = data
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred while loading the post'
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
  
  // Process Markdown links [text](url)
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
  fetchPost()
})

// Watch for route changes to handle navigation between different posts
watch(() => route.params.slug, () => {
  if (route.name === 'blog-post') {
    fetchPost()
  }
})
</script>
