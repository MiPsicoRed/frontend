<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <DashboardNavBar v-model:showUserMenu="showUserMenu" v-model:activeTab="activeTab" :profile="userProfile" />
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <ProfessionalNavTabs v-model:activeTab="activeTab" />
      </div>

      <!-- Dashboard Content -->
      <div v-if="activeTab === 'dashboard'">
        <!-- Welcome Section -->
        <DoctorWelcomeSection :therapist="therapist.name" :numSessions="todaySessions.length" />

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DoctorStatsCards :todaySessions="todaySessions" />
        </div>

        <!-- Today's Sessions and Recent Patients -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ProfessionalTodaySessionsCard :todaySessions="todaySessions" />

          <!-- Recent Patients -->
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Pacientes Recientes</h3>
              <button @click="activeTab = 'patients'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Ver todos
              </button>
            </div>

            <div class="space-y-4">
              <div v-for="patient in recentPatients" :key="patient.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon class="h-5 w-5 text-blue-600" />
                  </div>
                  <div class="ml-4">
                    <p class="font-medium text-gray-900">{{ patient.name }}</p>
                    <p class="text-sm text-gray-500">{{ patient.lastSession }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar Tab -->
      <div v-if="activeTab === 'calendar'">
        <ProfessionalCalendarTab :sessions="sessions" :patients="enrichedPatients" @session-updated="fetchSessions" />
      </div>

      <!-- Sessions Tab -->
      <div v-if="activeTab === 'sessions'">
        <ProfessionalSessionsTab :sessions="sessions" :patients="enrichedPatients" @session-updated="fetchSessions" />
      </div>

      <!-- Patients Tab -->
      <div v-if="activeTab === 'patients'">
        <ProfessionalPatientsTab :patients="enrichedPatients" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, onUnmounted } from 'vue'
import { User as UserIcon } from 'lucide-vue-next'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import PatientService, { type Patient } from '@/services/patient/patient.service'
import UserService, { type User } from '@/services/user/user.service'
import { useAuthStore } from '@/stores/auth.module'

import DashboardNavBar from '@/components/Dashboard/NavBar.vue'
import ProfessionalNavTabs from '@/components/Dashboard/ProfessionalNavTabs.vue'
import DoctorWelcomeSection from '@/components/Dashboard/DoctorWelcomeSection.vue'
import DoctorStatsCards from '@/components/Dashboard/DoctorStatsCards.vue'
import ProfessionalTodaySessionsCard from '@/components/Dashboard/ProfessionalTodaySessionsCard.vue'
import ProfessionalSessionsTab from '@/components/Dashboard/ProfessionalSessionsTab.vue'
import ProfessionalPatientsTab from '@/components/Dashboard/ProfessionalPatientsTab.vue'
import ProfessionalCalendarTab from '@/components/Dashboard/ProfessionalCalendarTab.vue'

// =========================================
// Variables
// =========================================
const activeTab = ref('dashboard')
const showUserMenu = ref(false)

const sessions = ref<Session[]>([])
const user = ref<User>()
const professional = ref<Professional>()
const patients = ref<Patient[]>([])
const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

// =========================================
// COMPUTED PROPERTIES
// =========================================
const userProfile = computed(() => {
  const authStore = useAuthStore()
  const name = authStore.fullUserName || 'Usuario'
  return {
    first_name: name.split(' ')[0]
  }
})

const therapist = computed(() => {
  return {
    name: useAuthStore().fullUserName?.split(' ')[0] || 'bienvenido',
  }
})

const enrichedPatients = computed(() => {
  return patients.value.map(p => {
    const user = users.value.find(u => u.id === p.user_id)
    return {
      ...p,
      name: user ? `${user.username} ${user.usersurname}`.trim() : `Patient ${p.id?.substring(0, 8)}`
    }
  })
})

const todaySessions = computed(() => {
  const today = new Date()
  return sessions.value.filter((s: any) => {
    const raw = s.session_date ?? s.date ?? s.start_at
    if (!raw) return false
    const d = new Date(raw)
    return d.toDateString() === today.toDateString() && !s.completed
  }).map((s: any) => ({
    ...s,
    patientName: s.patient_name || `Patient ${s.patient_id?.substring(0, 8)}`
  }))
})

const recentPatients = computed(() => {
  return enrichedPatients.value.slice(0, 3).map((p: any) => ({
    id: p.id,
    name: p.name,
    lastSession: new Date(p.created_at).toLocaleDateString(),
    status: 'Activo'
  }))
})

// =========================================
// CRUD ACTIONS
// =========================================
const fetchProfessional = async () => {
  loading.value = true
  error.value = ''
  try {
    const authStore = useAuthStore()
    const userId = authStore.userId
    // console.log('Fetching professional for user ID:', userId)

    if (!userId) {
      throw new Error('User ID is required')
    }

    const response = await ProfessionalService.readSingleByUser({ user_id: userId })
    console.log('Professional response:', response)

    let proData: any = response
    if (Array.isArray(response)) {
      proData = response[0]
    } else if ((response as any).data) {
      proData = (response as any).data
      if (Array.isArray(proData)) {
        proData = proData[0]
      }
    }

    professional.value = proData as Professional
    console.log('Professional loaded:', professional.value)
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load professional data'
    console.error('Error fetching professional:', err)
  } finally {
    loading.value = false
  }
}

const fetchPatientDetails = async () => {
  if (!sessions.value.length) return

  try {
    // 1. Get unique patient IDs from sessions
    const patientIds = [...new Set(sessions.value.map(s => s.patient_id))]

    // 2. Fetch patient details for each ID
    const patientPromises = patientIds.map(id => PatientService.readSingle({ patient_id: id }))
    const patientResponses = await Promise.all(patientPromises)
    const patientsData = patientResponses.map(r => (r as any).data || r)

    // 3. Fetch all users to map names (since Patient only has user_id)
    //TODO: a prof can't get all users, find a way to get only the patients of the prof
    const usersResponse = await UserService.getAllUsers()
    const allUsers = Array.isArray(usersResponse) ? usersResponse : (usersResponse as any).data || []

    // 4. Create a map of patient_id -> name
    const patientNameMap = new Map<string, string>()

    patientsData.forEach((patient: any) => {
      if (patient && patient.user_id) {
        const user = allUsers.find((u: any) => u.id === patient.user_id)
        if (user) {
          patientNameMap.set(patient.id, `${user.username} ${user.usersurname}`)
        }
      }
    })

    // 5. Update sessions with patient_name
    sessions.value = sessions.value.map(session => ({
      ...session,
      patient_name: patientNameMap.get(session.patient_id) || 'Unknown Patient'
    }))

  } catch (err) {
    console.error('Error enriching patient data:', err)
  }
}

const fetchSessions = async () => {
  loading.value = true
  error.value = ''
  try {
    if (!professional.value?.id) {
      console.warn('No professional data available, cannot fetch sessions')
      return
    }
    console.log('Fetching sessions for professional ID:', professional.value.id)

    const response = await SessionsService.readProfessional({ professional_id: professional.value.id })
    console.log('Sessions response:', response)

    let sessData: any = response
    if ((response as any).data) {
      sessData = (response as any).data
    }

    sessions.value = Array.isArray(sessData) ? sessData : []
    console.log('Sessions loaded:', sessions.value.length, sessions.value)

    await fetchPatientDetails()

  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load sessions'
    console.error('Error fetching sessions:', err)
  } finally {
    loading.value = false
  }
}

const fetchProfPatients = async () => {
  loading.value = true
  error.value = ''
  try {
    if (!professional.value?.id) return

    const response = await PatientService.readByProfessional({ professional_id: professional.value.id })
    patients.value = Array.isArray(response) ? response : (response as any).data || []
    console.log('Patients loaded:', patients.value.length)
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Failed to load patients'
    console.error('Error fetching patients:', err)
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

// =========================================
// LIFECYCLE HOOKS
// =========================================
onMounted(async () => {
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }

  // Fetch data sequentially to avoid race conditions
  await Promise.all([
    fetchProfessional(),
  ])

  if (professional.value?.id) {
    await Promise.all([
      fetchSessions(),
      fetchProfPatients(),
      fetchUsers()
    ])
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})

// =========================================
// HELPERS
// =========================================
const handleClickOutside = (event: any) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}
</script>