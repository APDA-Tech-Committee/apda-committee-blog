<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiFetch } from '../utils/api'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'About', href: '/about' },
]
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between py-4">
        <div class="flex items-center">
          <RouterLink to="/" class="group flex items-center space-x-3 transition-all duration-300">
            <div class="relative clipped-16">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <div class="text-white font-bold text-lg tracking-tight">
                  <span class="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">T</span>
                </div>
              </div>
            </div>
            
            <div class="hidden sm:block">
              <div class="flex items-baseline space-x-2">
                <h1 class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  APDA
                </h1>
                <span class="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                  Tech
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                Technology Committee
              </p>
            </div>
          </RouterLink>
        </div>
        
        <div class="hidden md:flex md:items-center md:space-x-1">
          <RouterLink
            v-for="item in navigation" 
            :key="item.name"
            :to="item.href"
            class="group relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg overflow-hidden"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:w-8 transition-all duration-300"></div>
          </RouterLink>
        </div>

        <div class="md:hidden">
          <button
            type="button"
            class="group inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 transition-all duration-300"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6 transform group-hover:scale-110 transition-transform duration-200" />
            <XMarkIcon v-else class="h-6 w-6 transform group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
      </div>

      <div 
        v-show="mobileMenuOpen" 
        class="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 animate-mobile-menu"
      >
        <div class="space-y-1 px-2 pb-4 pt-4">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center rounded-xl px-4 py-3 text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 group"
            @click="mobileMenuOpen = false"
          >
            <div class="mr-3 h-2 w-2 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors duration-200"></div>
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
@keyframes dropdown {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes mobile-menu {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-dropdown {
  animation: dropdown 0.2s ease-out forwards;
}

.animate-mobile-menu {
  animation: mobile-menu 0.3s ease-out forwards;
}

:deep(.router-link-active) {
  color: rgb(37 99 235);
}

:deep(.router-link-active .absolute) {
  width: 2rem;
}
</style>
