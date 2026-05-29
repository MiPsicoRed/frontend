<template>
  <div class="bg-white border border-brand-border rounded-[2rem] p-8 mb-8 flex items-center justify-between text-left hover:border-brand-sage-border transition-all">
    <div>
      <h2 class="text-2xl font-serif text-brand-charcoal mb-1 leading-tight">
        ¡Hola, Dr. {{ therapist }}!
      </h2>
      <p class="text-xs text-brand-muted-teal font-sans">
        Tienes {{ numSessions }} {{ numSessions === 1 ? 'sesión programada' : 'sesiones programadas' }} para hoy
      </p>
    </div>
    <div class="hidden md:block">
      <div class="w-12 h-12 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center">
        <Stethoscope class="h-5 w-5 text-brand-teal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Stethoscope } from 'lucide-vue-next'

const props = defineProps({
  therapist: {
    type: String,
    required: true
  },
  numSessions: {
    type: Number,
    required: true
  }
})
</script>