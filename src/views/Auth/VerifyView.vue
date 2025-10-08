<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import AuthService from '@/services/auth/auth.service'
import type { GenerateTokenPayload } from '@/services/auth/auth.types'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleTokenGen = async () => {
  const user_id = authStore.userId
  
  if (!user_id) {
    error.value = "No user id found"
    return
  }

  loading.value = true
  error.value = null
  success.value = false

  try {
    const payload: GenerateTokenPayload = { user_id }
    const response = await AuthService.generate_token(payload)
    success.value = true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Error al generar el token.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <div class="min-w-screen container flex items-center justify-center min-h-screen py-6 px-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6 space-y-6">
            <!-- Header -->
            <div class="space-y-2 text-center">
                <h1 class="text-2xl font-bold">Verificar cuenta</h1>
                <p class="text-gray-500">Haz clic en el botón para generar tu token de verificación</p>
            </div>

            <!-- Error Message -->
            <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

            <!-- Success Message -->
            <p v-if="success" class="text-green-600 text-sm text-center">¡Token enviado con éxito!</p>

            <!-- Verify Button -->
            <button
                @click="handleTokenGen"
                :disabled="loading"
                class="w-full py-2 px-4 bg-[#6A9997] hover:bg-[#5a8886] text-white font-medium rounded-md transition duration-200"
            >
                {{ loading ? 'Generando...' : 'Verificar cuenta' }}
            </button>
            </div>
        </div>
  </div>
</template>
