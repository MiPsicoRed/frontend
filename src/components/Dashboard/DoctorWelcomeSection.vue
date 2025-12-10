<template>
  <div class="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 mb-8 shadow-sm border">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">¡Buenos días, Dr. {{ therapist }}!</h2>
        <p class="text-gray-600">Tienes {{ numSessions }} sesiones programadas para hoy</p>
      </div>
      <div class="hidden md:block">
        <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
          <Stethoscope class="h-8 w-8 text-teal-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Stethoscope } from 'lucide-vue-next'

const props = defineProps({
  therapist: {
    type: Object,
    required: true
  },
  numSessions: {
    type: Number,
    required: true
  }
})
</script>