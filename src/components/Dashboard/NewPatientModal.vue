<!-- NewPatientModal.vue -->
<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900">Nuevo Paciente No Registrado</h3>
          <button @click="$emit('update:modelValue', false)" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="handleCreatePatient" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input 
                v-model="patientForm.firstName" 
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <input 
                v-model="patientForm.surname" 
                type="text" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              v-model="patientForm.email" 
              type="email" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
            <input 
              v-model="patientForm.phone" 
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
            <input 
              v-model="patientForm.dateOfBirth" 
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contacto de Emergencia</label>
            <input 
              v-model="patientForm.emergencyContactName" 
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Nombre del contacto"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono de Emergencia</label>
            <input 
              v-model="patientForm.emergencyContactPhone" 
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notas</label>
            <textarea 
              v-model="patientForm.notes" 
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Notas adicionales sobre el paciente"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="$emit('update:modelValue', false)"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Creando...' : 'Crear Paciente' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'created'])

const patientForm = reactive({
  firstName: '',
  surname: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  notes: ''
})

const loading = ref(false)

const handleCreatePatient = async () => {
  loading.value = true
  try {
    console.log('Creating patient:', patientForm)
    emit('created', patientForm)
    emit('update:modelValue', false)
    
    // Reset form
    Object.keys(patientForm).forEach(key => {
      patientForm[key] = ''
    })
  } catch (error) {
    console.error('Error creating patient:', error)
  } finally {
    loading.value = false
  }
}
</script>