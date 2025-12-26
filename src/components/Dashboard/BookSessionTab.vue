<template>
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- Left Sidebar: Context & Help -->
      <aside class="lg:col-span-3 space-y-6">
        <div
          class="bg-[#f4f3f0] rounded-2xl p-6 text-center h-full flex flex-col justify-center items-center relative overflow-hidden">
          <!-- Decorative circle/icon placeholder -->
          <div class="mb-6 relative">
            <div
              class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto border-2 border-gray-800">
              <User class="h-10 w-10 text-gray-700" />
            </div>
            <!-- Decorative elements could go here -->
          </div>

          <h2 class="text-xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            Elige a la profesional con quien quieres reservar
          </h2>

          <p class="text-sm text-gray-600 leading-relaxed mb-8">
            Reserva sesión con la profesional que tengas asignada o la primera consulta si aún no la has realizado.
          </p>

          <div class="mt-auto pt-8 border-t border-gray-200 w-full">
            <h3 class="font-bold text-gray-900 text-sm mb-1">¿Tienes dudas?</h3>
            <p class="text-xs text-gray-500 mb-1">Escríbenos a</p>
            <a href="mailto:info@mipsicopito.com"
              class="text-teal-600 underline text-sm hover:text-teal-800">info@mipsicopito.com</a>
          </div>
        </div>
      </aside>

      <!-- Center Content: Selection Flow -->
      <main class="lg:col-span-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[600px]">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900 font-serif">¿Con quién vas a reservar?</h2>
            <!-- Close button placeholder if needed, or just empty -->
          </div>

          <form @submit.prevent="bookSession" class="space-y-8">

            <!-- Step 1: Therapist Selection -->
            <section>
              <div v-if="loadingProfessionals" class="text-center py-8 text-gray-500">
                Cargando profesionales...
              </div>
              <div v-else-if="availableProfessionals.length === 0" class="text-center py-8 text-gray-500">
                No hay profesionales disponibles en este momento.
              </div>
              <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="therapist in availableProfessionals" :key="therapist.professional_id"
                  @click="selectTherapist(therapist.professional_id)"
                  class="cursor-pointer group flex flex-col items-center p-4 rounded-xl border transition-all duration-200"
                  :class="bookingForm.therapist === therapist.professional_id
                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-md bg-white'">

                  <div class="w-20 h-20 rounded-full bg-gray-100 mb-3 overflow-hidden border border-gray-100">
                    <!-- Placeholder for image, using initials -->
                    <div
                      class="w-full h-full flex items-center justify-center bg-teal-100 text-teal-700 font-bold text-xl">
                      {{ therapist.name.charAt(0) }}
                    </div>
                  </div>

                  <h3
                    class="font-bold text-gray-900 text-center text-sm mb-1 group-hover:text-teal-700 transition-colors">
                    {{ therapist.name }}
                  </h3>
                  <!-- Optional: Specialty or Title -->
                  <!-- <p class="text-xs text-gray-500">Psicóloga</p> -->
                </div>
              </div>
            </section>

            <!-- Step 2: Date Selection (Only visible after therapist selected) -->
            <section v-if="bookingForm.therapist" class="animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 class="text-lg font-bold text-gray-900 mb-4 font-serif">Elige una fecha</h3>
              <div class="max-w-xs mx-auto sm:mx-0">
                <input v-model="bookingForm.date" type="date"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-gray-700">
              </div>
            </section>

            <!-- Step 3: Time Selection -->
            <section v-if="bookingForm.date" class="animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 class="text-lg font-bold text-gray-900 mb-4 font-serif">Selecciona la hora</h3>
              <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
                <button v-for="time in availableTimes" :key="time" type="button" @click="bookingForm.time = time"
                  :disabled="bookedSlots.includes(time)"
                  class="py-2 px-2 rounded-lg text-sm font-medium transition-all duration-200 border" :class="[
                    bookedSlots.includes(time)
                      ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                      : bookingForm.time === time
                        ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-600'
                  ]">
                  {{ time }}
                </button>
              </div>
            </section>

            <!-- Step 4: Notes -->
            <section v-if="bookingForm.time" class="animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 class="text-lg font-bold text-gray-900 mb-4 font-serif">Notas</h3>
              <textarea v-model="bookingForm.notes" rows="2"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-gray-700 text-sm"
                placeholder="Mensaje opcional..."></textarea>
            </section>

            <!-- Error Alert -->
            <div v-if="error"
              class="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-sm">
              <span>⚠️</span>
              <p>{{ error }}</p>
            </div>

            <!-- Submit Button -->
            <div class="pt-4" v-if="bookingForm.time">
              <button type="submit" :disabled="loading"
                class="w-full bg-teal-600 text-white py-3 px-6 rounded-xl hover:bg-teal-700 transition-all duration-200 font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <span v-if="loading" class="animate-spin">⏳</span>
                {{ loading ? 'Procesando...' : 'Confirmar Reserva' }}
              </button>
            </div>

          </form>
        </div>
      </main>

      <!-- Right Sidebar: Summary -->
      <aside class="lg:col-span-3">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
          <h3 class="font-serif font-bold text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100 border-dashed">
            Resumen
          </h3>

          <div class="space-y-6">
            <div>
              <p class="text-sm font-bold text-gray-900 mb-1">Tipo de sesión</p>
              <p class="text-sm text-gray-600">Sesión de Psicología</p>
            </div>

            <div v-if="selectedProfessional">
              <p class="text-sm font-bold text-gray-900 mb-1">Profesional</p>
              <p class="text-sm text-gray-600">{{ selectedProfessionalName }}</p>
            </div>

            <div v-if="bookingForm.date">
              <p class="text-sm font-bold text-gray-900 mb-1">Fecha</p>
              <p class="text-sm text-gray-600">{{ formatDate(bookingForm.date) }}</p>
            </div>

            <div v-if="bookingForm.time">
              <p class="text-sm font-bold text-gray-900 mb-1">Hora</p>
              <p class="text-sm text-gray-600">{{ bookingForm.time }}</p>
            </div>
          </div>

          <div class="mt-12 pt-6 border-t border-gray-200">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Desglose de costes</h4>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-600">Sesión</span>
              <span class="text-sm font-medium text-gray-900">
                {{ selectedProfessional?.hourly_rate ? formatPrice(selectedProfessional.hourly_rate) : '--' }}
              </span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
              <span class="font-bold text-gray-900">Precio total</span>
              <span class="font-bold text-xl text-gray-900">
                {{ selectedProfessional?.hourly_rate ? formatPrice(selectedProfessional.hourly_rate) : '--' }}
              </span>
            </div>
          </div>

        </div>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { Calendar, Clock, User, Check } from 'lucide-vue-next'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import type { ProfessionalSelectorItem } from '@/services/professional/professional.types'
import { useAuthStore } from '@/stores/auth.module'
import PatientService from '@/services/patient/patient.service'
import type { CreatePayload as SessionCreatePayload } from '@/services/session/session.types'
import type { ReadSingleByUserQuery } from '@/services/patient/patient.types'

interface BookingFormData {
  therapist: string
  date: string
  time: string
  notes: string
}

const props = defineProps({
  professionals: {
    type: Array as () => any[], // Keeping loose type for compatibility
    required: false,
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
const availableProfessionals = ref<ProfessionalSelectorItem[]>([])
const loadingProfessionals = ref(false)
const selectedProfessional = ref<Professional | null>(null)
const authStore = useAuthStore()

console.log("EEUUUAUAUA " + authStore.userId)

const selectedProfessionalName = computed(() => {
  const pro = availableProfessionals.value.find(p => p.professional_id === bookingForm.value.therapist)
  return pro ? pro.name : ''
})

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

const selectTherapist = async (id: string) => {
  bookingForm.value.therapist = id
  // Fetch full professional details to get price
  try {
    const response = await ProfessionalService.readSingle({ professional_id: id })
    selectedProfessional.value = response.data || response
  } catch (err) {
    console.error('Error fetching professional details:', err)
  }
}

const fetchProfessionals = async () => {
  loadingProfessionals.value = true
  try {
    const response = await ProfessionalService.selector()
    availableProfessionals.value = response.data || response
  } catch (err) {
    console.error('Error fetching professionals:', err)
    if (props.professionals.length > 0) {
      availableProfessionals.value = props.professionals.map(p => ({
        professional_id: p.id,
        name: p.name
      }))
    }
  } finally {
    loadingProfessionals.value = false
  }
}

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

const bookSession = async () => {
  let finalPatientId = props.patientId

  try {
    if (authStore.userId) {
      const readSingleByUserQuery: ReadSingleByUserQuery = {
        user_id: authStore.userId.toString()
      }
      const response = await PatientService.readSingleByUser(readSingleByUserQuery)
      const patient = response.data || response
      finalPatientId = patient.id
    }
  } catch (err) {
    console.error('Error fetching patient:', err)
  }

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

  let sessionDate: string | null = null
  try {
    if (bookingForm.value.time) {
      sessionDate = `${bookingForm.value.date}T${bookingForm.value.time}:00`
      console.log(sessionDate)
    }
  } catch (e) {
    console.error('Error parsing session date:', e)
    return
  }

  if (!finalPatientId) {
    error.value = 'No se encontró un perfil de paciente válido. Si es tu primera vez, asegúrate de completar tus datos.'
    return
  }

  const sessionPayload: SessionCreatePayload = {
    patient_id: finalPatientId,
    professional_id: bookingForm.value.therapist,
    session_type_id: props.sessionTypeId || null,
    session_status_id: 1,
    session_date: sessionDate || null,
    videocall_url: null,
    notes: bookingForm.value.notes || null,
    session_duration: 60
  }

  try {
    loading.value = true
    error.value = ''
    await SessionsService.create(sessionPayload)
    bookingForm.value = { therapist: '', date: '', time: '', notes: '' }
    emit('session-booked')
  } catch (err: any) {
    console.error('Error creating session:', err)
    if (err?.response?.status === 422) {
      error.value = 'El servidor no pudo procesar la solicitud (422). Revisa los campos requeridos.'
      return
    }
    error.value = err?.response?.data?.message || err?.message || 'Error al reservar la sesión'
  } finally {
    loading.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  fetchProfessionals()
})
</script>

<style scoped>
.font-serif {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>
