<template>
  <div class="flex items-center">
    <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
      <User class="h-5 w-5 text-teal-600" />
    </div>
    <div class="ml-4">
      <p class="font-medium text-gray-900">{{ session.therapist }}</p>
      <p class="text-sm text-gray-500">{{ session.date }} - {{ session.time }}</p>
    </div>
  </div>
  <div class="flex items-center space-x-2">
    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
      Confirmada
    </span>
    <button class="text-gray-400 hover:text-gray-600">
      <MoreVertical class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup>
import { 
  User,
  MoreVertical
} from 'lucide-vue-next'

const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})
</script>
