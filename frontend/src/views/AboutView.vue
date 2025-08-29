<template>
  <div class="blueprint-grid">
    <hr class="standard-divider" />
    <div class="page-header">
      <h1 class="text-3xl font-bold mb-3 text-blueprint-blue">About</h1>
      <p class="max-w-[70ch] text-lg leading-relaxed">
        The APDA Tech Committee builds digital solutions for the American Parliamentary Debate Association.
      </p>
    </div>
    
    <hr class="accent-divider" />
    <hr class="standard-divider" />
    <div class="page-header max-w-4xl">
      <h2 class="text-xl font-bold mb-6 text-blueprint-blue">Our Mission</h2>
      <p class="mb-6 max-w-[70ch]">
        The Tech Committee works to create and maintain high-quality software for the APDA community. We provide technical solutions that streamline tournament operations and build open-source tools that can benefit the wider debate community.
      </p>
      <p class="mb-6 max-w-[70ch]">
        We believe technology can enhance the debate experience, improve tournament operations, and make parliamentary debate more accessible to all participants while ensuring that technical knowledge is well-documented and preserved.
      </p>
    </div>
    
    <hr class="standard-divider" />
    <div class="page-header max-w-4xl">
      <h2 class="text-xl font-bold mb-8 text-blueprint-blue">Our Projects</h2>
        <div>
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">01</div>
            <div>
              <h3 class="font-medium mb-2">MIT-Tab</h3>
              <p class="text-text-secondary max-w-[60ch]">
                Our flagship tabulation software designed specifically for parliamentary debate tournaments, handling pairings, judge assignments, and results tabulation.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">02</div>
            <div>
              <h3 class="font-medium mb-2">APDA Website</h3>
              <p class="text-text-secondary max-w-[60ch]">
                The official website for the American Parliamentary Debate Association, serving as a central hub for association information and resources.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">03</div>
            <div>
              <h3 class="font-medium mb-2">APDA Standings</h3>
              <p class="text-text-secondary max-w-[60ch]">
                A system for tracking team and speaker points throughout the competitive season, ensuring accurate and transparent rankings.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">04</div>
            <div>
              <h3 class="font-medium mb-2">NU-Tab Deployer</h3>
              <p class="text-text-secondary max-w-[60ch]">
                A deployment tool that simplifies the process of setting up tabulation software for tournaments, reducing technical barriers for tournament directors.
              </p>
            </div>
          </div>
          
          <div class="flex items-start py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">05</div>
            <div>
              <h3 class="font-medium mb-2">Tech Committee Blog</h3>
              <p class="text-text-secondary max-w-[60ch]">
                This platform for sharing project updates, documenting our processes, and engaging with the wider APDA community about technical matters.
              </p>
            </div>
          </div>
        </div>
    </div>
    
    <hr class="standard-divider" />
    <div class="page-header max-w-4xl">
      <h2 class="text-xl font-bold mb-8 text-blueprint-blue">Our Development Philosophy</h2>
        <div>
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">01</div>
            <div>
              <h3 class="font-medium mb-2">Open Source</h3>
              <p class="text-text-secondary max-w-[60ch]">
                All our projects are open-source, encouraging community contributions and transparency in our development process.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">02</div>
            <div>
              <h3 class="font-medium mb-2">User-Centered Design</h3>
              <p class="text-text-secondary max-w-[60ch]">
                We build tools with the needs of debaters, judges, and tournament directors in mind, ensuring usability and effectiveness.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">03</div>
            <div>
              <h3 class="font-medium mb-2">Documentation</h3>
              <p class="text-text-secondary max-w-[60ch]">
                We prioritize clear documentation to ensure our tools remain accessible and maintainable for future committee members and contributors.
              </p>
            </div>
          </div>
          
          <div class="flex items-start border-b border-black py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">04</div>
            <div>
              <h3 class="font-medium mb-2">Sustainability</h3>
              <p class="text-text-secondary max-w-[60ch]">
                We design our systems to be sustainable and maintainable in the long term, considering future needs and technical evolution.
              </p>
            </div>
          </div>
          
          <div class="flex items-start py-6">
            <div class="w-24 font-mono text-blueprint-orange font-bold">05</div>
            <div>
              <h3 class="font-medium mb-2">Collaboration</h3>
              <p class="text-text-secondary max-w-[60ch]">
                We work closely with the debate community to ensure our tools meet real-world needs and solve actual problems faced by users.
              </p>
            </div>
          </div>
        </div>
    </div>
    
    <hr class="standard-divider" />
    <div class="page-header max-w-4xl">
      <h2 class="text-xl font-bold mb-6">Join Us</h2>
      <p class="text-text-secondary mb-8 max-w-[70ch]">
        The Tech Committee welcomes contributions from developers, designers, and anyone interested in leveraging technology for debate. Whether you're a seasoned programmer or just getting started, there are many ways to get involved.
      </p>
      
      <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-black p-6">
          <h3 class="font-mono mb-3">Code Contributions</h3>
          <p class="text-text-secondary text-sm">Help develop new features or fix bugs in our existing projects using Python, TypeScript, and Vue.js.</p>
        </div>
        <div class="border border-black p-6">
          <h3 class="font-mono mb-3">Documentation</h3>
          <p class="text-text-secondary text-sm">Improve our guides, READMEs, and other documentation to make our tools more accessible.</p>
        </div>
        <div class="border border-black p-6">
          <h3 class="font-mono mb-3">Testing</h3>
          <p class="text-text-secondary text-sm">Help test new features before they're released to ensure quality and reliability.</p>
        </div>
        <div class="border border-black p-6">
          <h3 class="font-mono mb-3">Design</h3>
          <p class="text-text-secondary text-sm">Contribute to UI/UX improvements for our applications and websites.</p>
        </div>
      </div>
      
      <div class="border border-black p-8 mb-8">
        <h3 class="font-mono mb-4">Contact Information</h3>
        <div class="space-y-2 font-mono text-sm">
          <div class="p-4 border-l-4 border-blueprint-orange bg-blueprint-orange/5">
            <p>Email: <a href="mailto:joeymrubas@gmail.com" class="text-blueprint-orange font-medium hover:text-blueprint-orange/80 hover:no-underline">joeymrubas@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/APDA-Tech-Committee" target="_blank" class="text-blueprint-orange font-medium hover:text-blueprint-orange/80 hover:no-underline">github.com/APDA-Tech-Committee</a></p>
            <p>APDA: <a href="https://apda.online" target="_blank" class="text-blueprint-orange font-medium hover:text-blueprint-orange/80 hover:no-underline">apda.online</a></p>
          </div>
        </div>
      </div>
      
      <div>
        <router-link to="/projects" class="inline-flex items-center group border border-black px-4 py-2">
          Explore our projects
          <span class="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </router-link>
      </div>
    </div>
    
    <hr class="standard-divider" />
  </div>
</template>
