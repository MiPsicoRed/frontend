<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Tipos de Sesión</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
      >
        + Crear Tipo
      </button>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando tipos de sesión...
    </div>

    <div v-else-if="sessionTypes.length > 0" class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Creado</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="type in sessionTypes" :key="type.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm text-gray-900">{{ type.id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ type.name }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ formatDate(type.created_at) }}</td>
            <td class="px-6 py-3 text-right">
              <button
                @click="deleteSessionType(type.id)"
                class="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
      No hay tipos de sesión registrados.
    </div>

    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Tipo de Sesión</h3>
        <form @submit.prevent="createSessionType" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              v-model="createForm.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              class="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              Crear
            </button>
            <button
              type="button"
              @click="showCreateModal = false"
              class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SessionTypeService, { type SessionType } from '@/services/session_type/session_type.service'

const sessionTypes = ref<SessionType[]>([])
const loading = ref(false)
const error = ref('')
const showCreateModal = ref(false)

const createForm = ref({
  name: ''
})

const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString()
}

const fetchSessionTypes = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await SessionTypeService.readAll()
    sessionTypes.value = Array.isArray(response) ? response : response.data || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to load session types'
    console.error('Error fetching session types:', err)
  } finally {
    loading.value = false
  }
}

const createSessionType = async () => {
  try {
    loading.value = true
    await SessionTypeService.create(createForm.value as any)
    alert('Tipo de sesión creado exitosamente')
    showCreateModal.value = false
    createForm.value = { name: '' }
    await fetchSessionTypes()
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Error creating session type'
    console.error('Error creating session type:', err)
  } finally {
    loading.value = false
  }
}

const deleteSessionType = async (typeId: string) => {
  if (!confirm('¿Estás seguro?')) return

  try {
    loading.value = true
    await SessionTypeService.delete({ session_type_id: typeId })
    await fetchSessionTypes()
    alert('Tipo de sesión eliminado exitosamente')
  } catch (err: any) {
    error.value = err?.message || 'Error deleting session type'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSessionTypes()
})
</script>

<style scoped>
.bg-teal-600 {
  background-color: #0d9488;
}

.hover\:bg-teal-700:hover {
  background-color: #0f766e;
}

.text-teal-600 {
  color: #0d9488;
}

.focus\:ring-teal-500:focus {
  --tw-ring-color: #14b8a6;
}

.focus\:border-teal-500:focus {
  border-color: #14b8a6;
}
</style>
