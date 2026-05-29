<template>
  <button 
    @click="handleJoin" 
    :disabled="isJoining"
    class="inline-flex items-center px-4 py-2 text-xs font-bold rounded-full text-white bg-brand-teal hover:bg-brand-teal-hover transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-md shadow-brand-teal/5"
  >
    <Video v-if="!isJoining" class="h-3.5 w-3.5 mr-1.5" />
    <Loader2 v-else class="h-3.5 w-3.5 mr-1.5 animate-spin" />
    {{ isJoining ? 'Entrando...' : 'Entrar' }}
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Video, Loader2 } from 'lucide-vue-next'
import { useToast } from 'vue-toastification'
import SessionsService, { type Session } from '@/services/session/session.service'

const props = defineProps<{
  session: Session
}>()

const toast = useToast()
const isJoining = ref(false)

const handleJoin = async () => {
  if (!props.session.session_date) {
    toast.error('La sesión no tiene una fecha programada.')
    return
  }

  const sessionDate = new Date(props.session.session_date)
  const now = new Date()
  
  // 5 minutes in milliseconds
  const FIVE_MINUTES = 5 * 60 * 1000
  const diff = sessionDate.getTime() - now.getTime()

  /* 
  if (diff > FIVE_MINUTES) {
    toast.info('No puedes entrar a la sesión todavía. Inténtalo 5 minutos antes del inicio.')
    return
  }
  */

  try {
    isJoining.value = true
    toast.info('Entrando en progreso...')
    
    const url = await SessionsService.getMeetUrl(props.session.id)
    
    if (url) {
      window.location.href = url
    } else {
      throw new Error('No se pudo obtener el link de la reunión')
    }
  } catch (error: any) {
    console.error('Error joining meeting:', error)
    const message = error.response?.data?.message || error.message || 'Error al entrar a la sesión'
    toast.error(message)
  } finally {
    isJoining.value = false
  }
}
</script>
