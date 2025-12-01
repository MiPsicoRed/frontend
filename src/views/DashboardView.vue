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
        <DashboardSessionsTab 
          :allSessions="sessions" 
          :professionals="therapists"
          v-model:sessionFilter="sessionFilter"
          @session-created="fetchSessions"
        />
      </div>

      <!-- Book Session Tab -->
      <div v-if="activeTab === 'book'">
        <DashboardBookSessionTab 
          :professionals="therapists"
          :patient-id="patient?.id"
          :session-type-id="sessionTypes?.[0]?.id"
          @session-booked="handleSessionBooked"
        />
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <!-- <DashboardSettingsTab :currentUser="currentUser" @save="saveSettings" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onBeforeMount } from 'vue'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import SessionTypeService, { type SessionType } from '@/services/session_type/session_type.service'
import PatientService, { type Patient } from '@/services/patient/patient.service'
import UserService, { type User } from '@/services/user/user.service'
import { useAuthStore } from '@/stores/auth.module'
import DashboardNavBar from '@/components/Dashboard/NavBar.vue'
import OnboardingModalForm from '@/components/Dashboard/NewPatientModal.vue'
import DashboardNavTabs from '@/components/Dashboard/NavTabs.vue'
import DashboardWelcomeSection from '@/components/Dashboard/WelcomeSection.vue'
import DashboardStatCards from '@/components/Dashboard/StatCards.vue'
import DashboardUpcomingSession from '@/components/Dashboard/UpcomingSession.vue'
import DashboardQuickActions from '@/components/Dashboard/QuickActions.vue'
import DashboardSessionsTab from '@/components/Dashboard/SessionsTab.vue'
import DashboardBookSessionTab from '@/components/Dashboard/BookSessionTab.vue'

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
const patient = ref<Patient>()
const professionals = ref<Professional[]>([])
const users = ref<User[]>([])
const sessionTypes = ref<SessionType[]>([])
const loading = ref(false)
const error = ref('')

/*
* =========================================
* Data fetching methods
* =========================================
*/
const fetchSessions = async () => {
  loading.value = true
  error.value = ''
  try {
    await fetchPatient() // Ensure patient data is loaded first
    const patientData = patient.value
    console.log('Fetching sessions for patient:', patientData)
    
    if (!patientData?.id) {
      console.warn('No patient data available')
      return
    }
    
    console.log

    const response = await SessionsService.readPatient({
      patient_id: patientData?.id
    })
    sessions.value = response.data || response
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load sessions'
    console.error('Error fetching sessions:', err)
  } finally {
    loading.value = false
  }
}

const fetchPatient = async () => {
  loading.value = true
  error.value = ''
  try {
    const authStore = useAuthStore()
    if (!authStore.userId) {
      throw new Error('User not logged in')
    }

    const response = await PatientService.readSingleByUser({ user_id: authStore.userId })   
    patient.value = response.data || response
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

const fetchUsers = async () => {
  try {
    const response = await UserService.getAllUsers()
    users.value = Array.isArray(response) ? response : (response as any).data || []
  } catch (err: any) {
    console.error('Error fetching users:', err)
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
  return professionals.value.map((p: any) => {
    // Find the user associated with this professional
    const user = users.value.find((u: any) => u.id === p.user_id)
    
    return {
      // Use user_id as the id, backend foreign key expects for sessions
      id: String(p.user_id ?? ''),
      name: user ? `${user.username} ${user.usersurname}`.trim() : `Prof ${p.user_id?.substring(0, 8) ?? 'Unknown'}`,
      specialty: p.specialty ?? (p.specializations && p.specializations[0]?.name) ?? 'General'
    }
  })
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
onBeforeMount(async () => {
  await Promise.all([
    fetchProfessionals(),
    fetchSessionTypes(),
    fetchUsers()
  ])
})

onMounted(() => {
  fetchSessions()
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
const handleSessionBooked = async () => {
  await fetchSessions()
  activeTab.value = 'sessions'
}

const handleClickOutside = (event: any) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
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