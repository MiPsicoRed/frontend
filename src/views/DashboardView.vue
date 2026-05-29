<template>
  <div class="min-h-screen bg-brand-bg font-sans flex flex-col">
    <!-- Top Navbar -->
    <header class="bg-white border-b border-brand-border sticky top-0 z-40 backdrop-blur-md bg-white/90 shrink-0">
      <DashboardNavBar v-model:showUserMenu="showUserMenu" v-model:activeTab="activeTab" :profile="userProfile" />
    </header>

    <!-- Onboarding loading overlay -->
    <div v-if="isCheckingOnboarding"
      class="fixed inset-0 flex flex-col items-center justify-center bg-brand-charcoal/80 w-full h-screen overflow-clip z-50 backdrop-blur-xs">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal mb-4"></div>
      <p class="text-white font-medium text-sm font-sans tracking-wide">Comprobando datos de usuario...</p>
    </div>

    <!-- Onboarding modal -->
    <div v-if="!isCheckingOnboarding && onboard"
      class="fixed inset-0 flex items-center justify-center bg-brand-charcoal/80 w-full h-screen overflow-clip z-50 backdrop-blur-xs">
      <div class="w-full max-w-4xl mx-4">
        <ModalForm :onboarding="true" @closeOnboarding="handleCloseOnboarding" />
      </div>
    </div>

    <!-- App shell: sidebar + content -->
    <div class="flex flex-1 overflow-hidden">

      <!-- ── SIDEBAR (only visible on dashboard tab on mobile, always on lg+) ── -->
      <DashboardSidebarNav
        v-model:activeTab="activeTab"
        :name="userName"
        :profile-picture="userProfile.profile_picture_url"
        :next-session="nextSession"
        class="hidden lg:flex"
      />

      <!-- ── MAIN CONTENT AREA ── -->
      <main class="flex-1 overflow-y-auto">

        <!-- === PANEL PRINCIPAL TAB === -->
        <div v-if="activeTab === 'dashboard'" class="px-8 py-8 max-w-4xl mx-auto space-y-8 animate-fade-in">

          <!-- Welcome banner (compact) -->
          <div class="bg-white border border-brand-border rounded-[2rem] px-8 py-6 shadow-xs">
            <DashboardWelcomeSection :name="userName" />
          </div>

          <!-- Stat chips row -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <DashboardStatCards :nextSession="nextSession" :stats="stats" />
          </div>

          <!-- Upcoming sessions -->
          <div class="bg-white rounded-[2rem] border border-brand-border p-8 shadow-xs">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-base font-bold text-brand-charcoal font-serif">Próximas Sesiones</h3>
              <button @click="activeTab = 'sessions'" class="text-xs text-brand-teal hover:text-brand-teal-hover font-bold transition-colors cursor-pointer underline underline-offset-4">
                Ver todas
              </button>
            </div>
            <div class="space-y-4">
              <div v-if="upcomingSessions.length === 0" class="text-brand-muted-teal text-xs py-8 font-medium text-center">
                No tienes sesiones programadas.
                <br/>
                <button @click="activeTab = 'book'" class="mt-3 inline-flex items-center gap-1.5 text-brand-teal font-bold hover:text-brand-teal-hover transition-colors cursor-pointer">
                  <Plus class="w-3.5 h-3.5" /> Reservar ahora
                </button>
              </div>
              <div v-else v-for="session in upcomingSessions" :key="session.id"
                class="flex items-center justify-between p-4 bg-brand-bg rounded-2xl border border-brand-border hover:border-brand-sage-border transition-all">
                <DashboardUpcomingSession :session="session" />
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <DashboardNotificationsBox />

          <!-- Mood Tracker -->
          <div class="mt-8">
            <MoodTracker />
          </div>

          <!-- Mobile-only quick actions (visible only when sidebar is hidden) -->
          <div class="lg:hidden bg-white rounded-[2rem] border border-brand-border p-6 shadow-xs space-y-3">
            <h3 class="text-base font-bold text-brand-charcoal font-serif mb-4">Acciones Rápidas</h3>
            <button @click="activeTab = 'book'"
              class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-brand-teal/10">
              <CalendarPlus class="w-4 h-4" />
              Reservar Sesión
            </button>
            <button @click="activeTab = 'messages'"
              class="w-full flex items-center justify-center gap-2 px-4 py-3 border border-brand-border text-brand-charcoal rounded-full hover:bg-brand-bg transition-all text-xs font-bold cursor-pointer">
              <MessageCircle class="w-4 h-4" />
              Contactar Terapeuta
            </button>
          </div>

        </div>

        <!-- === SESSIONS TAB (full-width) === -->
        <div v-if="activeTab === 'sessions'" class="px-8 py-8">
          <DashboardSessionsTab :allSessions="sessions" :professionals="therapists" v-model:sessionFilter="sessionFilter"
            @session-created="fetchSessions" />
        </div>

        <!-- === BOOK SESSION TAB (full-width) === -->
        <div v-if="activeTab === 'book'" class="px-8 py-8">
          <DashboardBookSessionTab :professionals="therapists" :patient-id="patient?.id"
            :session-type-id="sessionTypes?.[0]?.id" @session-booked="handleSessionBooked" />
        </div>

        <!-- === SETTINGS TAB (full-width) === -->
        <div v-if="activeTab === 'settings'" class="px-8 py-8">
          <DashboardSettingsTab :currentUser="currentUser" @save="saveSettings" />
        </div>

        <!-- === MESSAGES TAB === -->
        <div v-if="activeTab === 'messages'" class="px-8 py-8 max-w-4xl mx-auto animate-fade-in">
          <h2 class="text-2xl font-serif font-bold text-brand-charcoal mb-6">Mensajes</h2>
          <div v-if="therapists.length > 0">
            <ChatWidget :otherUserId="therapists[0].id" :otherUserName="therapists[0].name" />
          </div>
          <div v-else class="text-center text-gray-500 py-12 bg-white rounded-[2rem] border border-gray-100">
            Aún no tienes un terapeuta asignado.
          </div>
        </div>

      </main>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onBeforeMount } from 'vue'
import SessionsService, { type Session } from '@/services/session/session.service'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import SessionTypeService, { type SessionType } from '@/services/session_type/session_type.service'
import PatientService, { type Patient } from '@/services/patient/patient.service'
import { useAuthStore } from '@/stores/auth.module'
import DashboardNavBar from '@/components/Dashboard/NavBar.vue'
import DashboardSidebarNav from '@/components/Dashboard/SidebarNav.vue'
import ModalForm from '@/components/Onboarding/ModalForm.vue'
import DashboardWelcomeSection from '@/components/Dashboard/WelcomeSection.vue'
import DashboardStatCards from '@/components/Dashboard/StatCards.vue'
import DashboardUpcomingSession from '@/components/Dashboard/UpcomingSession.vue'
import DashboardNotificationsBox from '@/components/Dashboard/NotificationsBox.vue'
import DashboardSessionsTab from '@/components/Dashboard/SessionsTab.vue'
import DashboardBookSessionTab from '@/components/Dashboard/BookSessionTab.vue'
import DashboardSettingsTab from '@/components/Dashboard/SettingsTab.vue'
import MoodTracker from '@/components/patient/MoodTracker.vue'
import ChatWidget from '@/components/shared/ChatWidget.vue'
import UserService, { type User } from '@/services/user/user.service'
import { CalendarPlus, Plus, MessageCircle } from 'lucide-vue-next'

/*
* =========================================
* Variables
* =========================================
*/
const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const sessionFilter = ref('upcoming')
const onboard = ref(false)
const isCheckingOnboarding = ref(true)
const sessions = ref<Session[]>([])
const patient = ref<Patient>()
const professionals = ref<Professional[]>([])
const currentUserData = ref<User | null>(null)
const sessionTypes = ref<SessionType[]>([])
const loading = ref(false)
const error = ref('')
const auth = useAuthStore()

/*
* =========================================
* Data fetching methods
* =========================================
*/
const fetchCurrentUser = async () => {
  try {
    const userMe = await UserService.getMe()
    currentUserData.value = userMe

    // Check real backend status instead of JWT
    if (userMe.needs_onboarding) {
      onboard.value = true
    } else {
      onboard.value = false
    }
  } catch (err: any) {
    console.error('Failed to get current user:', err)
  } finally {
    isCheckingOnboarding.value = false
  }
}

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

    const response = await SessionsService.readPatient({
      patient_id: patientData?.id
    })
    const sessData = response.data || response
    sessions.value = Array.isArray(sessData) ? sessData : []
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
    //TODO: Do a better handling of this
    if (!auth.userId) {
      throw new Error('User not logged in')
    }
    const response = await PatientService.readSingleByUser({ user_id: auth.userId })
    const pData = response.data || response
    patient.value = Array.isArray(pData) ? pData[0] : pData
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
    const stData = response.data || response;
    sessionTypes.value = Array.isArray(stData) ? stData : []
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
    const profData = response.data || response
    professionals.value = Array.isArray(profData) ? profData : []
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
  const completed = sessions.value.filter((s: any) => !!s.completed).length
  const totalHours = sessions.value.length
  return { completed, totalHours }
})

const upcomingSessions = computed(() => {
  const now = new Date()
  try {
    const sortedSessions = sessions.value
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

    return sortedSessions.map((s: any) => {
      const raw = s.session_date ?? s.date ?? s.start_at ?? null
      const d = raw ? new Date(raw) : null

      // Find therapist name
      const therapist = therapists.value.find(t => t.id === s.professional_id || t.user_id === s.professional_id)?.name || 'Unknown Therapist'

      return {
        ...s,
        therapist,
        date: d ? d.toLocaleDateString() : '—',
        time: d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'
      }
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
    return {
      // Use professional id as the id, backend foreign key expects for sessions
      id: p.id,
      user_id: p.user_id,
      name: `Dr/Dra. ${p.user_id?.substring(0, 8) ?? 'Unknown'}`,
      specialty: p.specialty ?? (p.specializations && p.specializations[0]?.name) ?? 'General'
    }
  })
})

const userProfile = computed(() => {
  const name = currentUserData.value?.username || auth.fullUserName || 'Usuario'
  return {
    first_name: name.split(' ')[0],
    profile_picture_url: currentUserData.value?.profile_picture_url || ''
  }
})

const userName = computed(() => {
  return auth.fullUserName?.split(' ')[0]
})

const filteredProfessionals = computed(() =>
  professionals.value.filter((pro: any) =>
    sessions.value.some((session: any) =>
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
    fetchCurrentUser(),
    fetchProfessionals(),
    fetchSessionTypes(),
  ])
})

onMounted(() => {
  fetchSessions()
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }
  // The onboarding check iw handled inside fetchCurrentUser
  // since relying on auth.needsOnboarding causes the modal to reappear on refresh.
  // We still initialize the loading state based on JWT.
  if (!auth.needsOnboarding) {
    isCheckingOnboarding.value = false;
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

const saveSettings = (newSettings: any) => {
  console.log('Settings saved:', newSettings)
  fetchCurrentUser() // Refresh profile picture and info
}

const currentUser = computed(() => {
  return currentUserData.value || {}
})

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}
const handleCloseOnboarding = () => {
  onboard.value = false
  // detailed logic: since JWT is not updated until relogin, 
  // we just hide it for this session.
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