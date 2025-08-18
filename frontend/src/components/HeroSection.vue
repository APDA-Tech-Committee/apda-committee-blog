<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
    <div class="absolute inset-0 bg-black opacity-20"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          American Parliamentary
          <span class="text-primary-200">Debate Association</span>
        </h1>
        <p class="mt-6 text-lg leading-8 text-primary-100 max-w-3xl mx-auto">
          Advancing parliamentary debate through committee collaboration, educational resources, 
          and community engagement. Join us in fostering critical thinking and eloquent discourse.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <RouterLink
            to="/committees"
            class="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 transition-colors duration-200"
          >
            Explore Committees
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-sm font-semibold leading-6 text-white hover:text-primary-200 transition-colors duration-200"
          >
            Learn more <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <!-- Background decoration -->
    <div class="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
      <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-secondary-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
    </div>
  </div>
</template>
