<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTeamMembers, type TeamMember } from '../utils/staticData'

const teamMembers = ref<TeamMember[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await getTeamMembers()
    teamMembers.value = response.members
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-12">
    <!-- Page Title + Tagline -->
    <div class="mb-16">
      <h1 class="text-3xl font-bold mb-3">Team</h1>
      <p class="text-text-secondary max-w-[70ch] text-lg font-light mb-6">
        Meet the people behind the APDA Tech Committee
      </p>
    </div>
    
    <div v-if="loading" class="space-y-8">
      <div v-for="i in 3" :key="i" class="animate-pulse">
        <div class="h-6 bg-gray-200 w-1/4 mb-3"></div>
        <div class="h-4 bg-gray-100 w-1/2 mb-10"></div>
      </div>
    </div>

    <div v-else-if="error" class="text-red-500 mb-8">
      {{ error }}
      <p class="text-text-secondary mt-2">Unable to load team information.</p>
    </div>

    <div v-else>
      <!-- Team Description -->
      <section class="mb-16">
        <p class="text-text-secondary mb-6 max-w-[70ch]">
          The APDA Technology Committee is responsible for developing and maintaining the association's digital infrastructure.
        </p>
        
        <div class="border-l-2 border-blueprint-blue pl-6">
          <h2 class="font-mono text-blueprint-blue mb-3">Our Mission</h2>
          <p class="text-text-secondary max-w-[60ch]">
            Our mission is to leverage technology to make debate more accessible, efficient, and engaging for all APDA members.
          </p>
        </div>
      </section>
      
      <!-- Team Members Grid -->
      <section>
        <h2 class="text-xl font-bold mb-8">Team Members</h2>
        
        <div class="space-y-12">
          <div v-for="member in teamMembers" :key="member.id" class="border-b border-blueprint-blue/10 pb-8">
            <div class="flex flex-row gap-6 items-start">
              <!-- Member Image (if available) -->
              <div v-if="member.imageUrl" class="w-20 h-20 shrink-0">
                <div class="border border-blueprint-blue/20 p-1 w-full h-full rounded overflow-hidden">
                  <img :src="member.imageUrl" :alt="member.name" class="w-full h-full object-cover" />
                </div>
              </div>
              <div v-else class="w-20 h-20 shrink-0 flex items-center justify-center border border-blueprint-blue/20 p-2 rounded">
                <div class="font-mono text-xl text-blueprint-blue/60">
                  {{ member.name.charAt(0) }}{{ member.name.split(' ')[1]?.charAt(0) || '' }}
                </div>
              </div>
              
              <!-- Member Info -->
              <div class="flex-1">
                <div class="font-mono text-blueprint-blue mb-1">{{ member.position }}</div>
                <h3 class="text-xl font-bold mb-3">{{ member.name }}</h3>
                <p class="text-text-secondary mb-4 max-w-[60ch]">
                  {{ member.bio || `${member.name} is a member of the APDA Tech Committee.` }}
                </p>
                
                <div class="font-mono text-sm">
                  <p v-if="member.email">
                    Email: <a :href="`mailto:${member.email}`" class="text-blueprint-blue hover:underline">{{ member.email }}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Contact Info -->
      <section class="mt-16 pt-8 border-t border-blueprint-blue/10">
        <div class="font-mono text-text-secondary mb-4">
          Contact the Tech Committee
        </div>
        <p class="text-text-secondary mb-4 max-w-[70ch]">
          If you have any questions, suggestions, or would like to contribute to APDA's technical projects, please reach out to us.
        </p>
        <a 
          href="mailto:tech@apda.online" 
          class="inline-block border border-blueprint-blue text-blueprint-blue px-6 py-3 hover:bg-blueprint-blue/5 transition-colors"
        >
          Email Us
        </a>
      </section>
    </div>
  </div>
</template>
