<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <!-- Modern Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <!-- Animated background -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(4,95,176,0.4),transparent_70%)] animate-pulse"></div>
      <div class="absolute top-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div class="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div class="text-center">
          <!-- Glass morphism container with floating animation -->
          <div class="inline-block p-8 lg:p-10 rounded-3xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl animate-float">
            <div class="animate-text-stable">
              <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                About
                <span class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient block mt-2">
                  APDA
                </span>
              </h1>
              <p class="text-lg lg:text-xl leading-8 text-gray-200 max-w-2xl mx-auto">
                Learn more about the American Parliamentary Debate Association and our mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="prose prose-lg max-w-none">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Welcome to APDA</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            The American Parliamentary Debate Association (APDA) is the oldest intercollegiate debate association in the United States. 
            Founded in 1982, APDA has grown to include over 100 member schools across the country, fostering critical thinking, 
            public speaking, and intellectual discourse among college students.
          </p>
          
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            APDA is committed to promoting parliamentary debate as a competitive and educational activity that develops 
            students' abilities to think critically, speak persuasively, and engage with complex issues. We strive to 
            create an inclusive and welcoming environment for debaters of all backgrounds and experience levels.
          </p>

          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Committee Structure</h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            APDA operates through various committees that oversee different aspects of the organization, from 
            tournament standards and technology infrastructure to gender equality and inclusion initiatives. 
            Each committee is staffed by dedicated volunteers who work to improve the debate experience for all participants.
          </p>

          <div class="mt-8 text-center">
            <RouterLink
              to="/committees"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
            >
              Explore Our Committees
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </RouterLink>
          </div>
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

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateZ(0) perspective(1000px) rotateX(0deg) rotateY(0deg); 
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
  50% { 
    transform: translateY(-20px) translateZ(15px) perspective(1000px) rotateX(1deg) rotateY(0.5deg); 
    box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15);
  }
}

@keyframes text-stable {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-1px); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
  transform-style: preserve-3d;
}

.animate-text-stable {
  animation: text-stable 6s ease-in-out infinite;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
