<template>
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="/images/logo.svg" alt="MiPsicoRed Logo" class="h-12 w-auto" />
          </NuxtLink>
        </div>
        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/#services" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition" onclick='scrollToSection("services", 100)'>Servicios</NuxtLink>
          <NuxtLink to="/#terapeutas" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition" onclick='scrollToSection("terapeutas", 100)'>Nuestros Terapeutas</NuxtLink>
          <!-- <router-link to="/#how-it-works" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition" onclick='scrollToSection("services", 100)'>Cómo Funciona</router-link> -->
          <NuxtLink to="/how-it-works" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition">Cómo Funciona</NuxtLink>
          <NuxtLink to="/blog" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition">Blog</NuxtLink>
        </nav>
        <div class="flex items-center space-x-8">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-[#5a7d7c]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex space-x-8">
          <a href="/register"
            class="hidden md:block bg-[#7a9e9f] text-white px-6 py-2 rounded-full hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
            Registrarse
          </a>
          <a href="/login"
            class="bg-[#fcfaf7] text-[#7a9e9f] px-4 py-2 rounded-full text-center hover:shadow-lg transition border-[#7a9e9f] border-1">
            Iniciar sesión
          </a>
        </div>
        </div>
        

      </div>
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-[#fcfaf7]/90 backdrop-blur-sm px-4 py-2 shadow-md">
        <nav class="flex flex-col space-y-3 pb-3">
          <a href="#services" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition">Servicios</a>
          <a href="#therapists" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition">Nuestros Terapeutas</a>
          <a href="/how-it-works" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition">Cómo Funciona</a>
          <a href="/blog" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition">Blog</a>
          <div>
            <a href="/register"
              class="bg-gradient-to-r from-[#7a9e9f] to-[#b8d8d8] text-white px-0 py-2 rounded-full text-center hover:shadow-lg transition">
              Registrate
            </a>
            <a href="/login"
              class="bg-gradient-to-r from-[#7a9e9f] to-[#b8d8d8] text-white px-0 py-2 rounded-full text-center hover:shadow-lg transition">
              Iniciar sesión
            </a>
          </div>

        </nav>
      </div>
</template>

<script setup>
import { ref } from 'vue';
const mobileMenuOpen = ref(false);

const scrollToSection = (id, offset = 100) => {
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}

</script>