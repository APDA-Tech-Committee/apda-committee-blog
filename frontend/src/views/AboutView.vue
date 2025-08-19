<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
    <!-- Hero -->
    <div class="relative bg-white border-b border-gray-200">
      <div class="relative flex items-center justify-center px-6 py-6">
        <div class="relative max-w-3xl w-full mx-auto px-8 py-6 text-center backdrop-blur-md bg-white border border-gray-200 shadow-lg animate-float clipped-24">
          
          <!-- Colored corner accents -->
          <div class="absolute top-0 left-0 w-6 h-6 bg-blue-600 opacity-20"></div>
          <div class="absolute top-0 right-0 w-5 h-5 bg-cyan-500 opacity-30"></div>
          <div class="absolute bottom-0 left-0 w-5 h-5 bg-indigo-600 opacity-25"></div>
          <div class="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 opacity-20"></div>

          <h1 class="text-4xl lg:text-5xl font-black tracking-tight text-blue-700 mb-6 leading-tight">
            About
            <span class="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient block mt-2 bg-[length:300%_300%]">
              APDA
            </span>
          </h1>
          <p class="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Learn more about the American Parliamentary Debate Association and our mission.
          </p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 flex items-center justify-center">
      <div class="max-w-5xl w-full mx-auto px-6 py-16">
        <div class="relative p-10 lg:p-14 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg clipped-20">
          <h2 class="text-3xl font-black text-blue-700 mb-6 uppercase tracking-tight">Welcome to APDA</h2>
          <p class="text-gray-700 leading-relaxed mb-8">
            The American Parliamentary Debate Association (APDA) is the oldest intercollegiate debate association in the United States.
            Founded in 1982, APDA has grown to include over 100 member schools across the country, fostering critical thinking,
            public speaking, and intellectual discourse among college students.
          </p>

          <h3 class="text-2xl font-bold text-blue-700 mb-4">Our Mission</h3>
          <p class="text-gray-700 leading-relaxed mb-8">
            APDA is committed to promoting parliamentary debate as a competitive and educational activity that develops
            students' abilities to think critically, speak persuasively, and engage with complex issues. We strive to
            create an inclusive and welcoming environment for debaters of all backgrounds and experience levels.
          </p>

          <h3 class="text-2xl font-bold text-blue-700 mb-4">Committee Structure</h3>
          <p class="text-gray-700 leading-relaxed mb-8">
            APDA operates through various committees that oversee different aspects of the organization, from
            tournament standards and technology infrastructure to gender equality and inclusion initiatives.
            Each committee is staffed by dedicated volunteers who work to improve the debate experience for all participants.
          </p>

          <div class="mt-12 text-center">
            <RouterLink
              to="/committees"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-600 shadow-lg transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 clipped-12"
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
