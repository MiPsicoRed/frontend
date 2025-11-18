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
          <DashboardWelcomeSection />
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
        <DashboardSessionsTab :allSessions="allSessions" v-model:sessionFilter="sessionFilter" />
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

// Reactive data

const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const sessionFilter = ref('upcoming')
const onboard = ref(true)

const sessions = ref<Session[]>([])
const professionals = ref<Professional[]>([])
const sessionTypes = ref<SessionType[]>([])
const loading = ref(false)
const error = ref('')

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
  const totalHours = completed * 1 // placeholder: 1 hour per session if not provided
  return { completed, totalHours }
})

// Derived / computed values for the template
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
    id: p.id,
    name: p.name ?? `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim(),
    specialty: p.specialty ?? (p.specializations && p.specializations[0]?.name) ?? ''
  }))
})

// Call fetchers on mount and clean up listeners
onMounted(() => {
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


const bookingForm = ref({
  therapist: '',
  date: '',
  time: '',
  notes: ''
})

// Methods
const bookSession = () => {
  // Handle session booking
  console.log('Booking session:', bookingForm.value)
  alert('¡Sesión reservada exitosamente!')
  bookingForm.value = {
    therapist: '',
    date: '',
    time: '',
    notes: ''
  }
}

const saveSettings = (settings: any) => {
  // Handle settings save
  console.log('Saving settings:', settings)
  alert('¡Configuración guardada exitosamente!')
}

// Close user menu when clicking outside
const handleClickOutside = (event: any) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

// (listener is added during onMounted and removed onUnmounted)
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