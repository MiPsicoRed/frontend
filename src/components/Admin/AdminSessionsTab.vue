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
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="session in sessions" :key="session.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm text-gray-900">{{ session.id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ session.patient_id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ session.professional_id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ formatDate(session.session_date) }}</td>
            <td class="px-6 py-3 text-sm">
              <span v-if="session.completed" class="text-green-600 font-medium">✓ Completada</span>
              <span v-else class="text-yellow-600 font-medium">Pendiente</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
      No hay sesiones registradas.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SessionsService, { type Session } from '@/services/session/session.service'

const sessions = ref<Session[]>([])
const loading = ref(false)
const error = ref('')

const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString()
}

const fetchSessions = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await SessionsService.readAll()
    sessions.value = Array.isArray(response) ? response : response.data || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to load sessions'
    console.error('Error fetching sessions:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSessions()
})
</script>
