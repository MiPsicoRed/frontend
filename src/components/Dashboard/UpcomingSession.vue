<template>
  <div class="flex items-center">
    <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
      <User class="h-5 w-5 text-teal-600" />
    </div>
    <div class="ml-4">
      <p class="font-medium text-gray-900">{{ getProfessionalName(session.professional_id) }}</p>
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
import { ref, onMounted } from 'vue'
import {
  User,
  MoreVertical
} from 'lucide-vue-next'
import ProfessionalService from '@/services/professional/professional.service'

const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})

const professionals = ref([])

const fetchProfessionals = async () => {
  try {
    const response = await ProfessionalService.selector()
    professionals.value = response.data || response
  } catch (err) {
    console.error('Error fetching professionals:', err)
  }
}

const getProfessionalName = (professionalId) => {
  const pro = professionals.value.find(p => p.professional_id === professionalId)
  return pro ? pro.name : 'Cargando...'
}

onMounted(() => {
  fetchProfessionals()
})
</script>
