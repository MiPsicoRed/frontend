<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6">
        <h2 class="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar class="h-6 w-6" />
          Reservar Nueva Sesión
        </h2>
        <p class="text-teal-50 mt-1">Agenda tu próxima cita con nuestros profesionales</p>
      </div>

      <div class="p-8">
        <form @submit.prevent="bookSession" class="space-y-8">

          <!-- Step 1: Therapist Selection -->
          <section>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User class="h-5 w-5 text-teal-500" />
              1. Selecciona tu Terapeuta
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="therapist in professionals" :key="therapist.id" @click="selectTherapist(therapist.id)"
                class="cursor-pointer relative group rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md"
                :class="bookingForm.therapist === therapist.id ? 'border-teal-500 bg-teal-50' : 'border-gray-100 hover:border-teal-200 bg-white'">
                <div class="flex items-start gap-4">
                  <div
                    class="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 text-teal-600 font-bold text-lg">
                    {{ therapist.name.charAt(0) }}
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 group-hover:text-teal-700 transition-colors">{{ therapist.name
                      }}</h4>
                    <p class="text-sm text-gray-500">{{ therapist.specialty }}</p>
                  </div>
                </div>
                <div v-if="bookingForm.therapist === therapist.id" class="absolute top-3 right-3 text-teal-500">
                  <Check class="h-5 w-5" />
                </div>
              </div>
            </div>
          </section>

          <!-- Step 2: Date Selection -->
          <section>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar class="h-5 w-5 text-teal-500" />
              2. Elige una Fecha
            </h3>
            <div class="max-w-xs">
              <input v-model="bookingForm.date" type="date"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none text-gray-700 font-medium">
            </div>
          </section>

          <!-- Step 3: Time Selection -->
          <section>
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock class="h-5 w-5 text-teal-500" />
              3. Selecciona la Hora
            </h3>
            <div v-if="!bookingForm.date" class="text-gray-400 italic text-sm">
              Por favor selecciona una fecha primero para ver los horarios disponibles.
            </div>
            <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              <button v-for="time in availableTimes" :key="time" type="button" @click="bookingForm.time = time"
                :disabled="bookedSlots.includes(time)"
                class="py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border-2" :class="[
                  bookedSlots.includes(time)
                    ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed decoration-slice'
                    : bookingForm.time === time
                      ? 'bg-teal-600 border-teal-600 text-white shadow-md transform scale-105'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-600'
                ]">
                {{ time }}
              </button>
            </div>
          </section>

          <!-- Step 4: Notes -->
          <section>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Notas Adicionales</h3>
            <textarea v-model="bookingForm.notes" rows="3"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none text-gray-700 placeholder-gray-400"
              placeholder="¿Hay algo específico que quieras discutir?"></textarea>
          </section>

          <!-- Error Alert -->
          <div v-if="error" class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700">
            <div class="mt-0.5">⚠️</div>
            <p class="text-sm font-medium">{{ error }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button type="submit" :disabled="loading"
              class="w-full bg-teal-600 text-white py-4 px-6 rounded-xl hover:bg-teal-700 active:bg-teal-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2">
              <span v-if="loading" class="animate-spin">⏳</span>
              {{ loading ? 'Confirmando Cita...' : 'Confirmar Reserva' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Calendar, Clock, User, Check } from 'lucide-vue-next'
import SessionsService, { type Session } from '@/services/session/session.service'

/*
* ========================================================================
* Variables and interfaces
* ========================================================================
*/
interface Professional {
  id: string
  user_id?: string
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
const bookedSlots = ref<string[]>([])

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

const selectTherapist = (id: string) => {
  bookingForm.value.therapist = id
}

/* 
 * ========================================================================
 * Availability Check
 * ======================================================================== 
 */
const checkAvailability = async () => {
  if (!bookingForm.value.therapist || !bookingForm.value.date) {
    bookedSlots.value = []
    return
  }

  try {
    const response = await SessionsService.readProfessional({
      professional_id: bookingForm.value.therapist
    })

    const sessions = (response.data || response) as Session[]
    const selectedDateStr = bookingForm.value.date

    bookedSlots.value = sessions
      .filter(s => {
        if (s.completed || !s.session_date) return false
        const d = new Date(s.session_date)
        const dateStr = d.toISOString().split('T')[0]
        return dateStr === selectedDateStr
      })
      .map(s => {
        const d = new Date(s.session_date!)
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      })

  } catch (err) {
    console.error('Error checking availability:', err)
  }
}

watch(() => [bookingForm.value.therapist, bookingForm.value.date], () => {
  bookingForm.value.time = ''
  checkAvailability()
})

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
  if (!bookingForm.value.time) {
    error.value = 'Por favor selecciona una hora'
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
    await SessionsService.create(payload as any)

    bookingForm.value = { therapist: '', date: '', time: '', notes: '' }
    emit('session-booked')

  } catch (err: any) {
    console.error('Error creating session:', err)
    if (err?.response) {
      console.error('Response data:', err.response.data)
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
