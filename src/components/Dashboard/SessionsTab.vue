<template>
  <div class="bg-white rounded-[2rem] border border-brand-border shadow-xs text-left">
    <div class="p-8 border-b border-brand-border">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <h2 class="text-lg font-bold font-serif text-brand-dark-text">Mis Sesiones</h2>
        <div class="flex space-x-2">
          <button @click="sessionFilter = 'upcoming'"
            :class="sessionFilter === 'upcoming' ? 'bg-brand-sage-bg border-brand-sage-border text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal'"
            class="px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer">
            Próximas
          </button>
          <button @click="sessionFilter = 'completed'"
            :class="sessionFilter === 'completed' ? 'bg-brand-sage-bg border-brand-sage-border text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal'"
            class="px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer">
            Completadas
          </button>
        </div>
      </div>
    </div>

    <div class="p-8">
      <div class="space-y-4">
        <div v-if="filteredSessions.length === 0" class="text-center py-12 text-brand-muted-teal text-xs font-medium">
          No hay sesiones programadas en esta sección.
        </div>
        <div v-else v-for="session in filteredSessions" :key="session.id" class="p-5 bg-brand-bg rounded-2xl border border-brand-border hover:border-brand-sage-border transition-all">
          <div class="flex items-start justify-between flex-wrap sm:flex-nowrap gap-4">
            <div class="flex items-start">
              <div class="w-11 h-11 bg-brand-sage-bg rounded-full flex items-center justify-center border border-brand-sage-border shrink-0">
                <User class="h-5 w-5 text-brand-teal" />
              </div>
              <div class="ml-4">
                <h3 class="text-xs font-bold text-brand-charcoal">{{ getProfessional(session.professional_id).name }}</h3>
                <p class="text-[11px] text-brand-cool-gray mt-1">
                  {{ formatSessionDate(session.session_date) }} • {{ formatSessionTime(session.session_date) }} hrs
                </p>
                <div v-if="session.notes" class="mt-3 text-xs text-brand-muted-teal bg-brand-sage-bg/25 border border-brand-sage-border/40 p-3 rounded-xl">
                  <span class="font-bold text-brand-charcoal">Notas:</span> {{ session.notes }}
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-3 self-start sm:self-center shrink-0 w-full sm:w-auto justify-end">
              <span :class="getStatusClass(session.completed)" class="px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full">
                {{ session.completed ? 'Completada' : 'Próxima' }}
              </span>
              <JoinMeetButton v-if="!session.completed" :session="session" />
              <button class="text-brand-cool-gray hover:text-brand-charcoal transition-colors cursor-pointer p-1">
                <MoreVertical class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  User,
  MoreVertical
} from 'lucide-vue-next'
import { type Session } from '@/services/session/session.service'
import type { CreatePayload } from '@/services/session/session.types'
import SessionService from '@/services/session/session.service'
import ProfessionalService from '@/services/professional/professional.service'
import { useAuthStore } from '@/stores/auth.module'
import JoinMeetButton from './JoinMeetButton.vue'

interface Professional {
  professional_id: string
  name: string
}

const authStore = useAuthStore()
const showCreateModal = ref(false)
const loading = ref(false)
const error = ref('')
const professionals = ref<Professional[]>([])

const props = defineProps({
  allSessions: {
    type: Array as () => Session[],
    required: true
  },
  sessionFilter: String
})

const emit = defineEmits(['update:sessionFilter', 'session-created'])

const sessionFilter = computed({
  get: () => props.sessionFilter,
  set: (value) => emit('update:sessionFilter', value)
})

const createForm = ref({
  professional_id: '',
  date: '',
  time: '',
  notes: ''
})

const fetchProfessionals = async () => {
  try {
    const response = await ProfessionalService.selector()
    professionals.value = response.data || response
  } catch (err) {
    console.error('Error fetching professionals:', err)
  }
}

const formatSessionDate = (date: Date | string | null): string => {
  if (!date) return '—'
  const d = new Date(date)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString()
}

const formatSessionTime = (date: Date | string | null): string => {
  if (!date) return '—'
  const d = new Date(date)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getProfessional = (id: string) => {
  const pro = professionals.value.find(p => p.professional_id === id)
  return pro || { name: 'Unknown Therapist', specialty: 'General' }
}

onMounted(async () => {
  fetchProfessionals()
})

const filteredSessions = computed(() => {
  if (sessionFilter.value === 'upcoming') {
    return props.allSessions.filter(session => !session.completed)
  } else {
    return props.allSessions.filter(session => session.completed)
  }
})

const getStatusClass = (completed: boolean) => {
  if (completed) {
    return 'bg-emerald-55/40 border border-emerald-200 text-emerald-800'
  } else {
    return 'bg-brand-sage-bg border border-brand-sage-border text-brand-teal'
  }
}

const createSession = async () => {
  // Validation
  if (!createForm.value.professional_id) {
    error.value = 'Por favor selecciona un terapeuta'
    return
  }
  if (!createForm.value.date) {
    error.value = 'Por favor selecciona una fecha'
    return
  }

  if (!authStore.userId) {
    error.value = 'Debes iniciar sesión para crear una sesión'
    return
  }

  // Build session_date from date + time
  let sessionDate: Date | null = null
  try {
    if (createForm.value.time) {
      sessionDate = new Date(`${createForm.value.date}T${createForm.value.time}:00`)
    } else {
      sessionDate = new Date(createForm.value.date)
    }
    if (isNaN(sessionDate.getTime())) sessionDate = null
  } catch (e) {
    sessionDate = null
  }

  // Format session_date to naive datetime string (YYYY-MM-DDTHH:MM:SS)
  let sessionDatePayload: string | null = null
  if (sessionDate) {
    const iso = sessionDate.toISOString()
    sessionDatePayload = iso.slice(0, 19)
  }

  const payload: CreatePayload = {
    patient_id: authStore.userId,
    professional_id: createForm.value.professional_id,
    session_type_id: null,
    session_status_id: null,
    session_date: sessionDatePayload,
    videocall_url: null,
    notes: createForm.value.notes || null,
    session_duration: null
  }

  try {
    loading.value = true
    error.value = ''
    console.log('Creating session payload:', payload)
    await SessionService.create(payload)
    alert('¡Sesión creada exitosamente!')
    showCreateModal.value = false
    createForm.value = {
      professional_id: '',
      date: '',
      time: '',
      notes: ''
    }
    // Emit event to refresh sessions in parent component
    emit('session-created')
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Error creando sesión'
    console.error('Error creating session:', err)
  } finally {
    loading.value = false
  }
}

</script>