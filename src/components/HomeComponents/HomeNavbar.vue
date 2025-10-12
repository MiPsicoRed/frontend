<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.module'

const authStore = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
  router.push('/')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-[#fcfaf7] shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo / Brand -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center">
            <!-- <span class="text-xl font-bold text-[#5a7d7c]">MiPsicoRed</span> -->
            <img src="/logo.svg" alt="MiPsicoRed Logo" class="h-12 w-auto" />
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <RouterLink to="/" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium"
            active-class="text-[#7a9e9f]">
            Servicios
          </RouterLink>

          <RouterLink to="/" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium"
            active-class="text-[#7a9e9f]">
            Nuestros Terapeutas
          </RouterLink>

          <RouterLink to="/" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium"
            active-class="text-[#7a9e9f]">
            Precios
          </RouterLink>

          <RouterLink to="/" class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium"
            active-class="text-[#7a9e9f]">
            Blog
          </RouterLink>
        </nav>

        <!-- Desktop Auth/User Section -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="md:hidden text-[#5a7d7c]" aria-label="Toggle menu">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Auth Buttons (Not Logged In) -->
          <div v-if="!authStore.isLoggedIn" class="hidden md:flex items-center space-x-4">
            <RouterLink to="/register"
              class="bg-[#7a9e9f] text-white px-6 py-2 rounded-full hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
              Registrarse
            </RouterLink>
            <RouterLink to="/login"
              class="bg-[#fcfaf7] text-[#7a9e9f] px-4 py-2 rounded-full text-center hover:shadow-lg transition border-[#7a9e9f] border">
              Iniciar sesión
            </RouterLink>
          </div>

          <!-- User Menu (Logged In) -->
          <div v-else class="hidden md:flex items-center space-x-3">
            <div class="flex items-center space-x-2 px-3 py-2 bg-white rounded-full shadow-sm">
              <div class="w-8 h-8 bg-[#7a9e9f] rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-semibold">
                  {{ authStore.fullUserName?.charAt(0).toUpperCase() || 'U' }}
                </span>
              </div>
              <span class="text-sm font-medium text-[#5a7d7c]">
                {{ authStore.fullUserName || 'User' }}
              </span>
            </div>
            <button @click="router.push('/admin')"
              class="px-4 py-2 rounded-full text-[#5a7d7c] hover:bg-white hover:shadow-sm font-medium transition">
              Panel
            </button>
            <button @click="handleLogout"
              class="px-4 py-2 rounded-full text-[#5a7d7c] hover:bg-white hover:shadow-sm font-medium transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-[#fcfaf7]/90 backdrop-blur-sm px-4 py-2 shadow-md">
      <nav class="flex flex-col space-y-3 pb-3">
        <RouterLink to="/" @click="mobileMenuOpen = false"
          class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium" active-class="text-[#7a9e9f]">
          Servicios
        </RouterLink>

        <RouterLink to="/" @click="mobileMenuOpen = false"
          class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium" active-class="text-[#7a9e9f]">
          Nuestros Terapeutas
        </RouterLink>

        <RouterLink to="/" @click="mobileMenuOpen = false"
          class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium" active-class="text-[#7a9e9f]">
          Precios
        </RouterLink>

        <RouterLink to="/" @click="mobileMenuOpen = false"
          class="text-[#5a7d7c] hover:text-[#7a9e9f] transition font-medium" active-class="text-[#7a9e9f]">
          Blog
        </RouterLink>

        <!-- Mobile Auth Section (Not Logged In) -->
        <div v-if="!authStore.isLoggedIn" class="pt-4 border-t border-[#7a9e9f]/20 space-y-2">
          <RouterLink to="/register" @click="mobileMenuOpen = false"
            class="block bg-gradient-to-r from-[#7a9e9f] to-[#b8d8d8] text-white px-4 py-2 rounded-full text-center hover:shadow-lg transition">
            Registrarse
          </RouterLink>
          <RouterLink to="/login" @click="mobileMenuOpen = false"
            class="block bg-[#fcfaf7] text-[#7a9e9f] px-4 py-2 rounded-full text-center hover:shadow-lg transition border-[#7a9e9f] border">
            Iniciar sesión
          </RouterLink>
        </div>

        <!-- Mobile User Menu (Logged In) -->
        <div v-else class="pt-4 border-t border-[#7a9e9f]/20">
          <div class="flex items-center space-x-3 px-4 py-3 rounded-lg mb-3">
            <div class="w-10 h-10 bg-[#7a9e9f] rounded-full flex items-center justify-center">
              <span class="text-white font-semibold">
                {{ authStore.fullUserName?.charAt(0).toUpperCase() || 'U' }}
              </span>
            </div>
            <div>
              <p class="font-medium text-[#5a7d7c]">
                {{ authStore.fullUserName || 'User' }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <button @click="router.push('/admin')"
              class="w-full px-4 py-2 rounded-full text-[#5a7d7c] hover:bg-white hover:shadow-sm font-medium transition text-center border border-[#7a9e9f]/30">
              Panel
            </button>
            <button @click="handleLogout"
              class="w-full px-4 py-2 rounded-full text-[#5a7d7c] hover:bg-white hover:shadow-sm font-medium transition text-center border border-[#7a9e9f]/30">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  </nav>
</template>