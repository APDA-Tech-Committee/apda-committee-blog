<template>
  <div class="p-12">
    <!-- Page Title + Tagline -->
    <div class="mb-16">
      <h1 class="text-3xl font-bold mb-3">About</h1>
      <p class="text-text-secondary max-w-[70ch] text-lg font-light mb-6">
        The APDA Tech Committee builds digital solutions for the American Parliamentary Debate Association.
      </p>
    </div>
    
    <!-- Main Content -->
    <div class="max-w-4xl">
      <section class="mb-12">
        <h2 class="text-xl font-bold mb-6">Our Mission</h2>
        <p class="text-text-secondary mb-6 max-w-[70ch]">
          The Tech Committee is committed to developing innovative digital tools and platforms that support the needs of the APDA community. Our projects range from tournament management systems and scoring applications to educational resources and communication platforms.
        </p>
        <p class="text-text-secondary mb-6 max-w-[70ch]">
          We believe technology can enhance the debate experience, improve tournament operations, and make parliamentary debate more accessible to all participants.
        </p>
      </section>
      
      <section class="mb-12">
        <h2 class="text-xl font-bold mb-6">What We Do</h2>
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="w-24 font-mono text-blueprint-blue">01</div>
            <div>
              <h3 class="font-medium mb-2">Tournament Technology</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Building and maintaining platforms for tournament registration, pairing, and tabulation.
              </p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="w-24 font-mono text-blueprint-blue">02</div>
            <div>
              <h3 class="font-medium mb-2">Web Development</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Creating and maintaining websites for APDA and related debate organizations.
              </p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="w-24 font-mono text-blueprint-blue">03</div>
            <div>
              <h3 class="font-medium mb-2">Mobile Applications</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Developing mobile tools to facilitate debate activities and access to resources.
              </p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="w-24 font-mono text-blueprint-blue">04</div>
            <div>
              <h3 class="font-medium mb-2">Data Analysis</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Collecting and analyzing debate data to provide insights and improve the competitive experience.
              </p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="w-24 font-mono text-blueprint-blue">05</div>
            <div>
              <h3 class="font-medium mb-2">Technical Support</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Providing technical assistance and solutions for APDA tournaments and events.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 class="text-xl font-bold mb-6">Join Us</h2>
        <p class="text-text-secondary mb-6 max-w-[70ch]">
          The Tech Committee welcomes contributions from developers, designers, and anyone interested in leveraging technology for debate. Whether you're a seasoned programmer or just getting started, there are many ways to get involved.
        </p>
        
        <div class="border border-blueprint-blue/20 p-8">
          <h3 class="font-mono text-blueprint-blue mb-4">Contact Information</h3>
          <div class="space-y-2 font-mono text-sm">
            <p>Email: <a href="mailto:tech@apda.online" class="text-blueprint-blue">tech@apda.online</a></p>
            <p>GitHub: <a href="https://github.com/APDA-Tech-Committee" target="_blank" class="text-blueprint-blue">github.com/APDA-Tech-Committee</a></p>
            <p>APDA: <a href="https://apda.online" target="_blank" class="text-blueprint-blue">apda.online</a></p>
          </div>
        </div>
        
        <div class="mt-8">
          <router-link to="/projects" class="text-blueprint-blue inline-flex items-center group">
            Explore our projects
            <span class="ml-1 text-blueprint-orange transition-transform duration-200 group-hover:translate-x-1">→</span>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>
