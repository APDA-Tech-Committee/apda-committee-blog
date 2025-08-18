<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="relative overflow-hidden min-h-screen flex items-center">
    <!-- Animated gradient mesh background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
    
    <!-- Glass morphism container -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div class="text-center backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl leading-tight">
          APDA
          <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Debate Association
          </span>
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
          Home page for all the committees working to make American Parliamentary Debate better.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <RouterLink
            to="/committees"
            class="group relative rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span class="relative z-10">Explore Committees</span>
            <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors duration-200 group"
          >
            Learn more <span aria-hidden="true" class="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
