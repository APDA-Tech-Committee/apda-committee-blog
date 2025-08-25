<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = ref(route.path)
const showMobileNav = ref(false)

// Update current path when route changes
onMounted(() => {
  currentPath.value = route.path
})

// Close mobile navigation when route changes
watch(() => route.path, () => {
  showMobileNav.value = false
})
</script>

<template>
  <div class="min-h-screen blueprint-grid flex flex-col md:grid md:grid-cols-4">
    <!-- Mobile Header (visible only on smaller screens) -->
    <header class="md:hidden p-4 border-b border-blueprint-blue/10 flex justify-between items-center">
      <router-link to="/" class="block">
        <h1 class="text-lg font-bold">APDA Tech</h1>
      </router-link>
      
      <button @click="showMobileNav = !showMobileNav" class="text-text-primary">
        <span v-if="!showMobileNav">Menu</span>
        <span v-else>Close</span>
      </button>
    </header>
    
    <!-- Mobile Navigation Overlay -->
    <div 
      v-if="showMobileNav" 
      class="md:hidden fixed inset-0 z-50 bg-bg-primary bg-grid flex flex-col"
    >
      <div class="p-4 border-b border-blueprint-blue/10 flex justify-between items-center">
        <router-link @click="showMobileNav = false" to="/" class="block">
          <h1 class="text-lg font-bold">APDA Tech</h1>
        </router-link>
        
        <button @click="showMobileNav = false" class="text-text-primary">
          Close
        </button>
      </div>
      
      <nav class="p-8 flex flex-col space-y-6">
        <router-link 
          @click="showMobileNav = false"
          to="/" 
          class="text-xl text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/' }"
        >
          Home
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/projects" 
          class="text-xl text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/projects' }"
        >
          Projects
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/blog" 
          class="text-xl text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/blog' }"
        >
          Blog
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/about" 
          class="text-xl text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/about' }"
        >
          About
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/team" 
          class="text-xl text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/team' }"
        >
          Team
        </router-link>
      </nav>
      
      <div class="p-8 mt-auto border-t border-blueprint-blue/10">
        <div class="flex justify-around">
          <a href="mailto:tech@apda.online" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
            Email
          </a>
          <a href="https://github.com/APDA-Tech-Committee" target="_blank" rel="noopener" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
            GitHub
          </a>
          <a href="https://apda.online" target="_blank" rel="noopener" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
            apda.online
          </a>
        </div>
      </div>
    </div>
  
    <!-- Left Sidebar (Fixed/Sticky - Hidden on mobile) -->
    <aside class="hidden md:flex md:col-span-1 h-screen sticky top-0 p-8 flex-col">
      <!-- Title -->
      <div class="mb-10">
        <router-link to="/" class="block">
          <h1 class="text-2xl font-bold">APDA Tech Committee</h1>
        </router-link>
      </div>
      
      <!-- Navigation -->
      <nav class="mb-12 flex flex-col space-y-4">
        <router-link 
          to="/" 
          class="text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/' }"
        >
          Home
        </router-link>
        <router-link 
          to="/projects" 
          class="text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/projects' }"
        >
          Projects
        </router-link>
        <router-link 
          to="/blog" 
          class="text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/blog' }"
        >
          Blog
        </router-link>
        <router-link 
          to="/about" 
          class="text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/about' }"
        >
          About
        </router-link>
        <router-link 
          to="/team" 
          class="text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/team' }"
        >
          Team
        </router-link>
      </nav>
      
      <!-- Mission Statement -->
      <div class="mb-auto">
        <p class="text-sm font-light w-10/12 leading-relaxed text-text-secondary">
          Building technology for the American Parliamentary Debate Association.
        </p>
      </div>
      
      <!-- Contact Links -->
      <div class="pt-8 border-t border-blueprint-blue/10">
        <div class="flex flex-col space-y-3">
          <a href="mailto:tech@apda.online" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
            Email
          </a>
          <a href="https://github.com/APDA-Tech-Committee" target="_blank" rel="noopener" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
            GitHub
          </a>
          <a href="https://apda.online" target="_blank" rel="noopener" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
            apda.online
          </a>
        </div>
      </div>
    </aside>
    
    <!-- Main Content Area -->
    <main class="flex-1 min-h-screen md:col-span-3">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Ensure grid background covers the whole page */
.blueprint-grid {
  background-size: 12px 12px;
}

/* Mobile layout adjustments */
@media (max-width: 768px) {
  main {
    padding-top: 0;
  }
}

/* Utility classes for blueprint-specific styling */
.text-mono {
  font-family: 'IBM Plex Mono', 'JetBrains Mono', monospace;
}
</style>
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

