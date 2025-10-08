<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthService from '@/services/auth/auth.service'

const router = useRouter()

const route = useRoute()
const loading = ref(true)
const success = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  const token = route.query.token as string | undefined

  if (!token) {
    error.value = "No token provided"
    loading.value = false
    return
  }

  try {
    const res = await AuthService.verifyToken(token)
    console.log(res)
    success.value = true
    AuthService.logout()
  } catch (err: any) {
    error.value = "Token verification failed"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-w-screen container flex items-center justify-center min-h-screen py-6 px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-6 space-y-6">

        <!-- Header -->
        <div class="space-y-2 text-center">
          <h1 class="text-2xl font-bold">Verificación de cuenta</h1>
        </div>

        <!-- Status Messages -->
        <p v-if="loading" class="text-gray-500 text-center">Verificando token...</p>
        <p v-else-if="success" class="text-green-600 text-center font-medium">
          ✅ Tu cuenta ha sido verificada con éxito
        </p>
        <p v-else-if="error" class="text-red-600 text-center font-medium">{{ error }}</p>

        <button
          v-if="!error"
          @click="router.push('/login')"
          :disabled="loading"
          class="w-full py-2 px-4 bg-[#6A9997] hover:bg-[#5a8886] text-white font-medium rounded-md transition duration-200"
        >
          Continuar
        </button>

      </div>
    </div>
  </div>
</template>
