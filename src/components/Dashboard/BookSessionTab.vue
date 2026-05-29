<template>
  <div class="max-w-5xl mx-auto">

    <!-- Page header -->
    <div class="mb-8">
      <h2 class="text-xl font-bold font-serif text-brand-charcoal">Reservar Sesión</h2>
      <p class="text-xs text-brand-cool-gray font-medium mt-1">Sigue los pasos para programar tu próxima cita.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

      <!-- ── WIZARD (left 2/3) ── -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Step progress bar -->
        <div class="bg-white rounded-[2rem] border border-brand-border p-6 shadow-xs">
          <div class="flex items-center gap-0">
            <template v-for="(step, i) in steps" :key="i">
              <!-- Step pill -->
              <div class="flex items-center gap-2 flex-1 min-w-0">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black transition-all"
                  :class="currentStep > i
                    ? 'bg-brand-teal text-white'
                    : currentStep === i
                      ? 'bg-brand-sage-bg border-2 border-brand-teal text-brand-teal'
                      : 'bg-brand-bg border border-brand-border text-brand-cool-gray'"
                >
                  <Check v-if="currentStep > i" class="w-3.5 h-3.5" />
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span
                  class="text-[10px] font-bold uppercase tracking-wider truncate transition-colors"
                  :class="currentStep >= i ? 'text-brand-charcoal' : 'text-brand-cool-gray'"
                >{{ step }}</span>
              </div>
              <!-- Connector -->
              <div v-if="i < steps.length - 1"
                class="h-px flex-1 mx-3 transition-colors"
                :class="currentStep > i ? 'bg-brand-teal' : 'bg-brand-border'"
              />
            </template>
          </div>
        </div>

        <!-- ── STEP 1: Choose therapist ── -->
        <div v-show="currentStep === 0" class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs">
          <h3 class="text-base font-bold font-serif text-brand-charcoal mb-1">Elige tu terapeuta</h3>
          <p class="text-xs text-brand-cool-gray font-medium mb-6">Selecciona con quién quieres trabajar.</p>

          <div v-if="loadingProfessionals" class="flex items-center justify-center py-12 gap-3">
            <div class="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
            <span class="text-xs text-brand-cool-gray font-medium">Cargando profesionales...</span>
          </div>

          <div v-else-if="availableProfessionals.length === 0" class="text-center py-12">
            <div class="w-12 h-12 bg-brand-sage-bg rounded-full flex items-center justify-center mx-auto mb-3 border border-brand-sage-border">
              <User class="w-5 h-5 text-brand-teal" />
            </div>
            <p class="text-xs text-brand-cool-gray font-medium">No hay profesionales disponibles en este momento.</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="therapist in availableProfessionals"
              :key="therapist.professional_id"
              @click="selectTherapist(therapist.professional_id)"
              class="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all group"
              :class="bookingForm.therapist === therapist.professional_id
                ? 'bg-brand-sage-bg border-brand-teal shadow-xs'
                : 'border-brand-border hover:border-brand-sage-border hover:bg-brand-bg'"
            >
              <!-- Avatar -->
              <div class="w-12 h-12 rounded-full bg-brand-sage-bg border border-brand-sage-border flex items-center justify-center shrink-0 overflow-hidden">
                <span class="text-brand-teal font-bold font-serif text-base">{{ therapist.name.charAt(0) }}</span>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0 text-left">
                <p class="text-xs font-bold text-brand-charcoal">{{ therapist.name }}</p>
                <p class="text-[10px] text-brand-cool-gray mt-0.5">Psicólogo Clínico</p>
              </div>

              <!-- Info button -->
              <button
                @click.stop="openProfessionalModal(therapist.professional_id, therapist.name)"
                class="text-[10px] font-bold border border-brand-border text-brand-cool-gray px-3 py-1.5 rounded-full hover:bg-white hover:text-brand-teal hover:border-brand-sage-border transition-all flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Info class="w-3 h-3" /> Perfil
              </button>

              <!-- Selected indicator -->
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                :class="bookingForm.therapist === therapist.professional_id
                  ? 'bg-brand-teal border-brand-teal'
                  : 'border-brand-border'"
              >
                <Check v-if="bookingForm.therapist === therapist.professional_id" class="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-8">
            <button
              @click="currentStep = 1"
              :disabled="!bookingForm.therapist"
              class="px-6 py-2.5 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-brand-teal/5 flex items-center gap-2"
            >
              Continuar <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- ── STEP 2: Date & Time ── -->
        <div v-show="currentStep === 1" class="space-y-5">

          <!-- Date picker -->
          <div class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs">
            <h3 class="text-base font-bold font-serif text-brand-charcoal mb-1">Elige una fecha</h3>
            <p class="text-xs text-brand-cool-gray font-medium mb-6">Selecciona el día de tu sesión.</p>
            <input
              v-model="bookingForm.date"
              type="date"
              :min="minDate"
              class="w-full sm:max-w-xs px-4 py-3 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-bold bg-[#F9FBFA] cursor-pointer transition-all"
            />
          </div>

          <!-- Time slots -->
          <div v-if="bookingForm.date" class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs">
            <h3 class="text-base font-bold font-serif text-brand-charcoal mb-1">Elige la hora</h3>
            <p class="text-xs text-brand-cool-gray font-medium mb-6">
              Las franjas en gris ya están reservadas.
            </p>

            <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
              <button
                v-for="time in availableTimes"
                :key="time"
                type="button"
                @click="bookingForm.time = time"
                :disabled="bookedSlots.includes(time)"
                class="py-3 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer"
                :class="[
                  bookedSlots.includes(time)
                    ? 'bg-brand-bg border-brand-border text-brand-cool-gray/40 cursor-not-allowed line-through'
                    : bookingForm.time === time
                      ? 'bg-brand-teal border-brand-teal text-white shadow-md shadow-brand-teal/10'
                      : 'bg-white border-brand-border text-brand-charcoal hover:border-brand-sage-border hover:text-brand-teal hover:bg-brand-sage-bg/30'
                ]"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <div class="flex justify-between">
            <button
              @click="currentStep = 0"
              class="px-6 py-2.5 border border-brand-border text-brand-cool-gray bg-white rounded-full hover:bg-brand-bg hover:text-brand-charcoal transition-all text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft class="w-3.5 h-3.5" /> Atrás
            </button>
            <button
              @click="currentStep = 2"
              :disabled="!bookingForm.date || !bookingForm.time"
              class="px-6 py-2.5 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-brand-teal/5 flex items-center gap-2"
            >
              Continuar <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- ── STEP 3: Notes & Confirm ── -->
        <div v-show="currentStep === 2" class="space-y-5">

          <div class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs">
            <h3 class="text-base font-bold font-serif text-brand-charcoal mb-1">Mensaje al terapeuta</h3>
            <p class="text-xs text-brand-cool-gray font-medium mb-6">Opcional — comparte cualquier contexto previo.</p>
            <textarea
              v-model="bookingForm.notes"
              rows="4"
              class="w-full px-4 py-3 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-[#F9FBFA] resize-none"
              placeholder="Ej: Hace tiempo que no duermo bien y me gustaría hablar sobre eso..."
            />
          </div>

          <!-- Error alert -->
          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-xs font-medium">
            <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
            <p>{{ error }}</p>
          </div>

          <div class="flex justify-between">
            <button
              @click="currentStep = 1"
              class="px-6 py-2.5 border border-brand-border text-brand-cool-gray bg-white rounded-full hover:bg-brand-bg hover:text-brand-charcoal transition-all text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft class="w-3.5 h-3.5" /> Atrás
            </button>
            <button
              @click="bookSession"
              :disabled="loading"
              class="px-8 py-3 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-brand-teal/5 flex items-center gap-2"
            >
              <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
              <CalendarCheck v-else class="w-4 h-4" />
              {{ loading ? 'Procesando...' : 'Confirmar Reserva' }}
            </button>
          </div>
        </div>

      </div>

      <!-- ── BOOKING SUMMARY (right 1/3, sticky) ── -->
      <aside class="lg:col-span-1">
        <div class="bg-white rounded-[2rem] border border-brand-border p-7 shadow-xs sticky top-24 text-left space-y-5">
          <h3 class="text-sm font-bold font-serif text-brand-charcoal pb-4 border-b border-brand-border">
            Resumen de Reserva
          </h3>

          <!-- Summary rows -->
          <div class="space-y-4">

            <!-- Therapist -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-brand-sage-bg border border-brand-sage-border rounded-xl flex items-center justify-center shrink-0">
                <User class="w-3.5 h-3.5 text-brand-teal" />
              </div>
              <div class="min-w-0">
                <p class="text-[9px] font-black text-brand-cool-gray uppercase tracking-widest">Terapeuta</p>
                <p class="text-xs font-bold text-brand-charcoal mt-0.5 truncate">
                  {{ selectedProfessionalName || '—' }}
                </p>
              </div>
            </div>

            <!-- Date -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-brand-sage-bg border border-brand-sage-border rounded-xl flex items-center justify-center shrink-0">
                <Calendar class="w-3.5 h-3.5 text-brand-teal" />
              </div>
              <div class="min-w-0">
                <p class="text-[9px] font-black text-brand-cool-gray uppercase tracking-widest">Fecha</p>
                <p class="text-xs font-bold text-brand-charcoal mt-0.5">
                  {{ bookingForm.date ? formatDate(bookingForm.date) : '—' }}
                </p>
              </div>
            </div>

            <!-- Time -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-brand-sage-bg border border-brand-sage-border rounded-xl flex items-center justify-center shrink-0">
                <Clock class="w-3.5 h-3.5 text-brand-teal" />
              </div>
              <div class="min-w-0">
                <p class="text-[9px] font-black text-brand-cool-gray uppercase tracking-widest">Hora</p>
                <p class="text-xs font-bold text-brand-charcoal mt-0.5">
                  {{ bookingForm.time ? bookingForm.time + ' hrs' : '—' }}
                </p>
              </div>
            </div>

          </div>

          <!-- Price -->
          <div class="pt-5 border-t border-brand-border space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs text-brand-muted-teal font-medium">Sesión (60 min)</span>
              <span class="text-xs font-extrabold text-brand-charcoal">
                {{ selectedProfessional?.hourly_rate ? formatPrice(selectedProfessional.hourly_rate) : '--' }}
              </span>
            </div>
            <div class="flex justify-between items-center pt-3 border-t border-brand-border">
              <span class="text-xs font-black text-brand-charcoal">Total</span>
              <span class="text-base font-black text-brand-teal font-serif">
                {{ selectedProfessional?.hourly_rate ? formatPrice(selectedProfessional.hourly_rate) : '--' }}
              </span>
            </div>
          </div>

          <!-- Help -->
          <div class="pt-4 border-t border-brand-border text-center">
            <p class="text-[10px] text-brand-cool-gray font-medium">¿Tienes dudas?</p>
            <a href="mailto:info@mipsicored.com" class="text-xs text-brand-teal font-bold hover:text-brand-teal-hover transition-colors">
              info@mipsicored.com
            </a>
          </div>
        </div>
      </aside>

    </div>

    <!-- Modals -->
    <ProfessionalCardModal
      :is-open="isModalOpen"
      :professional-id="modalProfessionalId"
      :professional-name="modalProfessionalName"
      @close="isModalOpen = false"
      @book="handleBookFromModal"
    />
    <StripeCheckoutModal
      :is-open="isStripeModalOpen"
      :client-secret="stripeClientSecret"
      @close="isStripeModalOpen = false"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import {
  Calendar, Clock, User, Check, Info,
  ArrowRight, ArrowLeft, AlertCircle, Loader2, CalendarCheck
} from 'lucide-vue-next'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import type { ProfessionalSelectorItem } from '@/services/professional/professional.types'
import { useAuthStore } from '@/stores/auth.module'
import PatientService from '@/services/patient/patient.service'
import type { CreatePayload as SessionCreatePayload } from '@/services/session/session.types'
import type { ReadSingleByUserQuery } from '@/services/patient/patient.types'
import ProfessionalCardModal from './ProfessionalCardModal.vue'
import StripeCheckoutModal from './StripeCheckoutModal.vue'
import CheckoutService from '@/services/checkout/checkout.service'

interface BookingFormData {
  therapist: string
  date: string
  time: string
  notes: string
}

const props = defineProps({
  professionals: { type: Array as () => any[], required: false, default: () => [] },
  sessionTypeId: { type: String, required: false, default: null },
  patientId: { type: String, required: false, default: null }
})

const emit = defineEmits(['session-booked'])

// ── State ──────────────────────────────────────────────
const currentStep = ref(0)
const steps = ['Terapeuta', 'Fecha y hora', 'Confirmación']

const bookingForm = ref<BookingFormData>({ therapist: '', date: '', time: '', notes: '' })
const loading = ref(false)
const error = ref('')
const bookedSlots = ref<string[]>([])
const availableProfessionals = ref<ProfessionalSelectorItem[]>([])
const loadingProfessionals = ref(false)
const selectedProfessional = ref<Professional | null>(null)
const authStore = useAuthStore()

const isModalOpen = ref(false)
const modalProfessionalId = ref('')
const modalProfessionalName = ref('')
const isStripeModalOpen = ref(false)
const stripeClientSecret = ref('')

// ── Computed ───────────────────────────────────────────
const selectedProfessionalName = computed(() => {
  const pro = availableProfessionals.value.find(p => p.professional_id === bookingForm.value.therapist)
  return pro ? pro.name : ''
})

const minDate = computed(() => new Date().toISOString().split('T')[0])

const availableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
]

// ── Methods ────────────────────────────────────────────
const openProfessionalModal = (id: string, name: string) => {
  modalProfessionalId.value = id
  modalProfessionalName.value = name
  isModalOpen.value = true
}

const handleBookFromModal = (id: string) => {
  selectTherapist(id)
  isModalOpen.value = false
}

const selectTherapist = async (id: string) => {
  bookingForm.value.therapist = id
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
    const response = await SessionsService.readProfessional({ professional_id: bookingForm.value.therapist })
    const sessions = (response.data || response) as Session[]
    const selectedDateStr = bookingForm.value.date
    bookedSlots.value = sessions
      .filter(s => {
        if (s.completed || !s.session_date) return false
        const d = new Date(s.session_date)
        return d.toISOString().split('T')[0] === selectedDateStr
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
      const query: ReadSingleByUserQuery = { user_id: authStore.userId.toString() }
      const response = await PatientService.readSingleByUser(query)
      finalPatientId = (response.data || response).id
    }
  } catch (err) {
    console.error('Error fetching patient:', err)
  }

  if (!bookingForm.value.therapist) { error.value = 'Por favor selecciona un terapeuta'; return }
  if (!bookingForm.value.date) { error.value = 'Por favor selecciona una fecha'; return }
  if (!bookingForm.value.time) { error.value = 'Por favor selecciona una hora'; return }
  if (!finalPatientId) { error.value = 'No se encontró un perfil de paciente válido.'; return }

  const sessionDate = `${bookingForm.value.date}T${bookingForm.value.time}:00`

  const sessionPayload: SessionCreatePayload = {
    patient_id: finalPatientId,
    professional_id: bookingForm.value.therapist,
    session_type_id: props.sessionTypeId || null,
    session_status_id: 1,
    session_date: sessionDate,
    videocall_url: null,
    notes: bookingForm.value.notes || null,
    session_duration: 60
  }

  try {
    loading.value = true
    error.value = ''
    await SessionsService.create(sessionPayload)

    const amount = selectedProfessional.value?.hourly_rate
      ? Math.round(selectedProfessional.value.hourly_rate * 100)
      : 2000

    const checkoutResponse = await CheckoutService.createSession({
      amount,
      currency: 'eur',
      success_url: window.location.origin + '/dashboard?payment=success',
      cancel_url: window.location.origin + '/dashboard?payment=cancel'
    })

    if (checkoutResponse.client_secret) {
      stripeClientSecret.value = checkoutResponse.client_secret
      isStripeModalOpen.value = true
    } else {
      error.value = 'Error al iniciar el pago.'
    }

    bookingForm.value = { therapist: '', date: '', time: '', notes: '' }
    currentStep.value = 0
  } catch (err: any) {
    console.error('Error creating session:', err)
    error.value = err?.response?.data?.message || err?.message || 'Error al reservar la sesión'
  } finally {
    loading.value = false
  }
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

onMounted(() => { fetchProfessionals() })
</script>
