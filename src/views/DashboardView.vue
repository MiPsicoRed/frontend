<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <DashboardNavBar v-model:showUserMenu="showUserMenu" v-model:activeTab="activeTab"
         />
    </header>

    <div v-if="onboard" class="fixed inset-0 flex items-center justify-center bg-[#00000086] bg-opacity-50 w-full h-screen overflow-clip">
      <div>
        <OnboardingModalForm @closeOnboarding="onboard = false" />
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <DashboardNavTabs v-model:activeTab="activeTab" />
      </div>

      <!-- Dashboard Content -->
      <div v-if="activeTab === 'dashboard'">
        <!-- Welcome Section -->
        <div class="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 mb-8 shadow-sm border">
          <DashboardWelcomeSection :name="userName"/>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStatCards :nextSession="nextSession" :stats="stats" />
        </div>

        <!-- Upcoming Sessions -->
        <div class="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Próximas Sesiones</h3>
            <button @click="activeTab = 'sessions'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
              Ver todas
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="session in upcomingSessions" :key="session.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <DashboardUpcomingSession :session="session" />
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardQuickActions v-model:activeTab="activeTab" />
        </div>
      </div>

      <!-- Sessions Tab -->
      <div v-if="activeTab === 'sessions'">
        <DashboardSessionsTab :allSessions="sessions" v-model:sessionFilter="sessionFilter" />
      </div>

      <!-- Book Session Tab -->
      <div v-if="activeTab === 'book'">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Reservar Nueva Sesión</h2>

            <form @submit.prevent="bookSession" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Seleccionar Terapeuta</label>
                <select v-model="bookingForm.therapist"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                  <option value="">Selecciona un terapeuta</option>
                  <option v-for="therapist in therapists" :key="therapist.id" :value="therapist.id">
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

              <button type="submit"
                class="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                Reservar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <!-- <DashboardSettingsTab :currentUser="currentUser" @save="saveSettings" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import SessionTypeService, { type SessionType } from '@/services/session_type/session_type.service'
import PatientService, { type Patient } from '@/services/patient/patient.service'
import { useAuthStore } from '@/stores/auth.module'
import DashboardNavBar from '@/components/Dashboard/NavBar.vue'
import OnboardingModalForm from '@/components/Dashboard/NewPatientModal.vue'
import DashboardNavTabs from '@/components/Dashboard/NavTabs.vue'
import DashboardWelcomeSection from '@/components/Dashboard/WelcomeSection.vue'
import DashboardStatCards from '@/components/Dashboard/StatCards.vue'
import DashboardUpcomingSession from '@/components/Dashboard/UpcomingSession.vue'
import DashboardQuickActions from '@/components/Dashboard/QuickActions.vue'
import DashboardSessionsTab from '@/components/Dashboard/SessionsTab.vue'

/*
* =========================================
* Variables
* =========================================
*/
const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const sessionFilter = ref('upcoming')
const onboard = ref(false)
const sessions = ref<Session[]>([])
const patients = ref<Patient[]>([])
const patient = ref<Patient>()
const professionals = ref<Professional[]>([])
const sessionTypes = ref<SessionType[]>([])
const loading = ref(false)
const error = ref('')
const authStore = useAuthStore()
const bookingForm = ref({
  therapist: '',
  date: '',
  time: '',
  notes: ''
})


/*
* =========================================
* Data fetching methods
* =========================================
*/
//TODO: Fetch sessions for the logged-in patient only
const fetchSessions = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await SessionsService.readAll()
    sessions.value = response.data || response
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load sessions'
    console.error('Error fetching sessions:', err)
  } finally {
    loading.value = false
  }
}

//TODO: Fetch patient data for the logged-in user
const fetchPatient = async (user_id: any) => {
  loading.value = true
  error.value = ''
  try {
    const authStore = useAuthStore()
    if (!authStore.userId) {
      throw new Error('User not logged in')
    }
    const response = await PatientService.readAll()
    // You can store patient data if needed
    patients.value = response.data || response

    patient.value = patients.value.find((p: any) => p.user_id === authStore.userId)

    patients.value = <Patient[]>[]

  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load patient data'
    console.error('Error fetching patient:', err)
  } finally {
    loading.value = false
  }
}

const fetchSessionTypes = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await SessionTypeService.readAll()
    sessionTypes.value = (response && (response.data ?? response)) || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load session types'
    console.error('Error fetching session types:', err)
  } finally {
    loading.value = false
  }
}

//TODO: Fetch professionals only when necessary
const fetchProfessionals = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await ProfessionalService.readAll()
    professionals.value = (response && (response.data ?? response)) || []
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load professionals'
    console.error('Error fetching professionals:', err)
  } finally {
    loading.value = false
  }
}

/*
* =========================================
* Computed data
* =========================================
*/
const nextSession = computed(() => {
  const ups = upcomingSessions.value ?? []
  if (ups.length === 0) return { date: '—', time: '—' }
  const s = ups[0] as any
  const raw = s.session_date ?? s.date ?? s.start_at ?? null
  if (!raw) return { date: '—', time: '—' }
  const d = new Date(raw)
  if (isNaN(d.getTime())) return { date: '—', time: '—' }
  return { date: d.toLocaleDateString(), time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
})

const stats = computed(() => {
  // derive: use `completed` boolean when present
  const completed = sessions.value.filter((s: any) => !!s.completed).length
  const totalHours = sessions.value.length // I supose that each session is one hour, anyways i dont like this stat
  return { completed, totalHours }
})

const upcomingSessions = computed(() => {
  const now = new Date()
  try {
    return sessions.value
      .filter((s: any) => {
        // prefer session_date field if available
        const raw = s.session_date ?? s.date ?? s.start_at ?? null
        if (!raw) return !s.completed
        const d = new Date(raw)
        return (!s.completed) && !isNaN(d.getTime()) && d >= now
      })
      .sort((a: any, b: any) => {
        const da = new Date(a.session_date ?? a.date ?? a.start_at ?? 0).getTime()
        const db = new Date(b.session_date ?? b.date ?? b.start_at ?? 0).getTime()
        return da - db
      })
  } catch (e) {
    console.warn('Could not compute upcoming sessions', e)
    return []
  }
})

const allSessions = computed(() => {
  // return sessions sorted by date descending (most recent first)
  return [...sessions.value].sort((a: any, b: any) => {
    const da = new Date(a.session_date ?? a.date ?? a.start_at ?? 0).getTime()
    const db = new Date(b.session_date ?? b.date ?? b.start_at ?? 0).getTime()
    return db - da
  })
})

const therapists = computed(() => {
  return professionals.value.map((p: any) => ({
    // prefer UUID-like ids when available; fall back to user_id
    id: String(p.id ?? p.user_id ?? p.uuid ?? ''),
    name: p.name ?? `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim() ?? p.user_full_name ?? '',
    specialty: p.specialty ?? (p.specializations && p.specializations[0]?.name) ?? ''
  }))
})

const userName = computed(() => {
  const authStore = useAuthStore()
  return authStore.fullUserName?.split(' ')[0] || 'bienvenido'
})

const filteredProfessionals = computed(() => 
  professionals.value.filter(pro => 
    sessions.value.some(session => 
      session.professional_id === pro.id && session.patient_id === patient.value?.id
    )
  )
)



/*
* =========================================
* Lifecycle hooks
* =========================================
*/
onMounted(() => {
  fetchPatient(authStore.userId)
  fetchSessions()
  fetchProfessionals()
  fetchSessionTypes()
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})

/*
* =========================================
* Methods
* =========================================
*/  
const bookSession = async () => {
  // Basic validation
  if (!bookingForm.value.therapist) {
    alert('Por favor selecciona un terapeuta')
    return
  }
  if (!bookingForm.value.date) {
    alert('Por favor selecciona una fecha')
    return
  }

  // Build session_date from date + time (if provided)
  let sessionDate: Date | null = null
  try {
    if (bookingForm.value.time) {
      // combine date and time into ISO string
      sessionDate = new Date(`${bookingForm.value.date}T${bookingForm.value.time}:00`)
    } else {
      sessionDate = new Date(bookingForm.value.date)
    }
    if (isNaN(sessionDate.getTime())) sessionDate = null
  } catch (e) {
    sessionDate = null
  }

  if (!authStore.userId) {
    alert('Debes iniciar sesión para reservar una sesión')
    return
  }

  // Format session_date to a naive datetime string (YYYY-MM-DDTHH:MM:SS) because
  // backend expects chrono::NaiveDateTime (no timezone). If sessionDate is null, send null.
  let sessionDatePayload: string | null = null
  if (sessionDate) {
    // toISOString() returns 'YYYY-MM-DDTHH:MM:SS.sssZ', strip milliseconds and trailing Z
    const iso = sessionDate.toISOString()
    sessionDatePayload = iso.slice(0, 19)
  }


  const payload = {
    patient_id: patient.value?.id,
    professional_id: String(bookingForm.value.therapist),
    session_type_id: sessionTypes.value?.[0]?.id ?? null,
    session_status_id: null,
    session_date: sessionDatePayload,
    videocall_url: null,
    notes: bookingForm.value.notes || null,
    session_duration: null
  }

  try {
    loading.value = true
    console.debug('Creating session payload:', payload)
    const res = await SessionsService.create(payload as any)
    // service returns { success: boolean } per types; assume success indicates creation
    if (res && (res.success ?? true)) {
      alert('¡Sesión reservada exitosamente!')
      // refresh sessions to show the new booking
      await fetchSessions()
      // reset form
      bookingForm.value = { therapist: '', date: '', time: '', notes: '' }
      // switch to sessions tab to show created booking
      activeTab.value = 'sessions'
    } else {
      console.warn('Unexpected create response', res)
      console.log("Res" + JSON.stringify(res))
      alert('No se pudo reservar la sesión. Por favor intenta de nuevo.')
    }
  } catch (err: any) {
    console.error('Error creating session:', err)
    // log more useful backend response body if present
    if (err?.response) {
      console.error('Response data:', err.response.data)
      // if status 422 provide a clearer alert
      if (err.response.status === 422) {
        alert('El servidor no pudo procesar la solicitud (422). Revisa los campos requeridos.')
        return
      }
    }
    alert(err?.response?.data?.message || err?.message || 'Error al reservar la sesión')
  } finally {
    loading.value = false
  }
}

// Close user menu when clicking outside
const handleClickOutside = (event: any) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}
</script>

<style scoped>
/* Custom styles to match the mipsicored.com design */
.bg-teal-600 {
  background-color: #0d9488;
}

.hover\:bg-teal-700:hover {
  background-color: #0f766e;
}

.text-teal-600 {
  color: #0d9488;
}

.border-teal-500 {
  border-color: #14b8a6;
}

.focus\:ring-teal-500:focus {
  --tw-ring-color: #14b8a6;
}

.focus\:border-teal-500:focus {
  border-color: #14b8a6;
}
</style>