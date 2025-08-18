<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Committees', href: '/committees' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between py-6">
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
              <span class="text-lg font-bold text-white">APDA</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">APDA Committees</h1>
              <p class="text-sm text-gray-600">Parliamentary Debate Association</p>
            </div>
          </RouterLink>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-6">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
