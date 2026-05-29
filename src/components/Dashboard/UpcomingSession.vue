<template>
  <div class="flex items-center text-left">
    <div class="w-10 h-10 bg-brand-sage-bg rounded-full flex items-center justify-center border border-brand-sage-border shrink-0">
      <User class="h-4.5 w-4.5 text-brand-teal" />
    </div>
    <div class="ml-4">
      <p class="text-xs font-bold text-brand-charcoal">{{ getProfessionalName(session.professional_id) }}</p>
      <p class="text-[11px] text-brand-cool-gray mt-0.5">{{ session.date }} • {{ session.time }} hrs</p>
    </div>
  </div>
  <div class="flex items-center space-x-2.5">
    <span class="px-2.5 py-0.5 bg-emerald-55/40 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-full">
      Confirmada
    </span>
    <JoinMeetButton :session="session" />
    <button class="text-brand-cool-gray hover:text-brand-charcoal transition-colors cursor-pointer p-1">
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
import JoinMeetButton from './JoinMeetButton.vue'

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
