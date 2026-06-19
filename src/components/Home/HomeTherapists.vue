<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.module'
import { therapistsData, type Therapist } from '@/data/therapists'
import { Star, ShieldCheck, DollarSign, Calendar, Clock, Smile, Search, AlertCircle } from 'lucide-vue-next'
import axios from 'axios'

const emit = defineEmits<{
  (e: 'click-view', view: string): void
}>()

const authStore = useAuthStore()
const router = useRouter()

const searchTerm = ref('')
const selectedSpecialty = ref('All')
const selectedPrice = ref('All')
const selectedTherapist = ref<Therapist | null>(null)
const allTherapists = ref<Therapist[]>([...therapistsData])

// Booking modal state
const bookingDate = ref('')
const bookingTime = ref('10:00')
const bookingSuccess = ref(false)

const specialties = [
  'All',
  'Terapia Cognitivo-Conductual',
  'Ansiedad y Depresión',
  'Psicoanálisis Clínico',
  'Terapia de Pareja',
  'Terapia Familiar',
  'Psicología Infantil y Adolescentes',
  'Mindfulness'
]

const filteredTherapists = computed(() => {
  return allTherapists.value.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
                          therapist.bio.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    const matchesSpecialty = selectedSpecialty.value === 'All' || 
                            therapist.specialty.some(s => s.toLowerCase().includes(selectedSpecialty.value.toLowerCase()))
    
    let matchesPrice = true
    if (selectedPrice.value === 'under55') {
      matchesPrice = therapist.sessionPrice <= 55
    } else if (selectedPrice.value === 'over55') {
      matchesPrice = therapist.sessionPrice > 55
    }
    
    return matchesSearch && matchesSpecialty && matchesPrice
  })
})

const handleOpenBooking = (therapist: Therapist) => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }
  selectedTherapist.value = therapist
  bookingDate.value = new Date(Date.now() + 86400000).toISOString().split('T')[0] || '' // tomorrow
  bookingTime.value = '10:00'
  bookingSuccess.value = false
}

const handleConfirmBooking = (e: Event) => {
  e.preventDefault()
  if (!selectedTherapist.value || !authStore.isLoggedIn) return

  const user = {
    id: authStore.userId || 'patient-mock-1',
    name: authStore.fullUserName || 'Usuario',
  }

  const newAppointment = {
    id: `appt-${Date.now()}`,
    therapistId: selectedTherapist.value.id,
    therapistName: selectedTherapist.value.name,
    therapistSpecialty: selectedTherapist.value.specialty[0],
    patientId: user.id,
    patientName: user.name,
    date: bookingDate.value,
    time: bookingTime.value,
    status: 'confirmed',
    type: 'initial_free',
    meetingUrl: `https://ais-video-session-${selectedTherapist.value.id}`
  }

  // Save appt to localStorage matching simulated restyle workspace
  const savedAppts = JSON.parse(localStorage.getItem('mipsicored_appointments') || '[]')
  savedAppts.push(newAppointment)
  localStorage.setItem('mipsicored_appointments', JSON.stringify(savedAppts))

  bookingSuccess.value = true
  setTimeout(() => {
    selectedTherapist.value = null
    bookingSuccess.value = false
    emit('click-view', 'dashboard')
  }, 2000)
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedSpecialty.value = 'All'
  selectedPrice.value = 'All'
}

onMounted(async () => {
  try {
    const baseApi = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3001/api/'
    const [allRes, selRes] = await Promise.all([
      axios.get(`${baseApi}professional/all`),
      axios.get(`${baseApi}professional/selector`)
    ])

    const allData = allRes.data.data
    const selData = selRes.data.data

    if (allData && allData.length > 0) {
      allTherapists.value = allData.map((dbProf: any, index: number) => {
        const selectorInfo = selData.find((s: any) => s.professional_id === dbProf.id)
        const name = selectorInfo ? selectorInfo.name : 'Terapeuta'
        
        return {
          id: dbProf.id,
          name: name,
          specialty: [], // Will be fetched from DB when implemented
          bio: dbProf.bio || 'Este profesional aún no ha añadido una biografía.',
          rating: 5.0,
          reviewsCount: 0,
          sessionPrice: dbProf.hourly_rate || 0,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E8F3F1&color=0D5C63&size=400&font-size=0.33`, // Default thumbnail with initials
          availability: [],
          education: dbProf.education || 'Profesional Colegiado',
          languages: ['Español'] // Default fallback
        }
      })
    }
  } catch (e) {
    console.error('Failed to load professionals from database', e)
  }
})
</script>

<template>
  <section class="py-20 bg-[#F9FBFA] min-h-screen">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      
      <!-- Header Title -->
      <div class="text-left space-y-3 mb-12">
        <p class="font-sans text-xs font-bold uppercase tracking-widest text-brand-teal bg-brand-sage-bg px-3 py-1 rounded-full w-fit">
          Nuestra Red Profesional
        </p>
        <h2 class="text-3xl sm:text-4xl font-serif font-medium text-brand-dark-text tracking-tight">
          Encuentra tu Psicólogo Certificado
        </h2>
        <p class="text-[#526663] text-sm max-w-2xl leading-relaxed font-sans">
          Todos nuestros terapeutas han pasado por una rigurosa verificación de credenciales con el Colegio de Psicólogos. Visualiza sus horarios disponibles y agenda tu sesión.
        </p>
      </div>

      <!-- Filters Panel bar -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white p-6 rounded-[2rem] border border-brand-border shadow-sm mb-10 items-center">
        
        <div class="lg:col-span-5 relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cool-gray w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nombre, biografía, método..."
            v-model="searchTerm"
            class="w-full pl-11 pr-4 py-3 bg-[#F4F7F6] text-brand-charcoal placeholder-[#7A9390] border border-brand-border rounded-full text-xs focus:outline-brand-teal focus:bg-white transition-all font-sans"
          />
        </div>

        <div class="lg:col-span-3">
          <select
            v-model="selectedSpecialty"
            class="w-full bg-[#F4F7F6] text-brand-charcoal border border-brand-border rounded-full px-4 py-3 text-xs focus:outline-brand-teal focus:bg-white transition-all cursor-pointer font-medium font-sans"
          >
            <option v-for="(spec, i) in specialties" :key="i" :value="spec">
              {{ spec === 'All' ? 'Especialidades: Todas' : spec }}
            </option>
          </select>
        </div>

        <div class="lg:col-span-2">
          <select
            v-model="selectedPrice"
            class="w-full bg-[#F4F7F6] text-brand-charcoal border border-brand-border rounded-full px-4 py-3 text-xs focus:outline-brand-teal focus:bg-white transition-all cursor-pointer font-medium font-sans"
          >
            <option value="All">Tarifas: Todas</option>
            <option value="under55">Hasta $55 por sesión</option>
            <option value="over55">Más de $55 por sesión</option>
          </select>
        </div>

        <div class="lg:col-span-2 text-right">
          <button 
            @click="clearFilters"
            class="text-xs text-[#0D5C63] hover:text-[#0A4D53] font-bold underline underline-offset-4 cursor-pointer bg-transparent border-0 font-sans"
          >
            Limpiar Filtros
          </button>
        </div>

      </div>

      <!-- Dynamic List -->
      <div v-if="filteredTherapists.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="therapist in filteredTherapists" 
          :key="therapist.id"
          class="bg-white rounded-3xl border border-brand-border hover:border-brand-sage-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col justify-between text-left"
        >
          
          <!-- Upper profile content -->
          <div class="p-8 space-y-5">
            <div class="flex gap-4.5">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-brand-border shadow-sm relative bg-[#F4F7F6]">
                <img 
                  :src="therapist.image" 
                  :alt="therapist.name" 
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-1.5 font-sans">
                  <span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-brand-sage-bg text-brand-teal text-[10px] font-black">
                    ★ {{ therapist.rating }}
                  </span>
                  <span class="text-[11px] text-brand-cool-gray">({{ therapist.reviewsCount }} reseñas)</span>
                </div>
                <h3 class="font-bold text-[17px] text-brand-charcoal tracking-tight leading-snug font-sans">
                  {{ therapist.name }}
                </h3>
                <p class="text-[11px] text-brand-teal font-medium uppercase tracking-wider font-sans">
                  {{ therapist.languages.join(' • ') }}
                </p>
              </div>
            </div>

            <div class="space-y-3">
              <p class="text-[#526663] text-xs line-clamp-3 leading-relaxed font-sans">
                {{ therapist.bio }}
              </p>
              <div class="flex flex-wrap gap-1 font-sans">
                <span 
                  v-for="(spec, index) in therapist.specialty" 
                  :key="index" 
                  class="text-[10px] font-medium px-2.5 py-1 rounded bg-[#F4F7F6] border border-[#D1E2E0] text-[#0D5C63]"
                >
                  {{ spec }}
                </span>
              </div>
            </div>

            <!-- Pricing and verified details -->
            <div class="pt-4 border-t border-brand-border space-y-2 font-sans">
              <div class="flex justify-between items-center text-xs">
                <span class="text-brand-cool-gray font-medium">Precio por sesión (50 min):</span>
                <span class="font-bold text-brand-charcoal text-sm">${{ therapist.sessionPrice }} USD</span>
              </div>
              <div class="flex items-center gap-1.5 text-[11px] text-brand-teal font-bold">
                <ShieldCheck class="w-4 h-4 text-brand-teal shrink-0" />
                <span>{{ therapist.education.split(' - ')[0] }}</span>
              </div>
            </div>

          </div>

          <!-- Footer interactive buttons -->
          <div class="px-8 pb-8 pt-2 bg-[#F9FBFA]/80 border-t border-brand-border grid grid-cols-1 gap-2 font-sans">
            <button
              @click="handleOpenBooking(therapist)"
              class="w-full bg-brand-teal hover:bg-brand-teal-hover active:scale-98 transition-all text-white text-xs font-bold py-3.5 rounded-full cursor-pointer text-center flex items-center justify-center gap-2 shadow-md shadow-brand-teal/5 border-0"
            >
              <Calendar class="w-4 h-4" />
              Reservar Cita Gratis
            </button>
          </div>

        </div>
      </div>

      <div v-else class="bg-white border border-brand-border p-12 rounded-[2.5rem] text-center space-y-4 max-w-lg mx-auto">
        <Smile class="w-12 h-12 text-brand-cool-gray mx-auto" />
        <h3 class="text-lg font-bold text-brand-charcoal font-sans">Ningún terapeuta coincide con tus filtros</h3>
        <p class="text-brand-muted-teal text-xs leading-relaxed font-sans">
          Prueba limpiando los filtros actuales o buscando una palabra clave diferente (como "Ansiedad", "Familia" o "Pareja").
        </p>
        <button
          @click="clearFilters"
          class="bg-brand-teal hover:bg-brand-teal-hover text-white px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer border-0 font-sans"
        >
          Resetear Búsqueda
        </button>
      </div>

      <!-- Interactive Booking Modal Drawer -->
      <div v-if="selectedTherapist" class="fixed inset-0 z-50 overflow-y-auto bg-brand-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="relative bg-white max-w-md w-full rounded-[2.5rem] border border-brand-border shadow-2xl p-8 text-left space-y-6 animate-in slide-in-from-bottom duration-300">
          
          <div class="flex justify-between items-start">
            <div class="space-y-1.5">
              <p class="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-teal">Reserva de primera sesión</p>
              <h3 class="text-lg font-bold text-brand-charcoal font-serif tracking-tight">Agendar con {{ selectedTherapist.name }}</h3>
            </div>
            <button 
              @click="selectedTherapist = null"
              class="p-1 px-2.5 rounded-full bg-[#F4F7F6] text-brand-cool-gray hover:text-brand-charcoal border-0 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div v-if="bookingSuccess" class="py-8 text-center space-y-3">
            <div class="w-12 h-12 rounded-full bg-[#E8F3F1] flex items-center justify-center text-brand-teal mx-auto font-black text-xl">
              ✓
            </div>
            <h4 class="text-base font-bold text-brand-charcoal font-sans">¡Cita Agendada Exitosamente!</h4>
            <p class="text-brand-cool-gray text-xs font-sans">Redirigiéndote a tu espacio personal de teleterapia...</p>
          </div>

          <form v-else @submit="handleConfirmBooking" class="space-y-4 font-sans">
            <div class="bg-[#E8F3F1] p-4 rounded-2xl border border-[#D1E2E0] flex gap-3 text-xs text-brand-teal leading-relaxed">
              <Clock class="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <strong>Sesión 100% Gratuita:</strong> Estás agendando una primera sesión de orientación de 20 minutos con diagnóstico básico y recomendación terapéutica.
              </div>
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-brand-charcoal block">Selecciona la Fecha:</label>
              <input
                type="date"
                v-model="bookingDate"
                required
                :min="new Date().toISOString().split('T')[0]"
                class="w-full bg-[#F4F7F6] text-brand-charcoal border border-brand-border rounded-full px-4 py-2.5 text-xs focus:outline-brand-teal focus:bg-white"
              />
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-xs font-bold text-brand-charcoal block">Horario Disponible:</label>
              <select
                v-model="bookingTime"
                required
                class="w-full bg-[#F4F7F6] text-brand-charcoal border border-brand-border rounded-full px-4 py-2.5 text-xs focus:outline-brand-teal"
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="15:00">15:00 PM</option>
                <option value="16:00">16:00 PM</option>
                <option value="17:00">17:00 PM</option>
              </select>
            </div>



            <div class="pt-2 flex gap-3">
              <button
                type="button"
                @click="selectedTherapist = null"
                class="flex-1 border border-brand-border text-brand-muted-teal font-bold text-xs py-3 rounded-full hover:bg-[#F4F7F6] text-center cursor-pointer bg-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="flex-1 bg-brand-teal hover:bg-brand-teal-hover active:scale-98 text-white font-bold text-xs py-3 rounded-full text-center cursor-pointer border-0"
              >
                Confirmar Cita
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  </section>
</template>