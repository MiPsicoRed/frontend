<template>
  <div>
    <!-- Header with Create Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Pacientes</h2>
      <button @click="showCreateModal = true"
        class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
        + Crear Paciente
      </button>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8 text-gray-500">
      Cargando pacientes...
    </div>

    <!-- Patients Table -->
    <div v-else-if="patients.length > 0" class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Usuario ID</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Género</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Teléfono</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fecha de Creación</th>
            <th class="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="patient in patients" :key="patient.id" class="hover:bg-gray-50">
            <td class="px-6 py-3 text-sm text-gray-900">{{ patient.id.substring(0, 8) }}...</td>
            <td class="px-6 py-3 text-sm text-gray-600 font-mono">{{ patient.user_id ? patient.user_id.substring(0, 8) +
              '...' : 'N/A' }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ patient.gender }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ patient.phone }}</td>
            <td class="px-6 py-3 text-sm text-gray-600">{{ formatDate(patient.created_at) }}</td>
            <td class="px-6 py-3 text-right">
              <button @click="deletePatient(patient.id)"
                class="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm font-medium transition">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
      No hay pacientes registrados.
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Paciente</h3>

        <form @submit.prevent="createPatient" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- Usuario -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Usuario *</label>
              <select v-model="patientCreateForm.user_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required>
                <option value="">-- Seleccionar Usuario --</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.username }} ({{ user.email }})
                </option>
              </select>
            </div>

            <!-- Género ID -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Género ID *</label>
              <input v-model.number="patientCreateForm.gender_id" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required />
            </div>

            <!-- Orientación Sexual ID -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Orientación Sexual ID *</label>
              <input v-model.number="patientCreateForm.sexual_orientation_id" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required />
            </div>

            <!-- Fecha de Nacimiento -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento *</label>
              <input v-model="patientCreateForm.birthdate" type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required/>
            </div>

            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
              <input v-model="patientCreateForm.phone" type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required />
            </div>

            <!-- Alergias -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Alergias</label>
              <input v-model="patientCreateForm.allergies" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ej: Penicilina, Lactosa" />
            </div>

            <!-- Medicamentos Actuales -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Medicamentos Actuales</label>
              <input v-model="patientCreateForm.current_medications" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ej: Ibuprofeno, Paracetamol" />
            </div>

            <!-- Nombre Contacto Emergencia -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contacto de Emergencia</label>
              <input v-model="patientCreateForm.emergency_contact_name" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Nombre" />
            </div>

            <!-- Teléfono Contacto Emergencia -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono Emergencia</label>
              <input v-model="patientCreateForm.emergency_contact_phone" type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Teléfono" />
            </div>

            <!-- Número de Póliza -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Número de Póliza de Seguro</label>
              <input v-model="patientCreateForm.insurance_policy_number" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Ej: POL-123456" />
            </div>

            <!-- Historial Médico -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Historial Médico</label>
              <textarea v-model="patientCreateForm.medical_history" rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Describe el historial médico del paciente"></textarea>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t">
            <button type="submit"
              class="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium">
              Crear
            </button>
            <button type="button" @click="showCreateModal = false"
              class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
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
import PatientService, { type Patient } from '@/services/patient/patient.service'
import type { CreatePayload as PatientCreatePayload } from '@/services/patient/patient.types'
import UserService, { type User } from '@/services/user/user.service'


//================================
// Variables
//================================

const patients = ref<Patient[]>([])
const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')
const showCreateModal = ref(false)

const patientCreateForm = ref({
  user_id: '',
  gender_id: 1,
  sexual_orientation_id: 1,
  birthdate: '',
  phone: '',
  allergies: '',
  current_medications: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  insurance_policy_number: '',
  medical_history: ''
})

//================================
// Fetchers
//================================

const fetchUsers = async () => {
  try {
    const response = await UserService.getAllUsers()
    users.value = Array.isArray(response) ? response : (response as any).data || []
  } catch (err: any) {
    console.error('Error fetching users:', err)
  }
}

const fetchPatients = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await PatientService.readAll()
    patients.value = Array.isArray(response) ? response : response.data || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Failed to load patients'
    console.error('Error fetching patients:', err)
  } finally {
    loading.value = false
  }
}

//================================
// CRUD actions
//================================

const createPatient = async () => {
  try {
    loading.value = true

    if (!patientCreateForm.value.user_id) {
      error.value = 'Usuario es requerido'
      return
    }

    const payload: PatientCreatePayload = {
      user_id: patientCreateForm.value.user_id,
      gender_id: patientCreateForm.value.gender_id,
      sexual_orientation_id: patientCreateForm.value.sexual_orientation_id,
      birthdate: patientCreateForm.value.birthdate,
      phone: patientCreateForm.value.phone,
      allergies: patientCreateForm.value.allergies || null,
      current_medications: patientCreateForm.value.current_medications || null,
      emergency_contact_name: patientCreateForm.value.emergency_contact_name || null,
      emergency_contact_phone: patientCreateForm.value.emergency_contact_phone || null,
      insurance_policy_number: patientCreateForm.value.insurance_policy_number || null,
      medical_history: patientCreateForm.value.medical_history || null
    }

    console.log('Patient payload:', payload)
    await PatientService.create(payload)
    alert('Paciente creado exitosamente')
    showCreateModal.value = false
    patientCreateForm.value = {
      user_id: '',
      gender_id: 1,
      sexual_orientation_id: 1,
      birthdate: '',
      phone: '',
      allergies: '',
      current_medications: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      insurance_policy_number: '',
      medical_history: ''
    }
    await fetchPatients()
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Error creating patient'
    console.error('Error creating patient:', err)
  } finally {
    loading.value = false
  }
}

const deletePatient = async (patientId: string) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este paciente?')) return

  try {
    loading.value = true
    await PatientService.delete({ patient_id: patientId })
    await fetchPatients()
    alert('Paciente eliminado exitosamente')
  } catch (err: any) {
    error.value = err?.message || 'Error deleting patient'
  } finally {
    loading.value = false
  }
}

//================================
// Lifecycle
//================================

onMounted(() => {
  fetchPatients()
  fetchUsers()
})


//================================
// Misc
//================================

const formatDate = (date: Date | string | null): string => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString()
}


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
