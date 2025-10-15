<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <NuxtLink to="/">
                <img src="/images/logo.svg" alt="MiPsicoRed Logo" class="h-8 w-auto" />
              </NuxtLink>
            </div>
            <div class="ml-3">
              <h1 class="text-xl font-semibold text-gray-900">Panel Profesional</h1>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <button class="text-gray-500 hover:text-gray-700 relative">
              <Bell class="h-5 w-5" />
              <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            <div class="relative">
              <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <div class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <UserCheck class="h-4 w-4 text-teal-600" />
                </div>
                <span class="text-sm font-medium">Dr. {{ therapist.name }}</span>
                <ChevronDown class="h-4 w-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mi Perfil</a>
                  <a href="#" @click="activeTab = 'settings'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Configuración</a>
                  <hr class="my-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cerrar Sesión</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="-mb-px flex space-x-8">
          <button 
            @click="activeTab = 'dashboard'"
            :class="activeTab === 'dashboard' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Panel Principal
          </button>
          <button 
            @click="activeTab = 'calendar'"
            :class="activeTab === 'calendar' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Calendario
          </button>
          <button 
            @click="activeTab = 'sessions'"
            :class="activeTab === 'sessions' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Sesiones
          </button>
          <button 
            @click="activeTab = 'patients'"
            :class="activeTab === 'patients' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Pacientes
          </button>
          <button 
            @click="activeTab = 'blog'"
            :class="activeTab === 'blog' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Blog
          </button>
          <button 
            @click="activeTab = 'settings'"
            :class="activeTab === 'settings' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Configuración
          </button>
        </nav>
      </div>

      <!-- Dashboard Content -->
      <div v-if="activeTab === 'dashboard'">
        <!-- Welcome Section -->
        <DashboardWelcomeSection :therapist="therapist" :numSessions="todaySessions.length" />

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardStatCards :todaySessions="todaySessions.length" />
        </div>

        <!-- Today's Sessions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DashboardTodaySessionList :todaySessions="todaySessions.length" />

          <!-- Recent Patients -->
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Pacientes Recientes</h3>
              <button @click="activeTab = 'patients'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Ver todos
              </button>
            </div>
            
            <div class="space-y-4">
              <div v-for="patient in recentPatients" :key="patient.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User class="h-5 w-5 text-blue-600" />
                  </div>
                  <div class="ml-4">
                    <p class="font-medium text-gray-900">{{ patient.name }}</p>
                    <p class="text-sm text-gray-500">Última sesión: {{ patient.lastSession }}</p>
                  </div>
                </div>
                <button class="text-gray-400 hover:text-gray-600">
                  <MoreVertical class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
            <div class="space-y-3">
              <button @click="activeTab = 'blog'" class="w-full flex items-center justify-center px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <PenTool class="h-4 w-4 mr-2" />
                Escribir Artículo
              </button>
              <button @click="toggleNewPatientForm(true)" class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus class="h-4 w-4 mr-2" />
                Nuevo Paciente
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Próximas Citas</h3>
            <div class="space-y-3">
              <div v-for="appointment in upcomingAppointments.slice(0, 3)" :key="appointment.id" class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ appointment.patientName }}</p>
                  <p class="text-xs text-gray-500">{{ appointment.date }} - {{ appointment.time }}</p>
                </div>
                <div class="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Tasa de asistencia</span>
                <span class="text-sm font-medium text-gray-900">94%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Satisfacción promedio</span>
                <span class="text-sm font-medium text-gray-900">4.8/5</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Artículos publicados</span>
                <span class="text-sm font-medium text-gray-900">{{ blogPosts.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar Tab -->
      <div v-if="activeTab === 'calendar'">
        <div class="bg-white rounded-xl shadow-sm border">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Calendario de Sesiones</h2>
              <div class="flex items-center space-x-4">
                <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft class="h-5 w-5" />
                </button>
                <span class="text-lg font-medium">{{ currentMonthYear }}</span>
                <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 mb-4">
              <div v-for="day in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']" :key="day" class="p-2 text-center text-sm font-medium text-gray-500">
                {{ day }}
              </div>
            </div>
            
            <div class="grid grid-cols-7 gap-1">
              <div 
                v-for="date in calendarDays" 
                :key="date.date" 
                @click="selectDate(date)"
                :class="[
                  'p-2 min-h-[80px] border rounded-lg cursor-pointer transition-colors',
                  date.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400',
                  date.isToday ? 'border-teal-500 bg-teal-50' : 'border-gray-200',
                  selectedDate?.date === date.date ? 'ring-2 ring-teal-500' : ''
                ]"
              >
                <div class="text-sm font-medium mb-1">{{ date.day }}</div>
                <div class="space-y-1">
                  <div 
                    v-for="session in date.sessions.slice(0, 2)" 
                    :key="session.id"
                    class="text-xs bg-teal-100 text-teal-800 px-1 py-0.5 rounded truncate"
                  >
                    {{ session.time }} {{ session.patientName }}
                  </div>
                  <div v-if="date.sessions.length > 2" class="text-xs text-gray-500">
                    +{{ date.sessions.length - 2 }} más
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Selected Date Sessions -->
        <div v-if="selectedDate && selectedDate.sessions.length > 0" class="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Sesiones del {{ selectedDate.day }} de {{ currentMonthName }}
          </h3>
          <div class="space-y-4">
            <div v-for="session in selectedDate.sessions" :key="session.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <User class="h-5 w-5 text-teal-600" />
                </div>
                <div class="ml-4">
                  <p class="font-medium text-gray-900">{{ session.patientName }}</p>
                  <p class="text-sm text-gray-500">{{ session.time }} - {{ session.type }}</p>
                  <p class="text-sm text-gray-500">{{ session.notes }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span :class="getSessionStatusClass(session.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ session.status }}
                </span>
                <button class="text-gray-400 hover:text-gray-600">
                  <MoreVertical class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sessions Tab -->
      <div v-if="activeTab === 'sessions'">
        <div class="bg-white rounded-xl shadow-sm border">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Gestión de Sesiones</h2>
              <div class="flex space-x-2">
                <button 
                  @click="sessionFilter = 'today'"
                  :class="sessionFilter === 'today' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                  class="px-3 py-1 rounded-md text-sm font-medium"
                >
                  Hoy
                </button>
                <button 
                  @click="sessionFilter = 'upcoming'"
                  :class="sessionFilter === 'upcoming' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                  class="px-3 py-1 rounded-md text-sm font-medium"
                >
                  Próximas
                </button>
                <button 
                  @click="sessionFilter = 'completed'"
                  :class="sessionFilter === 'completed' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                  class="px-3 py-1 rounded-md text-sm font-medium"
                >
                  Completadas
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="session in filteredSessions" :key="session.id" class="border rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <User class="h-6 w-6 text-teal-600" />
                    </div>
                    <div class="ml-4">
                      <h3 class="font-medium text-gray-900">{{ session.patientName }}</h3>
                      <p class="text-sm text-gray-500">{{ session.type }}</p>
                      <p class="text-sm text-gray-500">{{ session.date }} - {{ session.time }}</p>
                      <p class="text-sm text-gray-600 mt-1">{{ session.notes }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span :class="getSessionStatusClass(session.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ session.status }}
                    </span>
                    <button v-if="session.status === 'Próxima'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      Iniciar Sesión
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                      <MoreVertical class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patients Tab -->
      <div v-if="activeTab === 'patients'">
        <div class="bg-white rounded-xl shadow-sm border">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Gestión de Pacientes</h2>
              <button @click="showNewPatientForm = true" class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                <Plus class="h-4 w-4 inline mr-2" />
                Nuevo Paciente
              </button>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Search Bar -->
            <div class="mb-6">
              <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  v-model="patientSearch"
                  type="text" 
                  placeholder="Buscar pacientes..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
              </div>
            </div>

            <!-- Patients List -->
            <div class="space-y-4">
              <div v-for="patient in filteredPatients" :key="patient.id" class="border rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User class="h-6 w-6 text-blue-600" />
                    </div>
                    <div class="ml-4">
                      <h3 class="font-medium text-gray-900">{{ patient.name }}</h3>
                      <p class="text-sm text-gray-500">{{ patient.email }}</p>
                      <p class="text-sm text-gray-500">Teléfono: {{ patient.phone }}</p>
                      <div class="flex items-center mt-2 space-x-4">
                        <span class="text-sm text-gray-600">
                          <Calendar class="h-4 w-4 inline mr-1" />
                          Última sesión: {{ patient.lastSession }}
                        </span>
                        <span class="text-sm text-gray-600">
                          <Clock class="h-4 w-4 inline mr-1" />
                          Total sesiones: {{ patient.totalSessions }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span :class="patient.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="px-2 py-1 text-xs font-medium rounded-full">
                      {{ patient.status }}
                    </span>
                    <button @click="viewPatientDetails(patient)" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      Ver Detalles
                    </button>
                    <button class="text-gray-400 hover:text-gray-600">
                      <MoreVertical class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Patient Details Modal -->
        <div v-if="selectedPatient" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900">Detalles del Paciente</h3>
                <button @click="selectedPatient = null" class="text-gray-400 hover:text-gray-600">
                  <X class="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Información Personal</h4>
                  <div class="space-y-2">
                    <p><span class="text-gray-600">Nombre:</span> {{ selectedPatient.name }}</p>
                    <p><span class="text-gray-600">Email:</span> {{ selectedPatient.email }}</p>
                    <p><span class="text-gray-600">Teléfono:</span> {{ selectedPatient.phone }}</p>
                    <p><span class="text-gray-600">Fecha de nacimiento:</span> {{ selectedPatient.birthDate }}</p>
                    <p><span class="text-gray-600">Estado:</span> {{ selectedPatient.status }}</p>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Historial de Sesiones</h4>
                  <div class="space-y-2">
                    <p><span class="text-gray-600">Total sesiones:</span> {{ selectedPatient.totalSessions }}</p>
                    <p><span class="text-gray-600">Última sesión:</span> {{ selectedPatient.lastSession }}</p>
                    <p><span class="text-gray-600">Próxima sesión:</span> {{ selectedPatient.nextSession || 'No programada' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-6">
                <h4 class="font-medium text-gray-900 mb-3">Notas Clínicas</h4>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-700">{{ selectedPatient.clinicalNotes }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Tab -->
      <div v-if="activeTab === 'blog'">
        <DashboardBlogTab />
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <DashboardSettingsTab />
      </div>
    </div>
    <!-- New Patient Modal -->
    <div v-if="showNewPatientForm" class="fixed inset-0 bg-[rgba(0,0,0,0.25)] flex items-center justify-center z-50">
      <DashboardNewPatientModal :showNewPatientForm="showNewPatientForm" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Bell, UserCheck, ChevronDown, Stethoscope, Calendar, Users, CheckCircle, 
  TrendingUp, User, MoreVertical, PenTool, Plus, ChevronLeft, ChevronRight,
  Clock, Search, X, FileText
} from 'lucide-vue-next'
import { usePsychology } from '~/composables/adminDashboardFunctions'
import { configs } from '#build/eslint.config.mjs'
import { createClient } from '@supabase/supabase-js'

const {
  // State
  loading,
  error,
  user,
  
  // Data
  supabase,
  sessions,
  todaySessions,
  patients,
  recentPatients,
  blogPosts,
  dashboardStats,

  // Forms
  sessionForm,
  blogForm,

  // Functions
  initialize,
  createNewSession,
  loadPatients,
  createNewBlogPost,
  searchPatients,
  filteredSessions,
  upcomingAppointments,
  getSessionStatusClass,
  clearError
} = usePsychology()


const config = useRuntimeConfig()

// Reactive data
const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const sessionFilter = ref('today')
const patientSearch = ref('')
const selectedDate = ref(null)
const selectedPatient = ref(null)
const showNewPatientForm = ref(false)

const therapist = ref({
  name: 'Pol',
  specialty: 'Psicología Clínica',
  email: 'pol@mipsicored.com'
})

const currentDate = ref(new Date())

// const todaySessions = ref([
//   {
//     id: 1,
//     patientName: 'María González',
//     time: '10:00',
//     type: 'Terapia Individual',
//     status: 'Próxima',
//     notes: 'Seguimiento de ansiedad'
//   },
//   {
//     id: 2,
//     patientName: 'Juan Pérez',
//     time: '11:30',
//     type: 'Terapia Cognitiva',
//     status: 'Próxima',
//     notes: 'Primera sesión'
//   },
//   {
//     id: 3,
//     patientName: 'Ana López',
//     time: '15:00',
//     type: 'Terapia Familiar',
//     status: 'Completada',
//     notes: 'Sesión de pareja'
//   }
// ])

const toggleNewPatientForm = (value) => {
  showNewPatientForm.value = value
  console.log('Toggling new patient form:', value)
}

const allSessions = ref([
  ...todaySessions.value,
  {
    id: 4,
    patientName: 'Pedro Martín',
    date: '16 Enero 2024',
    time: '09:00',
    type: 'Terapia Individual',
    status: 'Próxima',
    notes: 'Control mensual'
  },
  {
    id: 5,
    patientName: 'Laura Sánchez',
    date: '17 Enero 2024',
    time: '14:00',
    type: 'Terapia Cognitiva',
    status: 'Próxima',
    notes: 'Técnicas de relajación'
  }
])

// const patients = ref([
//   {
//     id: 1,
//     name: 'María González',
//     email: 'maria@example.com',
//     phone: '+34 600 123 456',
//     birthDate: '15/03/1985',
//     status: 'Activo',
//     lastSession: '10 Enero 2024',
//     nextSession: '15 Enero 2024',
//     totalSessions: 12,
//     clinicalNotes: 'Paciente con trastorno de ansiedad generalizada. Ha mostrado mejoras significativas en las últimas sesiones. Continuar con técnicas de relajación y reestructuración cognitiva.'
//   },
//   {
//     id: 2,
//     name: 'Juan Pérez',
//     email: 'juan@example.com',
//     phone: '+34 600 789 012',
//     birthDate: '22/07/1990',
//     status: 'Activo',
//     lastSession: '8 Enero 2024',
//     nextSession: '15 Enero 2024',
//     totalSessions: 5,
//     clinicalNotes: 'Paciente nuevo con episodio depresivo. Responde bien a la terapia cognitivo-conductual. Establecer rutinas y objetivos a corto plazo.'
//   },
//   {
//     id: 3,
//     name: 'Ana López',
//     email: 'ana@example.com',
//     phone: '+34 600 345 678',
//     birthDate: '10/11/1978',
//     status: 'Inactivo',
//     lastSession: '20 Diciembre 2023',
//     nextSession: null,
//     totalSessions: 8,
//     clinicalNotes: 'Terapia de pareja completada satisfactoriamente. Los objetivos terapéuticos se han cumplido. Alta terapéutica.'
//   }
// ])

// const recentPatients = ref(patients.value.slice(0, 3))

// const upcomingAppointments = ref([
//   { id: 1, patientName: 'María González', date: '15 Ene', time: '10:00' },
//   { id: 2, patientName: 'Juan Pérez', date: '15 Ene', time: '11:30' },
//   { id: 3, patientName: 'Pedro Martín', date: '16 Ene', time: '09:00' }
// ])

// const blogPosts = ref([
//   {
//     id: 1,
//     title: 'Técnicas de Relajación para la Ansiedad',
//     excerpt: 'Descubre métodos efectivos para manejar la ansiedad en tu día a día.',
//     content: 'Contenido completo del artículo...',
//     category: 'Ansiedad',
//     status: 'published',
//     publishDate: '10 Enero 2024',
//     views: 245
//   },
//   {
//     id: 2,
//     title: 'Cómo Mejorar la Comunicación en Pareja',
//     excerpt: 'Estrategias para fortalecer la comunicación en las relaciones.',
//     content: 'Contenido completo del artículo...',
//     category: 'Relaciones',
//     status: 'draft',
//     publishDate: '8 Enero 2024',
//     views: 0
//   }
// ])





const weekDays = ref([
  { name: 'Lunes', enabled: true, startTime: '09:00', endTime: '17:00' },
  { name: 'Martes', enabled: true, startTime: '09:00', endTime: '17:00' },
  { name: 'Miércoles', enabled: true, startTime: '09:00', endTime: '17:00' },
  { name: 'Jueves', enabled: true, startTime: '09:00', endTime: '17:00' },
  { name: 'Viernes', enabled: true, startTime: '09:00', endTime: '15:00' },
  { name: 'Sábado', enabled: false, startTime: '10:00', endTime: '14:00' },
  { name: 'Domingo', enabled: false, startTime: '10:00', endTime: '14:00' }
])

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
})

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('es-ES', { month: 'long' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay() + 1)
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dayData = {
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      sessions: getSessionsForDate(date)
    }
    
    days.push(dayData)
  }
  
  return days
})

// const filteredSessions = computed(() => {
//   switch (sessionFilter.value) {
//     case 'today':
//       return todaySessions.value
//     case 'upcoming':
//       return allSessions.value.filter(session => session.status === 'Próxima')
//     case 'completed':
//       return allSessions.value.filter(session => session.status === 'Completada')
//     default:
//       return allSessions.value
//   }
// })

const filteredPatients = computed(() => {
  if (!patientSearch.value) return patients.value
  return patients.value.filter(patient => 
    patient.name.toLowerCase().includes(patientSearch.value.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearch.value.toLowerCase())
  )
})

// Methods
const getSessionsForDate = (date) => {
  // Mock data for calendar sessions
  const dateStr = date.toISOString().split('T')[0]
  const mockSessions = {
    [new Date().toISOString().split('T')[0]]: todaySessions.value,
    '2024-01-16': [
      { id: 4, patientName: 'Pedro Martín', time: '09:00', type: 'Individual', status: 'Próxima', notes: 'Control mensual' }
    ],
    '2024-01-17': [
      { id: 5, patientName: 'Laura Sánchez', time: '14:00', type: 'Cognitiva', status: 'Próxima', notes: 'Técnicas de relajación' }
    ]
  }
  return mockSessions[dateStr] || []
}

// const getSessionStatusClass = (status) => {
//   switch (status) {
//     case 'Próxima':
//       return 'bg-blue-100 text-blue-800'
//     case 'Completada':
//       return 'bg-green-100 text-green-800'
//     case 'Cancelada':
//       return 'bg-red-100 text-red-800'
//     default:
//       return 'bg-gray-100 text-gray-800'
//   }
// }

const selectDate = (date) => {
  selectedDate.value = date
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const viewPatientDetails = (patient) => {
  selectedPatient.value = patient
}

const createBlogPost = () => {
  const post = {
    id: blogPosts.value.length + 1,
    ...newPost.value,
    publishDate: new Date().toLocaleDateString('es-ES'),
    views: 0
  }
  
  blogPosts.value.unshift(post)
  newPost.value = { title: '', excerpt: '', content: '', category: '', status: 'draft' }
  showNewPostForm.value = false
  alert('¡Artículo creado exitosamente!')
}

const saveSettings = () => {
  console.log('Saving settings:', settings.value)
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

.ring-teal-500 {
  --tw-ring-color: #14b8a6;
}
</style>