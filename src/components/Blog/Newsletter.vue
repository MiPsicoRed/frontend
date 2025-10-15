<template>
  <div class="bg-[#6A9997] text-white rounded-lg p-6">
    <h3 class="text-lg font-bold mb-2">Suscríbete a nuestro boletín</h3>
    <p class="mb-4 text-sm">Recibe los últimos artículos y recursos directamente en tu bandeja de entrada.</p>
    <form @submit.prevent="subscribe" class="space-y-3">
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Tu correo electrónico"
          required
          class="w-full px-4 py-2 text-gray-800 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-white text-[#6A9997] font-medium rounded-md hover:bg-gray-100 transition duration-200"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Suscribiendo...' : 'Suscribirse' }}
      </button>
    </form>
    <p v-if="successMessage" class="mt-3 text-sm text-white">
      {{ successMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')

const subscribe = async () => {
  if (!email.value) return
  
  isLoading.value = true
  
  try {
    // In a real application, you would send this to your API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    successMessage.value = '¡Gracias por suscribirte! Revisa tu correo para confirmar.'
    email.value = ''
  } catch (error) {
    console.error('Error subscribing:', error)
  } finally {
    isLoading.value = false
  }
}
</script>