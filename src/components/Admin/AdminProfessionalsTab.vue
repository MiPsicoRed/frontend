<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Profesionales</h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
      >
        + Crear Profesional
      </button>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando profesionales...
    </div>

    <div v-else-if="professionals.length > 0" class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Usuario ID</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tarifa Horaria</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acepta Seguro</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="prof in professionals" :key="prof.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm text-gray-900">{{ prof.id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ prof.user_id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600">${{ prof.hourly_rate || 'N/A' }}</td>
            <td class="px-6 py-3 text-sm">
              <span v-if="prof.accepts_insurance" class="text-green-600">✓ Sí</span>
              <span v-else class="text-gray-400">No</span>
            </td>
            <td class="px-6 py-3 text-right">
              <button
                @click="deleteProfessional(prof.id)"
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
      No hay profesionales registrados.
    </div>

    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Profesional</h3>
        <form @submit.prevent="createProfessional" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Usuario ID (UUID)</label>
            <input
              v-model="createForm.user_id"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Género ID</label>
            <input
              v-model.number="createForm.gender_id"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tarifa Horaria</label>
            <input
              v-model.number="createForm.hourly_rate"
              type="number"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <input v-model="createForm.accepts_insurance" type="checkbox" />
              Acepta Seguro
            </label>
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
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'

const professionals = ref<Professional[]>([])
const loading = ref(false)
const error = ref('')
const showCreateModal = ref(false)

const createForm = ref({
  user_id: '',
  gender_id: 1,
  hourly_rate: null as number | null,
  accepts_insurance: false
})

const fetchProfessionals = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await ProfessionalService.readAll()
    professionals.value = Array.isArray(response) ? response : response.data || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to load professionals'
    console.error('Error fetching professionals:', err)
  } finally {
    loading.value = false
  }
}

const createProfessional = async () => {
  try {
    loading.value = true
    await ProfessionalService.create(createForm.value as any)
    alert('Profesional creado exitosamente')
    showCreateModal.value = false
    createForm.value = { user_id: '', gender_id: 1, hourly_rate: null, accepts_insurance: false }
    await fetchProfessionals()
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Error creating professional'
    console.error('Error creating professional:', err)
  } finally {
    loading.value = false
  }
}

const deleteProfessional = async (profId: string) => {
  if (!confirm('¿Estás seguro?')) return

  try {
    loading.value = true
    await ProfessionalService.delete({ professional_id: profId })
    await fetchProfessionals()
    alert('Profesional eliminado exitosamente')
  } catch (err: any) {
    error.value = err?.message || 'Error deleting professional'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfessionals()
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
