<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
const committeesDropdownOpen = ref(false)
const committees = ref<Array<{id: string, name: string, slug: string}>>([])

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Committees', href: '/committees', hasDropdown: true },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

// Fetch committees for dropdown
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/committees')
    const data = await response.json()
    committees.value = data
  } catch (error) {
    console.error('Failed to fetch committees:', error)
  }
})
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
          <template v-for="item in navigation" :key="item.name">
            <!-- Regular navigation item -->
            <RouterLink
              v-if="!item.hasDropdown"
              :to="item.href"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
            >
              {{ item.name }}
            </RouterLink>
            
            <!-- Committees dropdown -->
            <div 
              v-else
              class="relative"
              @mouseenter="committeesDropdownOpen = true"
              @mouseleave="committeesDropdownOpen = false"
            >
              <button
                class="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50"
              >
                {{ item.name }}
                <ChevronDownIcon class="ml-1 h-4 w-4" />
              </button>
              
              <!-- Dropdown menu -->
              <div
                v-show="committeesDropdownOpen"
                class="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <div class="py-1">
                  <RouterLink
                    :to="item.href"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    All Committees
                  </RouterLink>
                  <div class="border-t border-gray-100"></div>
                  <RouterLink
                    v-for="committee in committees"
                    :key="committee.id"
                    :to="`/committees/${committee.slug}`"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {{ committee.name }}
                  </RouterLink>
                </div>
              </div>
            </div>
          </template>
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
