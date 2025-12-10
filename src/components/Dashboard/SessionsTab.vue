<template>
  <div class="bg-white rounded-xl shadow-sm border">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Mis Sesiones</h2>
        <div class="flex space-x-2">
          <button @click="sessionFilter = 'upcoming'"
            :class="sessionFilter === 'upcoming' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
            class="px-3 py-1 rounded-md text-sm font-medium">
            Próximas
          </button>
          <button @click="sessionFilter = 'completed'"
            :class="sessionFilter === 'completed' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
            class="px-3 py-1 rounded-md text-sm font-medium">
            Completadas
          </button>
        </div>
      </div>
    </div>

    <div class="p-6">
      <div class="space-y-4">
        <div v-for="session in filteredSessions" :key="session.id" class="border rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div class="flex items-start">
              <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User class="h-6 w-6 text-teal-600" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-gray-900">{{ getProfessional(session.professional_id).name }}</h3>
                <p class="text-sm text-gray-500">{{ getProfessional(session.professional_id).specialty }}</p>
                <p class="text-sm text-gray-500 mt-1">
                  {{ formatSessionDate(session.session_date) }} - {{ formatSessionTime(session.session_date) }}
                </p>
                <div v-if="session.notes" class="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <span class="font-medium">Notas:</span> {{ session.notes }}
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span :class="getStatusClass(session.completed)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ session.completed ? 'Completada' : 'Próxima' }}
              </span>
              <a v-if="!session.completed && session.videocall_url" :href="session.videocall_url" target="_blank"
                class="text-teal-600 hover:text-teal-700 text-sm font-medium border border-teal-600 px-3 py-1 rounded-md hover:bg-teal-50 transition-colors">
                Unirse
              </a>
              <button class="text-gray-400 hover:text-gray-600">
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
import { computed, ref } from 'vue'
import {
  User,
  MoreVertical
} from 'lucide-vue-next'
import { type Session } from '@/services/session/session.service'
import SessionService from '@/services/session/session.service'
import { useAuthStore } from '@/stores/auth.module'

interface Professional {
  id: string
  user_id?: string
  name: string
  specialty: string
}

const authStore = useAuthStore()

const props = defineProps({
  allSessions: {
    type: Array as () => Session[],
    required: true
  },
  sessionFilter: String,
  professionals: {
    type: Array as () => Professional[],
    required: false,
    default: () => []
  }
})

const emit = defineEmits(['update:sessionFilter', 'session-created'])

const sessionFilter = computed({
  get: () => props.sessionFilter,
  set: (value) => emit('update:sessionFilter', value)
})

const showCreateModal = ref(false)
const loading = ref(false)
const error = ref('')

const createForm = ref({
  professional_id: '',
  date: '',
  time: '',
  notes: ''
})

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
  // console.log('Looking for professional:', id, 'in', props.professionals)
  const pro = props.professionals.find(p => p.id === id || p.user_id === id)
  if (!pro) console.warn('Professional not found for ID:', id)
  return pro || { name: 'Unknown Therapist', specialty: 'General' }
}

const filteredSessions = computed(() => {
  if (sessionFilter.value === 'upcoming') {
    return props.allSessions.filter(session => !session.completed)
  } else {
    return props.allSessions.filter(session => session.completed)
  }
})

const getStatusClass = (completed: boolean) => {
  if (completed) {
    return 'bg-green-100 text-green-800'
  } else {
    return 'bg-blue-100 text-blue-800'
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

  const payload = {
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
    await SessionService.create(payload as any)
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