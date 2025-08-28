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
    <header class="md:hidden p-4 border-b border-black flex justify-between items-center">
      <router-link to="/" class="block">
        <h1 class="text-lg font-bold tracking-tight text-blueprint-blue">APDA Tech</h1>
      </router-link>
      
      <button @click="showMobileNav = !showMobileNav" class="text-black">
        <span v-if="!showMobileNav">Menu</span>
        <span v-else>Close</span>
      </button>
    </header>
    
    <!-- Mobile Navigation Overlay -->
    <div 
      v-if="showMobileNav" 
      class="md:hidden fixed inset-0 z-50 bg-bg-primary flex flex-col"
    >
      <div class="p-4 border-b border-black flex justify-between items-center">
        <router-link @click="showMobileNav = false" to="/" class="block">
          <h1 class="text-lg font-bold tracking-tight text-blueprint-blue">APDA Tech</h1>
        </router-link>
        
        <button @click="showMobileNav = false" class="text-black">
          Close
        </button>
      </div>
      
      <nav class="flex flex-col">
        <router-link 
          @click="showMobileNav = false"
          to="/" 
          class="p-5 text-xl text-black border-b border-black"
          :class="{ 'font-bold': $route.path === '/' }"
        >
          Home
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/projects" 
          class="p-5 text-xl text-black border-b border-black"
          :class="{ 'font-bold': $route.path === '/projects' }"
        >
          Projects
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/blog" 
          class="p-5 text-xl text-black border-b border-black"
          :class="{ 'font-bold': $route.path === '/blog' }"
        >
          Blog
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/about" 
          class="p-5 text-xl text-black border-b border-black"
          :class="{ 'font-bold': $route.path === '/about' }"
        >
          About
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/team" 
          class="p-5 text-xl text-black border-b border-black"
          :class="{ 'font-bold': $route.path === '/team' }"
        >
          Team
        </router-link>
      </nav>
      
      <div class="p-8 mt-auto border-t border-black">
        <div class="flex justify-around">
          <a href="mailto:joeymrubas@gmail.com" class="text-text-secondary hover:text-black text-sm">
            Email
          </a>
          <a href="https://github.com/APDA-Tech-Committee" target="_blank" rel="noopener" class="text-text-secondary hover:text-black text-sm">
            GitHub
          </a>
          <a href="https://apda.online" target="_blank" rel="noopener" class="text-text-secondary hover:text-black text-sm">
            apda.online
          </a>
        </div>
      </div>
    </div>
  
    <!-- Left Sidebar (Fixed/Sticky - Hidden on mobile) with structural line work -->
    <aside class="hidden md:flex md:col-span-1 h-screen sticky top-0 flex-col border-r border-black">
      <!-- Title -->
      <div class="px-8 py-10 border-b border-black">
        <router-link to="/" class="block">
          <h1 class="text-2xl font-bold tracking-tight text-blueprint-blue">APDA Tech Committee</h1>
        </router-link>
      </div>
      
      <!-- Navigation - Each item separated by full-width horizontal lines -->
      <nav class="flex flex-col">

        <router-link 
          to="/projects" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/projects' }"
        >
          Projects
        </router-link>
        <router-link 
          to="/blog" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/blog' }"
        >
          Blog
        </router-link>
        <router-link 
          to="/about" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/about' }"
        >
          About
        </router-link>
        <router-link 
          to="/team" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150"
          :class="{ 'text-blueprint-blue': $route.path === '/team' }"
        >
          Team
        </router-link>
      </nav>
      
      <!-- Mission Statement -->
      <div class="px-8 py-10 mb-auto">
        <p class="text-sm font-light leading-relaxed text-text-secondary">
          Building technology for the American Parliamentary Debate Association.
        </p>
      </div>
      
      <!-- Contact Links -->
      <div class="px-8 py-8 border-t border-black">
        <div class="flex flex-col space-y-3">
          <a href="mailto:joeymrubas@gmail.com" class="text-text-secondary hover:text-blueprint-blue text-sm transition-colors duration-150">
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
    <main class="flex-1 min-h-screen md:col-span-3 blueprint-grid">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Ensure grid background covers the whole page */
.blueprint-grid {
  background-size: 12px 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0H0v12h12V0z' fill='none' stroke='%23ECECEC' stroke-opacity='0.4' stroke-width='1'/%3E%3C/svg%3E");
  background-color: #FAFAFA;
}

/* Mobile layout adjustments */
@media (max-width: 768px) {
  main {
    padding-top: 0;
  }
}

/* Line-centric layout styles */
.content-divider {
  border-top: 1px solid black;
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
}

.content-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 0;
  padding-right: 0;
}

/* Utility classes for blueprint-specific styling */
.text-mono {
  font-family: 'Space Mono', monospace;
}

/* Typography enhancements */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

p {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
}

.text-lg, .text-xl, .text-2xl, .text-3xl {
  letter-spacing: -0.02em;
  font-weight: 600;
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

