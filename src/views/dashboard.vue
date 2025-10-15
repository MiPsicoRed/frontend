<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <DashboardNavBar v-model:showUserMenu="showUserMenu" v-model:activeTab="activeTab" :profile="profile"
        @logout="handleLogout" />
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
          <DashboardWelcomeSection :profile="profile" />
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
        <DashboardSettingsTab :currentUser="currentUser" @save="saveSettings" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { supabase, user, profile } = useAuth()

// Reactive data
const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const sessionFilter = ref('upcoming')
const onboard = ref(true);

const currentUser = await supabase.auth.getUser()

// Renamed to avoid conflict with useAuth's user
const handleLogout = async () => {
  const { logout } = useAuth()
  await logout()
  navigateTo('/login')
}

const nextSession = ref({
  date: '15 Ene',
  time: '10:00 AM'
})

const stats = ref({
  completed: 8,
  totalHours: 12
})

const upcomingSessions = ref([
  {
    id: 1,
    therapist: 'Dr. Carlos Ruiz',
    specialty: 'Psicología Clínica',
    date: '15 Enero 2024',
    time: '10:00 AM',
    status: 'Próxima'
  },
  {
    id: 2,
    therapist: 'Dra. Ana López',
    specialty: 'Terapia Familiar',
    date: '18 Enero 2024',
    time: '3:00 PM',
    status: 'Próxima'
  }
])

const allSessions = ref([
  ...upcomingSessions.value,
  {
    id: 3,
    therapist: 'Dr. Carlos Ruiz',
    specialty: 'Psicología Clínica',
    date: '10 Enero 2024',
    time: '10:00 AM',
    status: 'Completada'
  },
  {
    id: 4,
    therapist: 'Dra. Ana López',
    specialty: 'Terapia Familiar',
    date: '8 Enero 2024',
    time: '2:00 PM',
    status: 'Completada'
  }
])

const therapists = ref([
  { id: 1, name: 'Dr. Carlos Ruiz', specialty: 'Psicología Clínica' },
  { id: 2, name: 'Dra. Ana López', specialty: 'Terapia Familiar' },
  { id: 3, name: 'Dr. Miguel Torres', specialty: 'Psicología Cognitiva' }
])

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

const saveSettings = (settings) => {
  // Handle settings save
  console.log('Saving settings:', settings)
  alert('¡Configuración guardada exitosamente!')
}

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

// Add event listener for clicking outside
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
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