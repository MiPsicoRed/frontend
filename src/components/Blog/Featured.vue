<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden mb-12">
        <div class="md:flex">
          <div class="md:w-1/2 h-96">
            <img 
              src="/placeholder.svg?height=600&width=800" 
              alt="Featured post" 
              class="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div class="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div class="flex items-center mb-4">
              <span class="bg-[#6A9997]/10 text-[#6A9997] text-xs font-medium px-2.5 py-0.5 rounded">
                Destacado
              </span>
              <span class="text-gray-500 text-sm ml-auto">15 Mayo 2023</span>
            </div>
            <h2 class="text-2xl font-bold mb-4 text-gray-800">La importancia de cuidar tu salud mental en la era digital</h2>
            <p class="text-gray-600 mb-6">
              En un mundo cada vez más conectado, es fundamental establecer límites saludables con la tecnología y priorizar nuestro bienestar mental. Descubre estrategias efectivas para mantener un equilibrio digital.
            </p>
            <NuxtLink to="/blog/salud-mental-era-digital" class="inline-flex items-center text-[#6A9997] font-medium hover:underline">
              Leer artículo completo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </NuxtLink>
          </div>
        </div>
      </div>
</template>