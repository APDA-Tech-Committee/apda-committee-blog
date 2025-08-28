<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getPosts, type Post } from '../utils/staticData'

interface Update {
  date: string
  tag: string
  title: string
  description: string
  link?: string
}

const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref('')

const updates = computed<Update[]>(() => 
  posts.value.map(post => {
    let tag = post.category?.name || '';
    if (post.tags && post.tags.length > 0) {
      tag = post.tags[0].name;
    }
    
    const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
    
    return {
      date,
      tag,
      title: post.title,
      description: post.excerpt || '',
      link: `/blog/${post.slug}`
    };
  })
)

onMounted(async () => {
  try {
    const data = await getPosts(1, 4, 'PUBLISHED')
    posts.value = data.posts
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
    console.error('Failed to fetch blog posts:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <hr class="content-divider" />
    <div class="px-12 py-12">
      <h1 class="text-4xl font-bold mb-4 text-blueprint-blue">APDA Tech Committee</h1>
      <p class="max-w-[70ch] text-lg leading-relaxed mb-8">
        Building technology solutions for the American Parliamentary Debate Association.
      </p>
      
      <div class="font-mono text-text-secondary text-sm bg-gray-50 py-3 px-4 inline-block border-l-4 border-blueprint-blue">
        Tools: 5  ·  Seasons Compiled: 21
      </div>
    </div>
    
    <!-- Latest Updates Section with divider -->
    <hr class="content-divider" />
    <div class="px-12 py-10">
      <h2 class="font-bold text-xl mb-8">Latest Updates</h2>
      
      <div v-if="loading" class="animate-pulse space-y-8">
        <div v-for="i in 3" :key="i" class="flex">
          <div class="w-32 h-4 bg-gray-200 rounded"></div>
          <div class="ml-6 flex-1">
            <div class="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-red-500">
        {{ error }}
      </div>
      
      <div v-else class="space-y-12">
        <div v-for="(update, index) in updates" :key="update.title" class="group">
          <hr v-if="index > 0" class="my-12 border-t border-black/20" />
          <div class="flex flex-col md:flex-row md:items-start gap-6">
            <div class="font-mono text-text-secondary text-sm pt-1 min-w-[120px] flex-shrink-0">
              {{ update.date }}
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg mb-3">
                <router-link :to="update.link || '#'" class="hover:text-blueprint-blue">
                  <span class="mr-2 text-blueprint-blue">{{ update.tag }}:</span>
                  {{ update.title }}
                </router-link>
              </h3>
              <p class="text-text-secondary text-base max-w-[70ch] leading-relaxed">
                {{ update.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Featured Project Section with divider -->
    <hr class="content-divider" />
    <div class="px-12 py-10">
      <h2 class="font-bold text-xl mb-8">Featured Project</h2>
      
      <div class="flex flex-col md:flex-row gap-12 items-start">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-blueprint-blue mb-4">August Updates</h3>
          <p class="text-text-secondary mb-6 leading-relaxed">
            See out post about what we completed this August.
          </p>
          <router-link to="/blog/tech-committee-august-update" class="text-blueprint-blue inline-flex items-center group font-medium">
            View the latest features and improvements 
            <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </router-link>
        </div>
        
        <div class="flex-1 max-w-md">
          <!-- Line-centric wireframe illustration -->
          <div class="border-2 border-black p-1 shadow-md bg-white">
            <div class="border-b-2 border-black pb-2 px-2 flex items-center bg-blueprint-blue/5">
              <div class="flex space-x-2 mr-3">
                <div class="w-3 h-3 bg-blueprint-orange rounded-full"></div>
                <div class="w-3 h-3 bg-blueprint-blue rounded-full"></div>
                <div class="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <div class="h-4 bg-gray-100 w-full"></div>
            </div>
            <div class="p-4 space-y-6">
              <hr class="border-t-2 border-black" />
              <div class="flex justify-between">
                <div class="h-4 bg-gray-100 w-1/4"></div>
                <div class="h-4 bg-gray-100 w-1/6"></div>
              </div>
              <hr class="border-t-2 border-black" />
              <div class="h-24 bg-gray-50 w-full flex items-center justify-center">
                <div class="text-blueprint-blue font-mono text-sm">mit-tab v3.4</div>
              </div>
              <hr class="border-t-2 border-black" />
              <div class="h-6 bg-gray-100 w-3/4"></div>
              <hr class="border-t-2 border-black" />
              <div class="flex justify-around">
                <div class="h-10 w-10 border-2 border-blueprint-blue"></div>
                <div class="h-10 w-10 border-2 border-blueprint-orange"></div>
                <div class="h-10 w-10 border-2 border-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom divider -->
    <hr class="content-divider" />
  </div>
</template>
