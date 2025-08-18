<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import HeroSection from '../components/HeroSection.vue'

// Simulate blog posts data - will be replaced with API calls later
const blogPosts = ref([
  {
    id: 1,
    title: 'Welcome to APDA Committees Platform',
    excerpt: 'Introducing our new digital platform for American Parliamentary Debate Association committee work and collaboration.',
    author: 'APDA Admin',
    date: '2025-08-18',
    category: 'Announcement',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Parliamentary Procedure Best Practices',
    excerpt: 'Learn the essential parliamentary procedures that make APDA debates more effective and engaging.',
    author: 'Rules Committee',
    date: '2025-08-17',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Committee Structure and Organization',
    excerpt: 'Understanding how APDA committees work together to advance parliamentary debate across the nation.',
    author: 'Executive Committee',
    date: '2025-08-16',
    category: 'Organization',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
])

onMounted(() => {
  // Future: Load blog posts from API
  console.log('Home page mounted')
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Latest Blog Posts -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Latest Updates
          </h2>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about APDA committee activities, parliamentary procedures, and community updates.
          </p>
        </div>
        
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            v-for="post in blogPosts"
            :key="post.id"
            :post="post"
          />
        </div>
        
        <div class="text-center mt-12">
          <RouterLink
            to="/blog"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            View All Posts
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
