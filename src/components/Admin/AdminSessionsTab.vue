<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Sesiones</h2>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando sesiones...
    </div>

    <div v-else-if="sessions.length > 0" class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Paciente</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Profesional</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="session in sessions" :key="session.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm text-gray-900">{{ session.id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ getPatientName(session.patient_id) }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ getProfessionalName(session.professional_id) }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ formatDate(session.session_date) }}</td>
            <td class="px-6 py-3 text-sm">
              <span v-if="session.completed" class="text-green-600 font-medium">✓ Completada</span>
              <span v-else class="text-yellow-600 font-medium">Pendiente</span>
            </td>
            <td class="px-6 py-3 text-right text-sm">
              <button @click="openModal(session)" class="text-teal-600 hover:text-teal-800 font-medium">
                Ver Detalles
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
      No hay sesiones registradas.
    </div>

    <!-- Modal -->
    <SessionDetailsModal :is-open="showModal" :session="enrichedSession" @close="closeModal"
      @session-updated="handleSessionUpdated" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService from '@/services/professional/professional.service'
import UserService from '@/services/user/user.service'
import SessionDetailsModal from '@/components/Dashboard/SessionDetailsModal.vue'

const sessions = ref<Session[]>([])
const loading = ref(false)
const error = ref('')
const professionals = ref<any[]>([])
const users = ref<any[]>([])

// Modal state
const selectedSession = ref<Session | null>(null)
const showModal = ref(false)

const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString()
}

const getProfessionalName = (id: string) => {
  const pro = professionals.value.find(p => p.professional_id === id || p.id === id)
  return pro ? pro.name : id
}

const getPatientName = (id: string) => {
  const user = users.value.find(u => u.id === id)
  return user ? `${user.username} ${user.usersurname}` : id
}

// Enrich selected session with patient and professional names
const enrichedSession = computed(() => {
  if (!selectedSession.value) return null
  return {
    ...selectedSession.value,
    patient_name: getPatientName(selectedSession.value.patient_id),
    professional_name: getProfessionalName(selectedSession.value.professional_id)
  }
})

const fetchSessions = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await SessionsService.readAll()
    sessions.value = Array.isArray(response) ? response : (response as any).data || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to load sessions'
    console.error('Error fetching sessions:', err)
  } finally {
    loading.value = false
  }
}

const fetchProfessionals = async () => {
  try {
    const response = await ProfessionalService.selector()
    professionals.value = response.data || response
  } catch (err) {
    console.error('Error fetching professionals:', err)
  }
}

const fetchUsers = async () => {
  try {
    const response = await UserService.getAllUsers()
    users.value = Array.isArray(response) ? response : (response as any).data || []
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

const openModal = (session: Session) => {
  selectedSession.value = session
  showModal.value = true
}

const closeModal = () => {
  selectedSession.value = null
  showModal.value = false
}

const handleSessionUpdated = () => {
  fetchSessions()
}

onMounted(async () => {
  await Promise.all([
    fetchSessions(),
    fetchProfessionals(),
    fetchUsers()
  ])
})
</script>
