<!-- NewPatientModal.vue -->
<template>
  <div v-if="modelValue" class="fixed inset-0 bg-brand-charcoal/40 backdrop-blur-xs flex items-center justify-center z-50">
    <div class="bg-white rounded-[2rem] border border-brand-border shadow-lg max-w-md w-full mx-4 max-h-[85vh] overflow-y-auto text-left">
      <div class="p-8 border-b border-brand-border">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold font-serif text-brand-charcoal">Nuevo Paciente No Registrado</h3>
          <button @click="$emit('update:modelValue', false)" class="text-brand-cool-gray hover:text-brand-charcoal cursor-pointer transition-colors">
            <X class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div class="p-8">
        <form @submit.prevent="handleCreatePatient" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Nombre</label>
              <input 
                v-model="patientForm.firstName" 
                type="text" 
                required
                class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
              >
            </div>
            <div>
              <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Apellido</label>
              <input 
                v-model="patientForm.surname" 
                type="text" 
                required
                class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
              >
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Email</label>
            <input 
              v-model="patientForm.email" 
              type="email" 
              required
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Teléfono</label>
            <input 
              v-model="patientForm.phone" 
              type="tel"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Fecha de Nacimiento</label>
            <input 
              v-model="patientForm.dateOfBirth" 
              type="date"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Contacto de Emergencia</label>
            <input 
              v-model="patientForm.emergencyContactName" 
              type="text"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
              placeholder="Nombre del contacto"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Teléfono de Emergencia</label>
            <input 
              v-model="patientForm.emergencyContactPhone" 
              type="tel"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
            >
          </div>

          <div>
            <label class="block text-xs font-bold text-brand-charcoal mb-1.5">Notas</label>
            <textarea 
              v-model="patientForm.notes" 
              rows="3"
              class="w-full px-3.5 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] transition-all"
              placeholder="Notas adicionales sobre el paciente"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-2">
            <button 
              type="button" 
              @click="$emit('update:modelValue', false)"
              class="px-5 py-2.5 border border-brand-border text-brand-cool-gray hover:text-brand-charcoal bg-white rounded-full transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="px-5 py-2.5 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-brand-teal/5 disabled:opacity-50"
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
import { X } from 'lucide-vue-next'

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