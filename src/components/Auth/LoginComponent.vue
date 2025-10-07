<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  
  loading.value = true
  
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/admin') // Redirect after successful login
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-6 space-y-6">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <h1 class="text-2xl font-bold">Iniciar sesión</h1>
          <p class="text-gray-500">Ingresa tus credenciales para acceder a MiPsicoRed</p>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              type="text"
              placeholder="correo@ejemplo.com"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="******"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6A9997]"
            />
          </div>

          <!-- Forgot Password -->
          <!-- <div class="flex justify-end">
            <p @click="handleResetPassword" class="text-sm text-gray-600 cursor-pointer">¿Olvidaste tu contraseña?</p>
          </div> -->

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 px-4 bg-[#6A9997] hover:bg-[#5a8886] text-white font-medium rounded-md transition duration-200"
          >
            {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
          </button>
        </form>

        <!-- Sign Up Link -->
        <div class="text-center text-sm">
          ¿No tienes una cuenta?
          <a href="/register" class="text-[#6A9997] hover:underline ml-1">Crear cuenta</a>
        </div>
      </div>
    </div>
</template>
