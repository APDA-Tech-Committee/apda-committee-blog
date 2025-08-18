<script setup lang="ts">
import { RouterLink } from 'vue-router'
import backgroundImage from '../assets/background.jpg'

interface Props {
  title?: string
  subtitle?: string
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'American Parliamentary',
  subtitle: 'Committees',
  background: backgroundImage,
})
</script>

<template>
  <section class="h-screen flex items-center justify-center relative overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="`background-image: url(${props.background})`"
    ></div>
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.2),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_center,rgba(4,95,176,0.2),transparent_60%)] animate-mesh-morph"
    ></div>
    
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced"></div>
    <div class="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-enhanced animation-delay-2000"></div>
    <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-enhanced animation-delay-4000"></div>
    <div class="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced animation-delay-6000"></div>

    <div
      class="relative z-10 max-w-xl mx-auto px-8 text-center backdrop-blur-xl bg-white/10 border border-white/20 p-10 lg:p-12 animate-float shadow-2xl"
      style="box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2); clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px));"
    >
      <h1
        class="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-6 drop-shadow-lg"
      >
        {{ props.title }}
        <span
          class="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-enhanced block mt-2 bg-[length:300%_300%]"
        >
          {{ props.subtitle }}
        </span>
      </h1>

      <p class="text-lg lg:text-xl leading-8 text-gray-200 mb-8 max-w-lg mx-auto">
        Home page for all the committees working to make American Parliamentary Debate better.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          to="/committees"
          class="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-blue-500/30 transition-all duration-500 overflow-hidden transform-gpu uppercase tracking-wider"
          style="clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));"
        >
          <span class="relative z-10 flex items-center justify-center">
            <div
              class="w-0 h-0 border-t-[6px] border-t-white border-r-[6px] border-r-transparent border-b-[6px] border-b-white border-l-[6px] border-l-transparent mr-3 group-hover:rotate-45 transition-transform duration-300"
            ></div>
            Explore Committees
          </span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="text-base font-bold leading-6 text-gray-200 hover:text-white transition-all duration-300 group flex items-center justify-center py-4 relative overflow-hidden uppercase tracking-wider"
        >
          Learn more
          <div
            class="ml-3 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent group-hover:translate-x-2 group-hover:scale-110 transition-all duration-200"
          ></div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
