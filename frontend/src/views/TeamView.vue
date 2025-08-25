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
  <div class="bg-bg-primary">
    <!-- Page Title + Tagline with top divider -->
    <hr class="content-divider" />
    <div class="px-12 py-6">
      <h1 class="text-4xl font-bold mb-2 text-blueprint-blue">Team</h1>
      <p class="max-w-[70ch] text-lg leading-relaxed mb-4">
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
      <hr class="content-divider" />
      <section class="px-12 py-5">
        <p class="mb-4 max-w-[70ch] text-lg">
          The APDA Technology Committee is responsible for developing and maintaining the association's digital infrastructure.
        </p>
        
        <div class="bg-blueprint-blue/5 p-4 border-l-4 border-blueprint-blue">
          <h2 class="font-mono text-blueprint-blue font-bold mb-2">Our Mission</h2>
          <p class="max-w-[60ch]">
            Our mission is to leverage technology to make debate more accessible, efficient, and engaging for all APDA members.
          </p>
        </div>
      </section>
      
      <!-- Team Members Grid -->
      <hr class="content-divider" />
      <section class="px-12 py-5">
        <h2 class="text-2xl font-bold mb-5 text-blueprint-blue">Team Members</h2>
        
        <div class="space-y-10">
          <div v-for="member in teamMembers" :key="member.id" class="border-b border-black pb-6">
            <div class="flex flex-col sm:flex-row gap-6 items-start">
              <!-- Member Image (if available) -->
              <div v-if="member.imageUrl" class="w-28 h-28 shrink-0">
                <div class="w-full h-full overflow-hidden shadow-lg">
                  <img :src="member.imageUrl" :alt="member.name" class="w-full h-full object-cover" />
                </div>
              </div>
              <div v-else class="w-28 h-28 shrink-0 flex items-center justify-center bg-blueprint-blue/5 shadow-lg">
                <div class="font-mono text-2xl text-blueprint-blue">
                  {{ member.name.charAt(0) }}{{ member.name.split(' ')[1]?.charAt(0) || '' }}
                </div>
              </div>
              
              <!-- Member Info -->
              <div class="flex-1 pt-1">
                <div class="font-mono text-blueprint-blue mb-1">{{ member.position }}</div>
                <h3 class="text-xl font-bold mb-2">{{ member.name }}</h3>
                <p class="mb-3 max-w-[70ch]">
                  {{ member.bio || `${member.name} is a member of the APDA Tech Committee.` }}
                </p>
                
                <div class="flex flex-wrap gap-4 items-center">
                  <a v-if="member.email" :href="`mailto:${member.email}`" class="text-blueprint-blue font-medium inline-flex items-center">
                    <span>{{ member.email }}</span>
                  </a>
                  
                  <div v-if="member.socialLinks" class="flex gap-3">
                    <a v-if="member.socialLinks.github" :href="member.socialLinks.github" target="_blank" rel="noopener" class="text-blueprint-blue hover:underline">GitHub</a>
                    <a v-if="member.socialLinks.linkedin" :href="member.socialLinks.linkedin" target="_blank" rel="noopener" class="text-blueprint-blue hover:underline">LinkedIn</a>
                    <a v-if="member.socialLinks.twitter" :href="member.socialLinks.twitter" target="_blank" rel="noopener" class="text-blueprint-blue hover:underline">Twitter</a>
                    <a v-if="member.socialLinks.website" :href="member.socialLinks.website" target="_blank" rel="noopener" class="text-blueprint-blue hover:underline">Website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Contact Info -->
      <hr class="content-divider" />
      <section class="px-12 py-5">
        <h2 class="text-xl font-bold mb-3 text-blueprint-blue">Contact Us</h2>
        
        <p class="mb-4 max-w-[70ch]">
          If you have any questions, suggestions, or would like to contribute to APDA's technical projects, please reach out to us.
        </p>
        
        <a 
          href="mailto:tech@apda.online" 
          class="inline-block border-2 border-blueprint-blue text-blueprint-blue px-6 py-3 hover:bg-blueprint-blue/5 transition-colors font-medium"
        >
          Email tech@apda.online
        </a>
      </section>
    </div>
  </div>
</template>
