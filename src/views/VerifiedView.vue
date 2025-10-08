<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AuthService from '@/services/auth/auth.service'

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
  } catch (err: any) {
    error.value = "Token verification failed"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-w-screen container flex items-center justify-center min-h-screen py-6 px-4">
    <h1 class="text-2xl font-bold mb-4">Verificación de cuenta</h1>

    <p v-if="loading">Verificando token...</p>
    <p v-else-if="success" class="text-green-600">✅ Tu cuenta ha sido verificada con éxito</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>
