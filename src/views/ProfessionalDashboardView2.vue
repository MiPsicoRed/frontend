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
                <span class="text-sm font-medium">
                  {{ user?.raw_user_meta_data?.full_name || user?.email?.split('@')[0] || 'Usuario' }}
                </span>
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

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
        <span class="text-gray-700">Cargando...</span>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative">
        <div class="flex items-center justify-between">
          <span>{{ error }}</span>
          <button @click="clearError" class="text-red-500 hover:text-red-700">
            <X class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

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
        <div class="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 mb-8 shadow-sm border">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">
                ¡Buenos días, {{ user?.raw_user_meta_data?.full_name || 'Doctor' }}!
              </h2>
              <p class="text-gray-600">Tienes {{ todaySessions.length }} sesiones programadas para hoy</p>
            </div>
            <div class="hidden md:block">
              <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <Stethoscope class="h-8 w-8 text-teal-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar class="h-6 w-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Hoy</p>
                <p class="text-2xl font-bold text-gray-900">{{ todaySessions.length }}</p>
                <p class="text-sm text-gray-500">Sesiones</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users class="h-6 w-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pacientes Activos</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.activePatients }}</p>
                <p class="text-sm text-gray-500">Este mes</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle class="h-6 w-6 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Completadas</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardStats.completedSessions }}</p>
                <p class="text-sm text-gray-500">Esta semana</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp class="h-6 w-6 text-yellow-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Ingresos</p>
                <p class="text-2xl font-bold text-gray-900">€{{ dashboardStats.monthlyRevenue }}</p>
                <p class="text-sm text-gray-500">Este mes</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Sessions -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Sesiones de Hoy</h3>
              <button @click="activeTab = 'sessions'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Ver todas
              </button>
            </div>
            
            <div v-if="todaySessions.length === 0" class="text-center py-8 text-gray-500">
              No tienes sesiones programadas para hoy
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="session in todaySessions" :key="session.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <User class="h-5 w-5 text-teal-600" />
                  </div>
                  <div class="ml-4">
                    <p class="font-medium text-gray-900">{{ session.patientName }}</p>
                    <p class="text-sm text-gray-500">{{ session.time }} - {{ session.type }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="getSessionStatusClass(session.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                    {{ session.status }}
                  </span>
                  <button 
                    v-if="session.status === 'Programada'" 
                    @click="startSession(session.id)"
                    class="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    Iniciar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Patients -->
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Pacientes Recientes</h3>
              <button @click="activeTab = 'patients'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Ver todos
              </button>
            </div>
            
            <div v-if="recentPatients.length === 0" class="text-center py-8 text-gray-500">
              No hay pacientes recientes
            </div>
            
            <div v-else class="space-y-4">
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
              <button @click="showNewSessionForm = true" class="w-full flex items-center justify-center px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <Plus class="h-4 w-4 mr-2" />
                Nueva Sesión
              </button>
              <button @click="activeTab = 'blog'" class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <PenTool class="h-4 w-4 mr-2" />
                Escribir Artículo
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Próximas Citas</h3>
            <div v-if="upcomingAppointments.length === 0" class="text-center py-4 text-gray-500">
              No hay citas próximas
            </div>
            <div v-else class="space-y-3">
              <div v-for="appointment in upcomingAppointments" :key="appointment.id" class="flex items-center justify-between">
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
                <span class="text-sm text-gray-600">Artículos publicados</span>
                <span class="text-sm font-medium text-gray-900">{{ blogPosts.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Pacientes totales</span>
                <span class="text-sm font-medium text-gray-900">{{ patients.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Sesiones completadas</span>
                <span class="text-sm font-medium text-gray-900">{{ dashboardStats.completedSessions }}</span>
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
                <button @click="showNewSessionForm = true" class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  <Plus class="h-4 w-4 inline mr-2" />
                  Nueva Sesión
                </button>
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
          </div>
          
          <div class="p-6">
            <div v-if="filteredSessions(sessionFilter).length === 0" class="text-center py-12 text-gray-500">
              No hay sesiones {{ sessionFilter === 'today' ? 'para hoy' : sessionFilter === 'upcoming' ? 'próximas' : 'completadas' }}
            </div>
            <div v-else class="space-y-4">
              <div v-for="session in filteredSessions(sessionFilter)" :key="session.id" class="border rounded-lg p-4">
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
                    <button 
                      v-if="session.status === 'Programada'" 
                      @click="startSession(session.id)"
                      class="text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
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
            <div v-if="searchPatients(patientSearch).length === 0" class="text-center py-12 text-gray-500">
              {{ patientSearch ? 'No se encontraron pacientes' : 'No hay pacientes registrados' }}
            </div>
            <div v-else class="space-y-4">
              <div v-for="patient in searchPatients(patientSearch)" :key="patient.id" class="border rounded-lg p-4">
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
        <div class="space-y-6">
          <!-- Blog Header -->
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">Gestión de Blog</h2>
            <button @click="showNewPostForm = true" class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              <PenTool class="h-4 w-4 inline mr-2" />
              Nuevo Artículo
            </button>
          </div>

          <!-- New Post Form -->
          <div v-if="showNewPostForm" class="bg-white rounded-xl shadow-sm border p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Crear Nuevo Artículo</h3>
              <button @click="showNewPostForm = false" class="text-gray-400 hover:text-gray-600">
                <X class="h-5 w-5" />
              </button>
            </div>
            
            <form @submit.prevent="handleCreateBlogPost" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Título</label>
                <input 
                  v-model="blogForm.title" 
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Título del artículo"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Resumen</label>
                <textarea 
                  v-model="blogForm.excerpt" 
                  rows="2" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Breve descripción del artículo"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
                <textarea 
                  v-model="blogForm.content" 
                  rows="8" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Contenido completo del artículo"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select v-model="blogForm.category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">Selecciona una categoría</option>
                    <option value="Ansiedad">Ansiedad</option>
                    <option value="Depresión">Depresión</option>
                    <option value="Relaciones">Relaciones</option>
                    <option value="Autoestima">Autoestima</option>
                    <option value="Estrés">Estrés</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                  <select v-model="blogForm.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end space-x-3">
                <button 
                  type="button" 
                  @click="showNewPostForm = false"
                  class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  :disabled="loading"
                  class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                  {{ loading ? 'Creando...' : 'Crear Artículo' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Blog Posts List -->
          <div class="bg-white rounded-xl shadow-sm border">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Mis Artículos</h3>
            </div>
            
            <div class="p-6">
              <div v-if="blogPosts.length === 0" class="text-center py-12 text-gray-500">
                No hay artículos publicados
              </div>
              <div v-else class="space-y-4">
                <div v-for="post in blogPosts" :key="post.id" class="border rounded-lg p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-medium text-gray-900 mb-2">{{ post.title }}</h4>
                      <p class="text-sm text-gray-600 mb-3">{{ post.excerpt }}</p>
                      <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{{ post.category }}</span>
                        <span>{{ post.publishDate }}</span>
                        <span>{{ post.views }} visualizaciones</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3 ml-4">
                      <span :class="post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="px-2 py-1 text-xs font-medium rounded-full">
                        {{ post.status === 'published' ? 'Publicado' : 'Borrador' }}
                      </span>
                      <button class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                        Editar
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
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- Profile Settings -->
          <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Profesional</h3>
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    v-model="settings.name" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                  <input 
                    v-model="settings.specialty" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    v-model="settings.email" 
                    type="email" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    v-model="settings.phone" 
                    type="tel" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
                <textarea 
                  v-model="settings.bio" 
                  rows="4" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                ></textarea>
              </div>
            </form>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end">
            <button 
              @click="saveSettings"
              :disabled="loading"
              class="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50"
            >
              {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- New Session Modal -->
    <div v-if="showNewSessionForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900">Nueva Sesión</h3>
            <button @click="showNewSessionForm = false" class="text-gray-400 hover:text-gray-600">
              <X class="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="handleCreateSession" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
              <select v-model="sessionForm.patientId" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option value="">Selecciona un paciente</option>
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                  {{ patient.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha y Hora</label>
              <input 
                v-model="sessionForm.sessionDate" 
                type="datetime-local" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Sesión</label>
              <select v-model="sessionForm.type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option value="individual">Terapia Individual</option>
                <option value="group">Terapia Grupal</option>
                <option value="family">Terapia Familiar</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Duración (minutos)</label>
              <input 
                v-model.number="sessionForm.duration" 
                type="number" 
                min="15" 
                max="180"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Notas</label>
              <textarea 
                v-model="sessionForm.notes" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Notas adicionales sobre la sesión"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                @click="showNewSessionForm = false"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                :disabled="loading"
                class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {{ loading ? 'Creando...' : 'Crear Sesión' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- New Patient Modal -->
    <div v-if="showNewPatientForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-gray-900">Nuevo Paciente No Registrado</h3>
            <button @click="showNewPatientForm = false" class="text-gray-400 hover:text-gray-600">
              <X class="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="handleCreatePatient" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input 
                  v-model="patientForm.firstName" 
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                <input 
                  v-model="patientForm.surname" 
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="patientForm.email" 
                type="email" 
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input 
                v-model="patientForm.phone" 
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
              <input 
                v-model="patientForm.dateOfBirth" 
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contacto de Emergencia</label>
              <input 
                v-model="patientForm.emergencyContactName" 
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Nombre del contacto"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono de Emergencia</label>
              <input 
                v-model="patientForm.emergencyContactPhone" 
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Notas</label>
              <textarea 
                v-model="patientForm.notes" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Notas adicionales sobre el paciente"
              ></textarea>
            </div>

            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                @click="showNewPatientForm = false"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                :disabled="loading"
                class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {{ loading ? 'Creando...' : 'Crear Paciente' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { 
  Bell, UserCheck, ChevronDown, Stethoscope, Calendar, Users, CheckCircle, 
  TrendingUp, User, MoreVertical, PenTool, Plus, ChevronLeft, ChevronRight,
  Clock, Search, X
} from 'lucide-vue-next'
import { usePsychology } from '~/composables/adminDashboardFunctions'

// Use the composable
const {
  // State
  loading,
  error,
  user,
  
  // Data
  sessions,
  todaySessions,
  patients,
  recentPatients,
  blogPosts,
  dashboardStats,

  // Forms
  sessionForm,
  patientForm,
  blogForm,

  // Functions
  initialize,
  createNewSession,
  loadPatients,
  createNewNonRegisteredPatient,
  createNewBlogPost,
  searchPatients,
  filteredSessions,
  upcomingAppointments,
  getSessionStatusClass,
  clearError
} = usePsychology()

// Component reactive data
const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const sessionFilter = ref('today')
const patientSearch = ref('')
const selectedPatient = ref(null)
const showNewSessionForm = ref(false)
const showNewPatientForm = ref(false)
const showNewPostForm = ref(false)

// Settings (local to component)
const settings = ref({
  name: '',
  specialty: 'Psicología Clínica',
  email: '',
  phone: '',
  bio: ''
})

// Initialize on mount
onMounted(async () => {
  await initialize()
  
  // Set settings from user data
  if (user.value) {
    settings.value.name = user.value.raw_user_meta_data?.full_name || ''
    settings.value.email = user.value.email || ''
  }
})

// Watch for tab changes to load data
watch(activeTab, async (newTab) => {
  if (newTab === 'patients' && patients.value.length === 0) {
    await loadPatients()
  }
})

// Handlers
const handleCreateSession = async () => {
  const result = await createNewSession()
  if (result.success) {
    showNewSessionForm.value = false
    // Show success message or handle as needed
  }
}

const handleCreatePatient = async () => {
  const result = await createNewNonRegisteredPatient()
  if (result.success) {
    showNewPatientForm.value = false
    // Show success message or handle as needed
  }
}

const handleCreateBlogPost = async () => {
  const result = await createNewBlogPost()
  if (result.success) {
    showNewPostForm.value = false
    // Show success message or handle as needed
  }
}

const startSession = async (sessionId) => {
  // Update session status to 'in_progress'
  // This would need to be implemented in the composable
  console.log('Starting session:', sessionId)
}

const viewPatientDetails = (patient) => {
  selectedPatient.value = patient
}

const saveSettings = () => {
  console.log('Saving settings:', settings.value)
  // This would call a settings update function
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