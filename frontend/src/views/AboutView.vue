<template>
  <div>
    <!-- Page Title + Tagline with divider -->
    <hr class="content-divider" />
    <div class="px-12 py-10">
      <h1 class="text-3xl font-bold mb-3 text-blueprint-blue">About</h1>
      <p class="max-w-[70ch] text-lg leading-relaxed">
        The APDA Tech Committee builds digital solutions for the American Parliamentary Debate Association.
      </p>
    </div>
    
    <!-- Main Content with dividers -->
    <hr class="content-divider" />
    <div class="px-12 py-10 max-w-4xl">
      <h2 class="text-xl font-bold mb-6 text-blueprint-blue">Our Mission</h2>
      <p class="mb-6 max-w-[70ch]">
        The Tech Committee is committed to developing innovative digital tools and platforms that support the needs of the APDA community. Our projects range from tournament management systems and scoring applications to educational resources and communication platforms.
      </p>
      <p class="mb-6 max-w-[70ch]">
        We believe technology can enhance the debate experience, improve tournament operations, and make parliamentary debate more accessible to all participants.
      </p>
    </div>
    
    <hr class="content-divider" />
    <div class="px-12 py-10 max-w-4xl">
      <h2 class="text-xl font-bold mb-8 text-blueprint-blue">What We Do</h2>
        <div>
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono">01</div>
            <div>
              <h3 class="font-medium mb-2">Tournament Technology</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Building and maintaining platforms for tournament registration, pairing, and tabulation.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono">02</div>
            <div>
              <h3 class="font-medium mb-2">Web Development</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Creating and maintaining websites for APDA and related debate organizations.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono">03</div>
            <div>
              <h3 class="font-medium mb-2">Mobile Applications</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Developing mobile tools to facilitate debate activities and access to resources.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono">04</div>
            <div>
              <h3 class="font-medium mb-2">Data Analysis</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Collecting and analyzing debate data to provide insights and improve the competitive experience.
              </p>
            </div>
          </div>
          
          <div class="flex items-start py-6">
            <div class="w-24 font-mono">05</div>
            <div>
              <h3 class="font-medium mb-2">Technical Support</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Providing technical assistance and solutions for APDA tournaments and events.
              </p>
            </div>
          </div>
        </div>
    </div>
    
    <!-- Join Us Section -->
    <hr class="content-divider" />
    <div class="px-12 py-10 max-w-4xl">
      <h2 class="text-xl font-bold mb-6">Join Us</h2>
      <p class="text-text-secondary mb-8 max-w-[70ch]">
        The Tech Committee welcomes contributions from developers, designers, and anyone interested in leveraging technology for debate. Whether you're a seasoned programmer or just getting started, there are many ways to get involved.
      </p>
      
      <div class="border border-black p-8 mb-8">
        <h3 class="font-mono mb-4">Contact Information</h3>
        <div class="space-y-2 font-mono text-sm">
          <p>Email: <a href="mailto:tech@apda.online" class="hover:text-blueprint-blue">tech@apda.online</a></p>
          <p>GitHub: <a href="https://github.com/APDA-Tech-Committee" target="_blank" class="hover:text-blueprint-blue">github.com/APDA-Tech-Committee</a></p>
          <p>APDA: <a href="https://apda.online" target="_blank" class="hover:text-blueprint-blue">apda.online</a></p>
        </div>
      </div>
      
      <div>
        <router-link to="/projects" class="inline-flex items-center group border border-black px-4 py-2">
          Explore our projects
          <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </router-link>
      </div>
    </div>
    
    <!-- Bottom divider -->
    <hr class="content-divider" />
  </div>
</template>
