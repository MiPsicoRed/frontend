<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Reservar Nueva Sesión</h2>

      <form @submit.prevent="bookSession" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Seleccionar Terapeuta</label>
          <select v-model="bookingForm.therapist"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
            <option value="">Selecciona un terapeuta</option>
            <option v-for="therapist in professionals" :key="therapist.id" :value="therapist.id">
              {{ therapist.name }} - {{ therapist.specialty }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Preferida</label>
          <input v-model="bookingForm.date" type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
        </div>

        <div>
          <!-- TODO: [pol] Check available times based on therapist and date -->
          <label class="block text-sm font-medium text-gray-700 mb-2">Hora Preferida</label>
          <select v-model="bookingForm.time"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
            <option value="">Selecciona una hora</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notas (Opcional)</label>
          <textarea v-model="bookingForm.notes" rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Comparte cualquier información relevante para tu sesión..."></textarea>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ error }}
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          Creando sesión...
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          Reservar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SessionsService from '@/services/session/session.service'
 
/*
* ========================================================================
* Variables and interfaces
* ========================================================================
*/
interface Professional {
  id: string
  name: string
  specialty: string
}

interface BookingFormData {
  therapist: string
  date: string
  time: string
  notes: string
}

const props = defineProps({
  professionals: {
    type: Array as () => Professional[],
    required: true,
    default: () => []
  },
  sessionTypeId: {
    type: String,
    required: false,
    default: null
  },
  patientId: {
    type: String,
    required: false,
    default: null
  }
})

const bookingForm = ref<BookingFormData>({
    therapist: '',
    date: '',
    time: '',
    notes: ''
})

const emit = defineEmits(['session-booked'])
const loading = ref(false)
const error = ref('')


/* 
 * ========================================================================
 * CRUD actions
 * ======================================================================== 
 */
const bookSession = async () => {

  const finalPatientId = props.patientId

  // Basic validation
  if (!bookingForm.value.therapist) {
    error.value = 'Por favor selecciona un terapeuta'
    return
  }
  if (!bookingForm.value.date) {
    error.value = 'Por favor selecciona una fecha'
    return
  }

  //Date formatting
  let sessionDate: Date | null = null
  try {
    if (bookingForm.value.time) {
      sessionDate = new Date(`${bookingForm.value.date}T${bookingForm.value.time}:00`)
    } else {
      sessionDate = new Date(bookingForm.value.date)
    }
    if (isNaN(sessionDate.getTime())) sessionDate = null
  } catch (e) {
    sessionDate = null
  }

  //Payload creation
  let sessionDatePayload: string | null = null
  if (sessionDate) {
    const iso = sessionDate.toISOString()
    sessionDatePayload = iso.slice(0, 19)
  }

  const payload = {
    patient_id: finalPatientId,
    professional_id: bookingForm.value.therapist,
    session_type_id: props.sessionTypeId ?? null,
    session_status_id: null,
    session_date: sessionDatePayload,
    videocall_url: null,
    notes: bookingForm.value.notes || null,
    session_duration: null
  }

  //Session creation
  try {
    loading.value = true
    error.value = ''
    console.debug('Creating session payload:', payload)
    const res = await SessionsService.create(payload as any)
    emit('session-booked')

    //TODO: [pol] Res undefined on create
    // service returns { success: boolean } per types; assume success indicates creation
    // if (res && (res.success ?? true)) {
    //   alert('¡Sesión reservada exitosamente!')
    //   // reset form
    //   bookingForm.value = { therapist: '', date: '', time: '', notes: '' }
    //   // Emit event to parent component to refresh sessions
    //   emit('session-booked')
    // } else {
    //   console.warn('Unexpected create response', res)
    //   console.log('Res' + JSON.stringify(res))
    //   alert('No se pudo reservar la sesión. Por favor intenta de nuevo.')
    // }

  } catch (err: any) {
    console.error('Error creating session:', err)
    // log more useful backend response body if present
    if (err?.response) {
      console.error('Response data:', err.response.data)
      // if status 422 provide a clearer alert
      if (err.response.status === 422) {
        error.value = 'El servidor no pudo procesar la solicitud (422). Revisa los campos requeridos.'
        return
      }
    }
    error.value = err?.response?.data?.message || err?.message || 'Error al reservar la sesión'
  } finally {
    loading.value = false
  }
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
