<template>
  <div class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs text-left">
    <div class="flex items-center justify-between mb-6 gap-4">
      <h3 class="text-base font-bold font-serif text-brand-charcoal">Sesiones de Hoy</h3>
      <button @click="activeTab = 'calendar'" class="text-brand-teal hover:text-brand-teal-hover text-xs font-bold transition-all cursor-pointer">
        Ver calendario
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="session in todaySessions" :key="session.id"
        class="flex items-center justify-between p-4 bg-[#F9FBFA] border border-brand-border rounded-2xl hover:border-brand-sage-border transition-all flex-wrap sm:flex-nowrap gap-4">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
            <User class="h-5 w-5 text-brand-teal" />
          </div>
          <div class="ml-4 text-left">
            <p class="text-xs font-bold text-brand-charcoal">{{ getProfessionalName(session.professional_id) }}</p>
            <p class="text-[10px] text-brand-cool-gray mt-0.5">{{ session.time }} - {{ session.type }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3 shrink-0">
          <span :class="getSessionStatusClass(session.status)" class="px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full">
            {{ session.status }}
          </span>
          <button v-if="session.status === 'Próxima'" class="text-brand-teal hover:text-brand-teal-hover text-xs font-bold transition-all cursor-pointer">
            Iniciar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import {
  User
} from 'lucide-vue-next'
import ProfessionalService from '@/services/professional/professional.service'

const props = defineProps({
  todaySessions: {
    type: Array,
    required: true
  },
  activeTab: String
})

const emit = defineEmits(['update:activeTab'])

const activeTab = computed({
  get: () => props.activeTab,
  set: (value) => emit('update:activeTab', value)
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

const getSessionStatusClass = (status) => {
  switch (status) {
    case 'Próxima':
      return 'bg-brand-sage-bg border border-brand-sage-border text-brand-teal'
    case 'En Progreso':
      return 'bg-emerald-55/40 border border-emerald-200 text-emerald-800'
    case 'Completada':
      return 'bg-brand-bg border border-brand-border text-brand-cool-gray'
    default:
      return 'bg-brand-bg border border-brand-border text-brand-cool-gray'
  }
}

onMounted(() => {
  fetchProfessionals()
})
</script>