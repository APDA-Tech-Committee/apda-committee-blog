<!-- HeroBanner.vue -->
<template>
  <section
    :class="[
      'relative overflow-hidden',
      fullHeight ? 'h-screen' : '',
      orientation === 'row' ? 'flex flex-col lg:flex-row' : 'flex flex-col',
      wrapperClass
    ]"
    :style="sectionStyle"
  >
    <!-- Background -->
    <div
      v-if="backgroundImage || backgroundStyle"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="bgStyle"
      aria-hidden="true"
    />
    <!-- Overlay -->
    <div
      v-if="overlay"
      class="absolute inset-0 pointer-events-none"
      :style="{ background: overlay }"
      aria-hidden="true"
    />
    <!-- Optional decorative layers -->
    <div
      v-if="decorative"
      class="absolute inset-0 pointer-events-none"
      :class="['animate-mesh-morph']"
      :style="decorativeStyle"
      aria-hidden="true"
    />
    <div
      v-if="decorative"
      class="absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced"
      :style="{ background: 'linear-gradient(to right, var(--blobA-from), var(--blobA-to))' }"
      aria-hidden="true"
    />
    <div
      v-if="decorative"
      class="absolute top-0 right-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-enhanced animation-delay-2000"
      :style="{ background: 'linear-gradient(to right, var(--blobB-from), var(--blobB-to))' }"
      aria-hidden="true"
    />
    <div
      v-if="decorative"
      class="absolute bottom-0 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob-enhanced animation-delay-4000"
      :style="{ background: 'linear-gradient(to right, var(--blobC-from), var(--blobC-to))' }"
      aria-hidden="true"
    />
    <div
      v-if="decorative"
      class="absolute top-1/2 right-0 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob-enhanced animation-delay-6000"
      :style="{ background: 'linear-gradient(to right, var(--blobD-from), var(--blobD-to))' }"
      aria-hidden="true"
    />

    <!-- Content panel -->
    <div
      :class="[
        'relative z-10 mx-auto',
        contentMaxWidth,
        contentPadding,
        align === 'center' ? 'text-center' : (align === 'right' ? 'text-right ml-auto' : 'text-left'),
        contentClass
      ]"
    >
      <div
        :class="[
          glass
            ? 'backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl'
            : '',
          'relative',
          panelPadding,
          panelClass
        ]"
        :style="panelClipShadow"
      >
        <!-- Title -->
        <h1 v-if="title"
            :class="['font-bold tracking-tight leading-tight', titleSizeClass, titleClass]">
          <span v-if="titleGradient"
                class="bg-clip-text text-transparent"
                :style="{ backgroundImage: titleGradient, backgroundSize: '300% 300%' }">
            {{ title }}
          </span>
          <span v-else>{{ title }}</span>
        </h1>

        <!-- Subtitle -->
        <p v-if="subtitle"
           :class="['mt-4', subtitleSizeClass, subtitleClass]">
          {{ subtitle }}
        </p>

        <!-- Buttons -->
        <div v-if="buttons && buttons.length"
             :class="['mt-8 flex flex-col sm:flex-row gap-4', buttonsClass, align === 'center' ? 'justify-center' : (align === 'right' ? 'justify-end' : 'justify-start')]">
          <template v-for="(btn, i) in buttons" :key="i">
            <!-- Prefer RouterLink when 'to' is provided; fall back to <a> when 'href' is provided -->
            <component
              :is="btn.to ? RouterLink : 'a'"
              v-bind="btn.to ? { to: btn.to } : { href: btn.href, target: btn.target, rel: btn.rel || (btn.target === '_blank' ? 'noopener noreferrer' : undefined) }"
              :class="buttonClass(btn)"
              @click="$emit('button-click', { index: i, button: btn })"
            >
              <span class="relative z-10 flex items-center justify-center">
                <span v-if="btn.leadingIcon" class="mr-3" v-html="btn.leadingIcon" />
                {{ btn.label }}
                <span v-if="btn.trailingIcon" class="ml-3" v-html="btn.trailingIcon" />
              </span>
              <span v-if="btn.variant === 'primary'" class="absolute top-2 left-2 w-full h-full -z-10"
                    :style="primaryClip" />
            </component>
          </template>
        </div>

        <!-- Optional slot to allow fully custom content instead of props -->
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// Optional: only used if consumer passes a `to` prop for buttons
// If the app doesn't use vue-router, just pass `href` on buttons.
import { RouterLink } from 'vue-router'

type Button = {
  label: string
  to?: string | Record<string, unknown>
  href?: string
  target?: string
  rel?: string
  variant?: 'primary' | 'ghost' | 'link'
  leadingIcon?: string  // optional HTML (e.g., SVG)
  trailingIcon?: string // optional HTML (e.g., SVG)
  class?: string        // extra classes
}

const props = defineProps<{
  /* Layout/placement */
  fullHeight?: boolean
  orientation?: 'row' | 'col'
  align?: 'left' | 'center' | 'right'

  /* Background */
  backgroundImage?: string          // URL string
  backgroundStyle?: string          // Any CSS background value
  overlay?: string                  // e.g. 'rgba(2,6,23,0.6)' or 'linear-gradient(...)'
  decorative?: boolean              // enable/disable blobs/mesh

  /* Content */
  title?: string
  titleGradient?: string            // CSS gradient for title text
  subtitle?: string

  /* Buttons */
  buttons?: Button[]

  /* Glass panel & sizing */
  glass?: boolean
  titleSize?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  subtitleSize?: 'base' | 'lg' | 'xl'
  contentWidth?: 'sm' | 'md' | 'lg' | 'xl'
  padding?: 'sm' | 'md' | 'lg'

  /* Class hooks for full control */
  wrapperClass?: string
  contentClass?: string
  panelClass?: string
  titleClass?: string
  subtitleClass?: string
  buttonsClass?: string
}>();

defineEmits<{
  (e: 'button-click', payload: { index: number; button: Button }): void
}>()

/* Derived styles/classes */
const sectionStyle = computed(() => {
  // Allow consumer to position anywhere; no fixed/width baked in.
  return {}
})

const bgStyle = computed(() => {
  if (props.backgroundStyle) return { background: props.backgroundStyle }
  if (props.backgroundImage) return { backgroundImage: `url(${props.backgroundImage})` }
  return {}
})

const decorativeStyle = computed(() => ({
  background:
    'radial-gradient(ellipse at top left, rgba(59,130,246,0.20), transparent 50%),' +
    'radial-gradient(ellipse at bottom right, rgba(99,102,241,0.15), transparent 50%),' +
    'radial-gradient(ellipse at center, rgba(4,95,176,0.20), transparent 60%)'
}))

const contentMaxWidth = computed(() => {
  switch (props.contentWidth) {
    case 'sm': return 'max-w-md'
    case 'md': return 'max-w-lg'
    case 'lg': return 'max-w-xl'
    case 'xl': return 'max-w-2xl'
    default:   return '' // no default hardcoded width
  }
})

const contentPadding = computed(() => {
  switch (props.padding) {
    case 'sm': return 'px-4 py-8'
    case 'md': return 'px-6 py-10'
    case 'lg': return 'px-8 py-12'
    default:   return '' // keep unset unless user specifies
  }
})

const panelPadding = computed(() => {
  switch (props.padding) {
    case 'sm': return 'p-6'
    case 'md': return 'p-8'
    case 'lg': return 'p-12'
    default:   return ''
  }
})

const titleSizeClass = computed(() => {
  switch (props.titleSize) {
    case 'xl':  return 'text-3xl lg:text-4xl'
    case '2xl': return 'text-4xl lg:text-5xl'
    case '3xl': return 'text-5xl lg:text-6xl'
    case '4xl': return 'text-6xl lg:text-7xl'
    case '5xl': return 'text-7xl lg:text-8xl'
    case '6xl': return 'text-8xl lg:text-9xl'
    default:    return '' // no hardcoded default
  }
})

const subtitleSizeClass = computed(() => {
  switch (props.subtitleSize) {
    case 'base': return 'text-base lg:text-lg text-gray-200'
    case 'lg':   return 'text-lg lg:text-xl text-gray-200'
    case 'xl':   return 'text-xl lg:text-2xl text-gray-200'
    default:     return ''
  }
})

const primaryClip = computed(() => ({
  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
  background: 'rgba(15,23,42,0.5)'
}))

const panelClipShadow = computed(() => ({
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
  clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
}))

function buttonClass(btn: Button) {
  const base = 'group relative px-8 py-4 text-base font-bold transition-all duration-500 overflow-hidden transform-gpu uppercase tracking-wider'
  if (btn.variant === 'primary') {
    return [
      base,
      'text-white shadow-xl hover:shadow-blue-500/30',
      'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600',
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-600 before:via-blue-600 before:to-cyan-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500'
    ].concat(btn.class || '').join(' ')
  }
  if (btn.variant === 'link') {
    return [
      base,
      'text-gray-200 hover:text-white py-4 !px-0',
      'relative overflow-hidden',
      'before:absolute before:bottom-0 before:left-0 before:w-0 before:h-1',
      'before:bg-gradient-to-r before:from-cyan-400 before:to-blue-400 hover:before:w-full before:transition-all before:duration-300'
    ].concat(btn.class || '').join(' ')
  }
  // ghost / default
  return [
    base,
    'text-white/90 hover:text-white border border-white/20 bg-white/5 hover:bg-white/10'
  ].concat(btn.class || '').join(' ')
}
</script>

<style scoped>
/* Optional motion utilities mirrored from your original snippet */
@keyframes mesh {
  0% { transform: translateZ(0) }
  50% { transform: translateZ(0) }
  100% { transform: translateZ(0) }
}
.animate-mesh-morph { animation: mesh 12s ease-in-out infinite; }

@keyframes blob {
  0%   { transform: translate(0px, 0px) scale(1) }
  33%  { transform: translate(20px, -10px) scale(1.05) }
  66%  { transform: translate(-10px, 10px) scale(0.98) }
  100% { transform: translate(0px, 0px) scale(1) }
}
.animate-blob-enhanced { animation: blob 14s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s }
.animation-delay-4000 { animation-delay: 4s }
.animation-delay-6000 { animation-delay: 6s }


:host, :root, .animate-blob-enhanced {
  --blobA-from: #3b82f6; 
  --blobA-to:   #2563eb; 
  --blobB-from: #6366f1; 
  --blobB-to:   #2563eb; 
  --blobC-from: #2563eb; /* blue-600 */
  --blobC-to:   #4f46e5; /* indigo-600 */
  --blobD-from: #22d3ee; /* cyan-400 */
  --blobD-to:   #3b82f6; /* blue-500 */
}
</style>
