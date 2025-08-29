<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = ref(route.path)
const showMobileNav = ref(false)
const showDesktopSidebar = ref(true)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


onMounted(() => {
  currentPath.value = route.path
  const savedSidebarState = localStorage.getItem('desktopSidebarState')
  if (savedSidebarState !== null) {
    showDesktopSidebar.value = savedSidebarState === 'true'
  }
})

// Close mobile navigation when route changes
watch(() => route.path, () => {
  showMobileNav.value = false
})

// Save sidebar state to localStorage when it changes
watch(showDesktopSidebar, (newValue) => {
  localStorage.setItem('desktopSidebarState', newValue.toString())
  
  // Allow time for transition to complete
  if (!newValue) {
    document.body.classList.add('sidebar-collapsed')
  } else {
    document.body.classList.remove('sidebar-collapsed')
  }
})
</script>

<template>
  <div class="min-h-screen blueprint-grid flex flex-col md:grid md:grid-cols-4" :style="{ 'grid-template-columns': showDesktopSidebar ? '1fr 3fr' : '0 1fr' }">
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
    
    <!-- Desktop Toggle Button (visible only on larger screens) -->
    <button 
      @click="showDesktopSidebar = !showDesktopSidebar" 
      class="hidden md:flex fixed top-4 z-50 items-center justify-center w-8 h-8 bg-white border border-black shadow-sm hover:bg-blueprint-orange/10 transition-colors duration-150"
      :style="{ left: showDesktopSidebar ? 'calc(25% - 16px)' : '4px' }"
    >
      <span class="sr-only">Toggle Sidebar</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        :class="showDesktopSidebar ? 'rotate-180' : ''" 
        class="w-4 h-4 transition-transform text-blueprint-orange" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    
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
          class="p-5 text-xl text-black border-b border-black group relative"
          :class="{ 'font-bold': $route.path === '/' }"
        >
          <div v-if="$route.path === '/'" class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange"></div>
          Home
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/projects" 
          class="p-5 text-xl text-black border-b border-black group relative"
          :class="{ 'font-bold': $route.path === '/projects' }"
        >
          <div v-if="$route.path === '/projects'" class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange"></div>
          Projects
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/blog" 
          class="p-5 text-xl text-black border-b border-black group relative"
          :class="{ 'font-bold': $route.path === '/blog' }"
        >
          <div v-if="$route.path === '/blog'" class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange"></div>
          Blog
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/about" 
          class="p-5 text-xl text-black border-b border-black group relative"
          :class="{ 'font-bold': $route.path === '/about' }"
        >
          <div v-if="$route.path === '/about'" class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange"></div>
          About
        </router-link>
        <router-link 
          @click="showMobileNav = false"
          to="/team" 
          class="p-5 text-xl text-black border-b border-black group relative"
          :class="{ 'font-bold': $route.path === '/team' }"
        >
          <div v-if="$route.path === '/team'" class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange"></div>
          Team
        </router-link>
      </nav>
      
      <div class="p-8 mt-auto border-t border-black">
        <div class="flex flex-col space-y-3">
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
    <aside 
      class="hidden md:flex h-screen sticky top-0 flex-col border-r border-t border-black transition-all duration-300 ease-in-out overflow-hidden"
      :class="showDesktopSidebar ? 'md:w-full' : 'md:w-0 md:border-r-0 md:border-t-0 opacity-0'"
    >
      <!-- Title -->
      <div class="px-8 py-10 border-b border-black overflow-hidden">
        <router-link to="/" class="block">
          <h1 class="text-2xl font-bold tracking-tight text-blueprint-blue">APDA Tech Committee</h1>
        </router-link>
      </div>
      
      <!-- Navigation - Each item separated by full-width horizontal lines -->
      <nav class="flex flex-col overflow-hidden">

        <router-link 
          to="/projects" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150 group relative"
          :class="{ 'text-blueprint-blue': $route.path === '/projects' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange opacity-0 transition-opacity duration-150" :class="{ 'opacity-100': $route.path === '/projects' }"></div>
          Projects
        </router-link>
        <router-link 
          to="/blog" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150 group relative"
          :class="{ 'text-blueprint-blue': $route.path === '/blog' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange opacity-0 transition-opacity duration-150" :class="{ 'opacity-100': $route.path === '/blog' }"></div>
          Blog
        </router-link>
        <router-link 
          to="/about" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150 group relative"
          :class="{ 'text-blueprint-blue': $route.path === '/about' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange opacity-0 transition-opacity duration-150" :class="{ 'opacity-100': $route.path === '/about' }"></div>
          About
        </router-link>
        <router-link 
          to="/team" 
          class="px-8 py-5 border-b border-black text-text-primary hover:text-blueprint-blue transition-colors duration-150 group relative"
          :class="{ 'text-blueprint-blue': $route.path === '/team' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-2 bg-blueprint-orange opacity-0 transition-opacity duration-150" :class="{ 'opacity-100': $route.path === '/team' }"></div>
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
      <div class="px-8 py-8 border-t border-black overflow-hidden">
        <div class="flex flex-col space-y-3">
          <a href="mailto:joeymrubas@gmail.com" class="text-text-secondary text-sm transition-all duration-150 group relative pl-0 hover:pl-3">
            <span class="absolute left-0 top-1/2 w-0 h-0.5 bg-blueprint-orange transform -translate-y-1/2 transition-all duration-150 group-hover:w-2"></span>
            Email
          </a>
          <a href="https://github.com/APDA-Tech-Committee" target="_blank" rel="noopener" class="text-text-secondary text-sm transition-all duration-150 group relative pl-0 hover:pl-3">
            <span class="absolute left-0 top-1/2 w-0 h-0.5 bg-blueprint-orange transform -translate-y-1/2 transition-all duration-150 group-hover:w-2"></span>
            GitHub
          </a>
          <a href="https://apda.online" target="_blank" rel="noopener" class="text-text-secondary text-sm transition-all duration-150 group relative pl-0 hover:pl-3">
            <span class="absolute left-0 top-1/2 w-0 h-0.5 bg-blueprint-orange transform -translate-y-1/2 transition-all duration-150 group-hover:w-2"></span>
            apda.online
          </a>
        </div>
      </div>
    </aside>
    
    <!-- Main Content Area -->
    <main 
      class="flex-1 min-h-screen blueprint-grid transition-all duration-300 ease-in-out border-t md:border-t-0 border-black"
      :class="showDesktopSidebar ? 'md:col-start-2 md:col-span-3' : 'md:col-start-2 md:col-span-3'"
    >
      <div class="relative w-full h-full">
        <RouterView v-slot="{ Component }">
          <transition 
            name="page" 
            mode="out-in"
            @before-leave="scrollToTop"
          >
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
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
  height: 0;
}

.content-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 0;
  padding-right: 0;
}

.page-header {
  padding: 2.5rem 3rem; /* Standardized py-10 px-12 equivalent */
  /* Removed min-height to allow natural content flow */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.standard-divider {
  border-top: 1px solid black;
  width: 100%;
  margin: 0;
  height: 0;
}

.accent-divider {
  border-top: 2px solid #FF6A1A; /* blueprint-orange */
  width: 8rem;
  margin: 0 3rem; /* mx-12 equivalent */
  height: 0;
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
