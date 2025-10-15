<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <img src="/public/images/logo.svg" alt="Logo" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Mi Panel de Terapia</h1>
            <p class="text-sm text-gray-600">Bienvenido de vuelta, María González</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-500 hover:text-gray-700">
            <BellIcon class="w-5 h-5" />
          </button>
          <button class="p-2 text-gray-500 hover:text-gray-700">
            <UserIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Próximas Sesiones -->
        <div class="bg-white rounded-2xl border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">Próximas Sesiones</h2>
              <p class="text-sm text-gray-600">{{ proximasSesiones.length }} sesiones programadas</p>
            </div>
            <button @click="nuevaSesion"
              class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2">
              <PlusIcon class="w-4 h-4" />
              <span>Nueva Sesión</span>
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="sesion in proximasSesiones" :key="sesion.id" class="border border-gray-200 rounded-xl p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">{{ sesion.terapeuta }}</h3>
                  <div class="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                    <CalendarIcon class="w-4 h-4 text-teal-500" />
                    <span>{{ sesion.fecha }} - {{ sesion.hora }}</span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">{{ sesion.tipo }}</p>
                  <span class="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                    {{ sesion.estado }}
                  </span>
                </div>
                <div class="flex items-center space-x-2 ml-4">
                  <button @click="abrirChat(sesion.id)"
                    class="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                    <MessageCircleIcon class="w-4 h-4" />
                  </button>
                  <button @click="iniciarVideo(sesion.id)"
                    class="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                    <VideoIcon class="w-4 h-4" />
                  </button>
                  <button @click="verMas(sesion.id)"
                    class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreHorizontalIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-8">
          <!-- Mi Terapeuta Principal -->
          <div class="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Mi Terapeuta Principal</h2>

            <div class="text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon class="w-8 h-8 text-gray-500" />
              </div>

              <h3 class="font-semibold text-gray-900 mb-1">{{ terapeutaPrincipal.nombre }}</h3>
              <p class="text-gray-600 text-sm mb-1">{{ terapeutaPrincipal.especialidad }}</p>
              <p class="text-gray-500 text-sm mb-4">{{ terapeutaPrincipal.experiencia }}</p>

              <div class="flex items-center justify-center space-x-1 mb-6">
                <div class="flex space-x-1">
                  <StarIcon v-for="n in 5" :key="n" class="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <span class="text-sm text-gray-600 ml-2">({{ terapeutaPrincipal.valoracion }})</span>
              </div>

              <div class="flex items-center space-x-3">
                <button @click="agendarCita"
                  class="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-xl font-medium transition-colors">
                  Agendar Cita
                </button>
                <button @click="enviarMensaje"
                  class="p-2 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors">
                  <MessageCircleIcon class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <!-- Progreso del Tratamiento -->
          <div class="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900">Calendario de Disponibilidad</h2>
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-teal-500 rounded-full"></div>
                  <span class="text-gray-600">Disponible</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-gray-600">Ocupado</span>
                </div>
              </div>
            </div>

            <!-- Calendar Navigation -->
            <div class="flex items-center justify-between mb-6">
              <button @click="mesAnterior"
                class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <ChevronLeftIcon class="w-4 h-4" />
                <span>Anterior</span>
              </button>
              <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-900">{{ mesActual }}</h3>
                <p class="text-sm text-gray-500">{{ añoActual }}</p>
              </div>
              <button @click="mesSiguiente"
                class="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <span>Siguiente</span>
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-2 mb-4">
              <div v-for="dia in diasSemana" :key="dia" class="text-center text-sm font-medium text-gray-600 py-2">
                {{ dia }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <button v-for="(dia, index) in diasCalendario" :key="`dia-${index}`" @click="seleccionarDia(dia)"
                :disabled="!dia.disponible || dia.pasado" :class="[
                  'h-10 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  dia.vacio ? 'invisible' : '',
                  dia.pasado ? 'text-gray-300 cursor-not-allowed' : '',
                  dia.hoy ? 'bg-teal-500 text-white font-bold' : '',
                  dia.seleccionado ? 'bg-teal-600 text-white shadow-lg' : '',
                  dia.tieneSesion ? 'bg-blue-100 text-blue-800 border border-blue-300' : '',
                  dia.disponible && !dia.pasado && !dia.hoy && !dia.seleccionado && !dia.tieneSesion ? 'text-gray-700 hover:bg-teal-50 hover:text-teal-700 border border-gray-200 hover:border-teal-300' : '',
                  !dia.disponible && !dia.pasado && !dia.tieneSesion ? 'text-gray-400 cursor-not-allowed bg-gray-50' : ''
                ]">
                {{ dia.numero }}
                <span v-if="dia.tieneSesion" class="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar Section (Full Width) -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6 mt-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Progreso del Tratamiento</h2>

        <div class="space-y-6">
          <!-- Sesiones Completadas -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Sesiones Completadas</span>
              <span class="text-sm font-semibold text-gray-900">{{ progreso.sesionesCompletadas }}/{{
                progreso.sesionesTotales }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-teal-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: porcentajeSesiones + '%' }"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ Math.round(porcentajeSesiones) }}% completado</p>
          </div>

          <!-- Bienestar General -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Bienestar General</span>
              <span class="text-sm font-semibold text-gray-900">{{ progreso.bienestar }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: progreso.bienestar + '%' }"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Mejora del {{ progreso.mejora }}% este mes</p>
          </div>

          <!-- Adherencia al Tratamiento -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Adherencia al Tratamiento</span>
              <span class="text-sm font-semibold text-gray-900">{{ progreso.adherencia }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: progreso.adherencia + '%' }"></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Muy buena adherencia</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  BellIcon, UserIcon, PlusIcon, CalendarIcon, MessageCircleIcon,
  VideoIcon, MoreHorizontalIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon
} from 'lucide-vue-next'

// Datos reactivos
const proximasSesiones = ref([
  {
    id: 1,
    terapeuta: 'Dr. Carlos Mendoza',
    fecha: 'Hoy',
    hora: '15:00',
    tipo: 'Terapia Individual',
    estado: 'Confirmada'
  },
  {
    id: 2,
    terapeuta: 'Dra. Ana Ruiz',
    fecha: 'Mañana',
    hora: '10:30',
    tipo: 'Terapia Cognitivo-Conductual',
    estado: 'Confirmada'
  },
  {
    id: 3,
    terapeuta: 'Dr. Carlos Mendoza',
    fecha: '15 Mar',
    hora: '16:00',
    tipo: 'Seguimiento',
    estado: 'Confirmada'
  },
  {
    id: 4,
    terapeuta: 'Dra. Ana Ruiz',
    fecha: 'Mañana',
    hora: '10:30',
    tipo: 'Terapia Cognitivo-Conductual',
    estado: 'Confirmada'
  },
  {
    id: 5,
    terapeuta: 'Dra. Ana Ruiz',
    fecha: 'Mañana',
    hora: '10:30',
    tipo: 'Terapia Cognitivo-Conductual',
    estado: 'Confirmada'
  },
])

const terapeutaPrincipal = ref({
  nombre: 'Dr. Carlos Mendoza',
  especialidad: 'Psicología Clínica',
  experiencia: '8 años de experiencia',
  valoracion: 4.9
})

const progreso = ref({
  sesionesCompletadas: 12,
  sesionesTotales: 20,
  bienestar: 78,
  adherencia: 92,
  mejora: 15
})

// Calendario
const fechaActual = ref(new Date())
const diaSeleccionado = ref(null)

const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

// Computed properties
const mesActual = computed(() => meses[fechaActual.value.getMonth()])
const añoActual = computed(() => fechaActual.value.getFullYear())

const porcentajeSesiones = computed(() => {
  return Math.round((progreso.value.sesionesCompletadas / progreso.value.sesionesTotales) * 100)
})

const diasCalendario = computed(() => {
  const año = fechaActual.value.getFullYear()
  const mes = fechaActual.value.getMonth()
  const primerDia = new Date(año, mes, 1)
  const ultimoDia = new Date(año, mes + 1, 0)
  const diasEnMes = ultimoDia.getDate()
  const diaSemanaInicio = primerDia.getDay()

  const dias = []
  const hoy = new Date()

  // Días vacíos al inicio
  for (let i = 0; i < diaSemanaInicio; i++) {
    dias.push({ numero: '', disponible: false, vacio: true })
  }

  // Días del mes
  for (let dia = 1; dia <= diasEnMes; dia++) {
    const fechaDia = new Date(año, mes, dia)
    const esPasado = fechaDia < hoy
    const esHoy = fechaDia.toDateString() === hoy.toDateString()

    dias.push({
      numero: dia,
      disponible: !esPasado && Math.random() > 0.3,
      tieneSesion: [8, 15, 22, 29].includes(dia),
      pasado: esPasado,
      hoy: esHoy,
      seleccionado: false,
      vacio: false
    })
  }

  return dias
})

// Métodos
const nuevaSesion = () => {
  console.log('Nueva sesión')
}

const abrirChat = (id) => {
  console.log('Abrir chat:', id)
}

const iniciarVideo = (id) => {
  console.log('Iniciar video:', id)
}

const verMas = (id) => {
  console.log('Ver más:', id)
}

const agendarCita = () => {
  console.log('Agendar cita')
}

const enviarMensaje = () => {
  console.log('Enviar mensaje')
}

const mesAnterior = () => {
  const nuevaFecha = new Date(fechaActual.value)
  nuevaFecha.setMonth(nuevaFecha.getMonth() - 1)
  fechaActual.value = nuevaFecha
}

const mesSiguiente = () => {
  const nuevaFecha = new Date(fechaActual.value)
  nuevaFecha.setMonth(nuevaFecha.getMonth() + 1)
  fechaActual.value = nuevaFecha
}

const seleccionarDia = (dia) => {
  if (dia.disponible && !dia.pasado && !dia.vacio) {
    diasCalendario.value.forEach(d => d.seleccionado = false)
    dia.seleccionado = true
    diaSeleccionado.value = dia
  }
}
</script>