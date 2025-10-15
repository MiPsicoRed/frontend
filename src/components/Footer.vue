<template>
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="mb-4">
              <img src="/images/logo.svg" alt="NatureMind Logo" class="h-10 w-auto" />
            </div>
            <p class="text-gray-600">
              Tu red de apoyo emocional, estés donde estés
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Enlaces Rápidos</h4>
            <ul class="space-y-2">
              <li>
                <a href="#services" class="text-gray-600 hover:text-[#7a9e9f] transition">Servicios</a>
              </li>
              <li>
                <a href="#therapists" class="text-gray-600 hover:text-[#7a9e9f] transition">Nuestros Terapeutas</a>
              </li>
              <li>
                <a href="#how-it-works" class="text-gray-600 hover:text-[#7a9e9f] transition">Cómo Funciona</a>
              </li>
              <li>
                <a href="#pricing" class="text-gray-600 hover:text-[#7a9e9f] transition">Precios</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Contacto</h4>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#7a9e9f] mr-2 mt-0.5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@mipsicored.com</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#7a9e9f] mr-2 mt-0.5" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(555) 123-4567</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-800 mb-4">Boletín</h4>
            <p class="text-gray-600 mb-4">Recibe consejos de psicología y mindfulness</p>
            <div class="flex">
              <input type="email" placeholder="Tu correo"
                class="px-4 py-2 rounded-l-xl w-full focus:outline-none border border-gray-200 text-gray-800" />
              <button
                class="bg-gradient-to-r from-[#7a9e9f] to-[#b8d8d8] px-4 py-2 rounded-r-xl hover:shadow-md transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="border-t border-[#e8d5c4]/30 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {{ new Date().getFullYear() }} MiPsicoRed. Todos los derechos reservados.</p>
        </div>
      </div>
</template>