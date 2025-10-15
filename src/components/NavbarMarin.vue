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
  router.push('/login')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo / Brand -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center space-x-2">
            <!-- <div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">LOGO</span>
            </div> -->
            <span class="text-xl font-bold text-gray-900">MiPsicoRed</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <RouterLink
            to="/"
            class="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition"
            active-class="bg-indigo-50 text-indigo-600"
          >
            Home
          </RouterLink>
          
          <RouterLink
            v-if="authStore.isLoggedIn"
            to="/admin"
            class="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition"
            active-class="bg-indigo-50 text-indigo-600"
          >
            Admin
          </RouterLink>

          <!-- Auth Buttons -->
          <div v-if="!authStore.isLoggedIn" class="flex items-center space-x-2 ml-4">
            <RouterLink
              to="/login"
              class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              class="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition"
            >
              Sign Up
            </RouterLink>
          </div>

          <!-- User Menu (Logged In) -->
          <div v-else class="flex items-center space-x-3 ml-4">
            <div class="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-semibold">
                  {{ authStore.currentUser?.username?.charAt(0).toUpperCase() || 'U' }}
                </span>
              </div>
              <span class="text-sm font-medium text-gray-700">
                {{ authStore.currentUser?.username || 'User' }}
              </span>
            </div>
            <button
              @click="handleLogout"
              class="px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!mobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-gray-200 bg-white"
    >
      <div class="px-4 py-4 space-y-2">
        <RouterLink
          to="/"
          @click="mobileMenuOpen = false"
          class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition"
          active-class="bg-indigo-50 text-indigo-600"
        >
          Home
        </RouterLink>
        
        <RouterLink
          v-if="authStore.isLoggedIn"
          to="/admin"
          @click="mobileMenuOpen = false"
          class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition"
          active-class="bg-indigo-50 text-indigo-600"
        >
          Admin
        </RouterLink>

        <!-- Mobile Auth Section -->
        <div v-if="!authStore.isLoggedIn" class="pt-4 border-t border-gray-200 space-y-2">
          <RouterLink
            to="/login"
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition text-center"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition text-center"
          >
            Sign Up
          </RouterLink>
        </div>

        <!-- Mobile User Menu (Logged In) -->
        <div v-else class="pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg mb-2">
            <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <span class="text-white font-semibold">
                {{ authStore.currentUser?.username?.charAt(0).toUpperCase() || 'U' }}
              </span>
            </div>
            <div>
              <p class="font-medium text-gray-900">
                {{ authStore.currentUser?.username || 'User' }}
              </p>
              <p class="text-sm text-gray-500">
                {{ authStore.currentUser?.email || '' }}
              </p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>