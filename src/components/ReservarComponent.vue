<template>
    <div class="font-sans bg-[#fcfaf7] min-h-screen">
      <!-- Header -->
      <header class="bg-[#fcfaf7]/90 backdrop-blur-sm shadow-sm sticky top-0 z-99 border-b border-[#e8d5c4]/30">
        <NavBar />
      </header>
  
      <!-- Booking Section -->
      <section class="py-16 bg-gradient-to-b from-[#fcfaf7] to-[#f8f3eb] relative overflow-hidden">
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-[#b8d8d8] rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-[#e8d5c4] rounded-full opacity-20 blur-3xl"></div>
        <div class="container mx-auto px-4 max-w-5xl relative z-10">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Reserva Tu Sesión</h2>
            <p class="text-gray-600">Selecciona un terapeuta, fecha y hora que mejor se adapte a tu horario.</p>
          </div>
          
          <div class="bg-white p-8 rounded-[2rem] shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Step 1: Select Therapist -->
              <div class="md:col-span-1">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">1. Selecciona un Terapeuta</h3>
                <div class="space-y-4">
                  <div v-for="(therapist, index) in therapists" :key="index" 
                       class="border border-gray-200 rounded-xl p-4 cursor-pointer transition hover:border-[#7a9e9f] hover:shadow-md"
                       :class="{'border-[#7a9e9f] bg-[#f8f3eb]': selectedTherapist === index}"
                       @click="selectTherapist(index)">
                    <div class="flex items-center">
                      <img :src="therapist.image" :alt="therapist.name" class="w-16 h-16 rounded-full object-cover mr-4" />
                      <div>
                        <h4 class="font-medium text-gray-800">{{ therapist.name }}</h4>
                        <p class="text-sm text-[#5a7d7c]">{{ therapist.specialty }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Step 2: Select Date -->
              <div class="md:col-span-2">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">2. Selecciona Fecha y Hora</h3>
                
                <!-- Calendar -->
                <div class="mb-6">
                  <div class="flex justify-between items-center mb-4">
                    <button @click="prevMonth" class="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <h4 class="text-lg font-medium text-gray-800">{{ currentMonthName }} {{ currentYear }}</h4>
                    <button @click="nextMonth" class="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-7 gap-1 mb-2">
                    <div v-for="day in weekDays" :key="day" class="text-center text-sm font-medium text-gray-600 py-2">
                      {{ day }}
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-7 gap-1">
                    <div v-for="(day, index) in calendarDays" :key="index" 
                         class="aspect-square flex items-center justify-center rounded-lg text-sm"
                         :class="getDayClasses(day)">
                      <button v-if="day.date" 
                              @click="selectDate(day.date)"
                              class="w-full h-full flex items-center justify-center rounded-lg"
                              :disabled="!day.available"
                              :class="{'cursor-pointer hover:bg-[#b8d8d8]/20': day.available && !isDateSelected(day.date), 'cursor-not-allowed': !day.available}">
                        {{ day.date.getDate() }}
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Time Slots -->
                <div v-if="selectedDate">
                  <h4 class="font-medium text-gray-800 mb-3">Horarios disponibles para {{ formatDate(selectedDate) }}</h4>
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <button v-for="(slot, index) in availableTimeSlots" :key="index"
                            @click="selectTimeSlot(slot)"
                            class="py-2 px-3 border rounded-lg text-center text-sm transition"
                            :class="selectedTimeSlot === slot ? 'bg-[#7a9e9f] text-white border-[#7a9e9f]' : 'border-gray-200 hover:border-[#7a9e9f] text-gray-700'">
                      {{ slot }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Booking Summary -->
            <div v-if="selectedTherapist !== null && selectedDate && selectedTimeSlot" class="mt-8 pt-6 border-t border-gray-200">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">Resumen de tu Reserva</h3>
              <div class="bg-[#f8f3eb] p-4 rounded-xl">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Terapeuta</p>
                    <p class="font-medium">{{ therapists[selectedTherapist].name }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Fecha</p>
                    <p class="font-medium">{{ formatDate(selectedDate) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Hora</p>
                    <p class="font-medium">{{ selectedTimeSlot }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-6">
                <button @click="showConfirmationModal = true" class="w-full md:w-auto bg-gradient-to-r from-[#7a9e9f] to-[#b8d8d8] text-white px-6 py-3 rounded-full hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Confirmation Modal -->
      <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-[2rem] p-8 max-w-md w-full relative">
          <button @click="showConfirmationModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-[#b8d8d8]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#5a7d7c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">¡Reserva Confirmada!</h3>
            <p class="text-gray-600">Tu sesión ha sido programada exitosamente.</p>
          </div>
          
          <div class="bg-[#f8f3eb] p-4 rounded-xl mb-6">
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Terapeuta:</span>
                <span class="font-medium">{{ selectedTherapist !== null ? therapists[selectedTherapist].name : '' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Fecha:</span>
                <span class="font-medium">{{ selectedDate ? formatDate(selectedDate) : '' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Hora:</span>
                <span class="font-medium">{{ selectedTimeSlot }}</span>
              </div>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mb-6">
            Hemos enviado un correo electrónico con los detalles de tu reserva. Recibirás un recordatorio 24 horas antes de tu sesión.
          </p>
          
          <div class="flex justify-center">
            <button @click="closeConfirmation" class="bg-gradient-to-r from-[#7a9e9f] to-[#b8d8d8] text-white px-6 py-3 rounded-full hover:shadow-lg transition duration-300">
              Aceptar
            </button>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <footer class="bg-[#f8f3eb] py-8 border-t border-[#e8d5c4]/30">
        <div class="container mx-auto px-4">
          <div class="text-center text-gray-500">
            <p>&copy; {{ new Date().getFullYear() }} MiPsicoRed. Todos los derechos reservados. </p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    name: 'ReservarComponent',
    setup() {
      const mobileMenuOpen = ref(false)
      const selectedTherapist = ref(null)
      const currentDate = ref(new Date())
      const selectedDate = ref(null)
      const selectedTimeSlot = ref(null)
      const showConfirmationModal = ref(false)
      
      // Terapeutas
      const therapists = ref([
        {
          name: "Dra. Sara Jiménez",
          specialty: "Psicóloga Holística",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Dr. Miguel Chen",
          specialty: "Guía de Relaciones",
          image: "/placeholder.svg?height=300&width=300",
        },
        {
          name: "Dra. Luisa Rodríguez",
          specialty: "Practicante de Mindfulness",
          image: "/placeholder.svg?height=300&width=300",
        },
      ])
      
      // Días de la semana
      const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
      
      // Horarios disponibles
      const availableTimeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
        '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
      ]
      
      // Mes y año actual
      const currentMonthName = computed(() => {
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]
        return months[currentDate.value.getMonth()]
      })
      
      const currentYear = computed(() => {
        return currentDate.value.getFullYear()
      })
      
      // Días del calendario
      const calendarDays = computed(() => {
        const year = currentDate.value.getFullYear()
        const month = currentDate.value.getMonth()
        
        // Primer día del mes
        const firstDay = new Date(year, month, 1)
        // Último día del mes
        const lastDay = new Date(year, month + 1, 0)
        
        // Días del mes anterior para completar la primera semana
        const daysFromPrevMonth = firstDay.getDay()
        // Total de días en el calendario (incluyendo días del mes anterior y siguiente)
        const totalDays = daysFromPrevMonth + lastDay.getDate()
        // Completar la última semana con días del mes siguiente
        const daysFromNextMonth = 7 - (totalDays % 7 || 7)
        
        const days = []
        
        // Días del mes anterior
        for (let i = 0; i < daysFromPrevMonth; i++) {
          days.push({ date: null })
        }
        
        // Días del mes actual
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
          const date = new Date(year, month, i)
          // Determinar si el día está disponible (futuro y no domingo)
          const available = date >= today && date.getDay() !== 0
          days.push({ date, available })
        }
        
        // Días del mes siguiente
        for (let i = 0; i < daysFromNextMonth; i++) {
          days.push({ date: null })
        }
        
        return days
      })
      
      // Funciones
      const selectTherapist = (index) => {
        selectedTherapist.value = index
      }
      
      const selectDate = (date) => {
        if (date && isDateAvailable(date)) {
          selectedDate.value = date
          selectedTimeSlot.value = null
        }
      }
      
      const selectTimeSlot = (slot) => {
        selectedTimeSlot.value = slot
      }
      
      const isDateAvailable = (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date >= today && date.getDay() !== 0
      }
      
      const isDateSelected = (date) => {
        if (!selectedDate.value || !date) return false
        return date.getDate() === selectedDate.value.getDate() && 
               date.getMonth() === selectedDate.value.getMonth() && 
               date.getFullYear() === selectedDate.value.getFullYear()
      }
      
      const getDayClasses = (day) => {
        if (!day.date) return 'text-gray-300'
        
        let classes = ''
        
        if (!day.available) {
          classes = 'text-gray-400'
        } else if (isDateSelected(day.date)) {
          classes = 'bg-[#7a9e9f] text-white rounded-lg'
        } else {
          classes = 'text-gray-700'
        }
        
        return classes
      }
      
      const formatDate = (date) => {
        if (!date) return ''
        
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        const months = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ]
        
        return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
      }
      
      const prevMonth = () => {
        const newDate = new Date(currentDate.value)
        newDate.setMonth(newDate.getMonth() - 1)
        currentDate.value = newDate
      }
      
      const nextMonth = () => {
        const newDate = new Date(currentDate.value)
        newDate.setMonth(newDate.getMonth() + 1)
        currentDate.value = newDate
      }
      
      const closeConfirmation = () => {
        showConfirmationModal.value = false
        selectedTherapist.value = null
        selectedDate.value = null
        selectedTimeSlot.value = null
      }
      
      return {
        mobileMenuOpen,
        therapists,
        selectedTherapist,
        currentDate,
        currentMonthName,
        currentYear,
        weekDays,
        calendarDays,
        selectedDate,
        selectedTimeSlot,
        availableTimeSlots,
        showConfirmationModal,
        selectTherapist,
        selectDate,
        selectTimeSlot,
        isDateSelected,
        getDayClasses,
        formatDate,
        prevMonth,
        nextMonth,
        closeConfirmation
      }
    }
  }
  </script>