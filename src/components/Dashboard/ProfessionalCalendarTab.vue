<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        <!-- Calendar Section -->
        <div class="lg:col-span-2 bg-white rounded-[2rem] border border-brand-border overflow-hidden shadow-xs">
            <div class="p-8 border-b border-brand-border">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                    <h2 class="text-base font-bold font-serif text-brand-charcoal flex items-center gap-2">
                        <Calendar class="h-5 w-5 text-brand-teal" />
                        Calendario de Citas
                    </h2>
                    <div class="flex items-center space-x-1.5 bg-brand-bg border border-brand-border rounded-xl p-1">
                        <button @click="previousMonth"
                            class="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all text-brand-cool-gray hover:text-brand-teal cursor-pointer">
                            <ChevronLeft class="h-4 w-4" />
                        </button>
                        <span class="text-xs font-black uppercase tracking-wider min-w-[140px] text-center text-brand-charcoal">{{ currentMonthYear }}</span>
                        <button @click="nextMonth"
                            class="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all text-brand-cool-gray hover:text-brand-teal cursor-pointer">
                            <ChevronRight class="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="p-8">
                <!-- Days Header -->
                <div class="grid grid-cols-7 gap-2 mb-4">
                    <div v-for="day in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']" :key="day"
                        class="text-center text-[10px] font-black text-brand-cool-gray uppercase tracking-wider">
                        {{ day }}
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="grid grid-cols-7 gap-2">
                    <div v-for="date in calendarDays" :key="date.date" @click="selectDate(date)"
                        class="relative min-h-[90px] p-2 rounded-2xl border transition-all duration-200 cursor-pointer group"
                        :class="[
                            date.isCurrentMonth ? 'bg-white border-brand-border hover:border-brand-sage-border hover:shadow-xs' : 'bg-brand-bg text-brand-cool-gray/50 border-transparent cursor-default',
                            date.isToday ? 'ring-2 ring-brand-teal ring-offset-2' : '',
                            selectedDate?.date === date.date ? 'bg-brand-sage-bg border-brand-teal shadow-xs' : ''
                        ]">

                        <div class="flex justify-between items-start">
                            <span class="text-xs font-bold"
                                :class="date.isToday ? 'text-brand-teal font-extrabold' : 'text-brand-charcoal'">
                                {{ date.day }}
                            </span>
                            <span v-if="date.sessions.length > 0"
                                class="flex h-4 w-4 items-center justify-center rounded-full bg-brand-teal text-[9px] font-bold text-white">
                                {{ date.sessions.length }}
                            </span>
                        </div>

                        <!-- Session Dots -->
                        <div class="mt-2 flex flex-wrap gap-1">
                            <div v-for="session in date.sessions.slice(0, 3)" :key="session.id"
                                class="h-1.5 w-1.5 rounded-full"
                                :class="session.session_status_id == 2 ? 'bg-brand-cool-gray/50' : 'bg-brand-teal'"></div>
                            <span v-if="date.sessions.length > 3"
                                class="text-[9px] text-brand-cool-gray leading-none">+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Selected Date Details -->
        <div class="lg:col-span-1 bg-white rounded-[2rem] border border-brand-border overflow-hidden flex flex-col h-full shadow-xs">
            <div class="p-8 border-b border-brand-border bg-brand-bg/50">
                <h3 class="text-base font-bold font-serif text-brand-charcoal">
                    {{ selectedDate ? new Date(selectedDate.date).toLocaleDateString('es-ES', {
                        weekday: 'long', day:
                            'numeric', month: 'long'
                    }) : 'Selecciona una fecha' }}
                </h3>
                <p class="text-xs text-brand-muted-teal mt-1">
                    {{ selectedDate?.sessions.length || 0 }} {{ (selectedDate?.sessions.length === 1) ? 'sesión programada' : 'sesiones programadas' }}
                </p>
            </div>

            <div class="flex-1 p-8 overflow-y-auto max-h-[600px] space-y-4">
                <div v-if="selectedDate?.sessions.length > 0" class="space-y-4">
                    <div v-for="session in selectedDate.sessions" :key="session.id" @click="openModal(session)"
                        class="group p-4 rounded-2xl border border-brand-border hover:border-brand-sage-border hover:shadow-xs transition-all bg-[#F9FBFA] cursor-pointer">

                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center gap-2 text-brand-teal font-extrabold text-xs">
                                <Clock class="h-3.5 w-3.5" />
                                {{ session.session_date ? new Date(session.session_date).toLocaleTimeString([], {
                                    hour:
                                        '2-digit', minute: '2-digit'
                                }) : '—' }} hrs
                            </div>
                            <span :class="[
                                'px-2.5 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider',
                                session.session_status_id == 2 ? 'bg-emerald-55/40 border border-emerald-200 text-emerald-800' : 'bg-brand-sage-bg border border-brand-sage-border text-brand-teal'
                            ]">
                                {{ session.session_status_id == 2 ? 'Completada' : 'Pendiente' }}
                            </span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="h-8 w-8 rounded-full bg-brand-sage-bg border border-brand-sage-border flex items-center justify-center text-brand-teal shrink-0">
                                <User class="h-4 w-4" />
                            </div>
                            <div>
                                <p class="text-xs font-bold text-brand-charcoal">{{ session.patient_name }}</p>
                                <p class="text-[10px] text-brand-cool-gray mt-0.5">Paciente</p>
                            </div>
                        </div>

                        <div v-if="session.session_status_id != 2 && session.videocall_url"
                            class="mt-4 pt-4 border-t border-brand-border">
                            <a :href="session.videocall_url" target="_blank" @click.stop
                                class="flex items-center justify-center gap-2 w-full py-2 bg-brand-teal hover:bg-brand-teal-hover text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all active:scale-[0.98]">
                                <Video class="h-3.5 w-3.5" />
                                Unirse a llamada
                            </a>
                        </div>
                    </div>
                </div>

                <div v-else class="h-full flex flex-col items-center justify-center text-brand-cool-gray/70 py-12">
                    <Calendar class="h-10 w-10 mb-3 opacity-20 text-brand-teal" />
                    <p class="text-xs font-medium">No hay sesiones para este día</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <SessionDetailsModal :is-open="showModal" :session="selectedSession" @close="closeModal"
        @session-updated="handleSessionUpdated" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Video } from 'lucide-vue-next'
import { type Session } from '@/services/session/session.service'
import SessionDetailsModal from './SessionDetailsModal.vue'

const props = defineProps<{
    sessions: Session[]
}>()

const emit = defineEmits(['session-updated'])

const currentDate = ref(new Date())
const selectedDate = ref<any>(null)

// Modal state
const selectedSession = ref<any | null>(null)
const showModal = ref(false)

const openModal = (session: Session) => {
    selectedSession.value = session
    showModal.value = true
}

const closeModal = () => {
    selectedSession.value = null
    showModal.value = false
}

const handleSessionUpdated = () => {
    emit('session-updated')
}

const currentMonthYear = computed(() => {
    // Capitalize first letter
    const str = currentDate.value.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    return str.charAt(0).toUpperCase() + str.slice(1)
})

const toLocalDateString = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getSessionsForDate = (date: Date) => {
    const dateStr = toLocalDateString(date)
    return props.sessions.filter((s: any) => {
        const raw = s.session_date ?? s.date ?? s.start_at
        if (!raw) return false
        const d = new Date(raw)
        return toLocalDateString(d) === dateStr
    }).sort((a: any, b: any) => {
        const dateA = new Date(a.session_date ?? a.date ?? a.start_at)
        const dateB = new Date(b.session_date ?? b.date ?? b.start_at)
        return dateA.getTime() - dateB.getTime()
    })
}

const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)

    // Adjust start date to Monday (1)
    const day = firstDay.getDay()
    const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1)
    startDate.setDate(diff)

    const days = []
    const today = new Date()

    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)

        const dayData = {
            date: toLocalDateString(date),
            day: date.getDate(),
            isCurrentMonth: date.getMonth() === month,
            isToday: toLocalDateString(date) === toLocalDateString(today),
            sessions: getSessionsForDate(date)
        }

        days.push(dayData)
    }

    return days
})

const previousMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date: any) => {
    selectedDate.value = date
}

// Initialize selected date to today
onMounted(() => {
    const today = new Date()
    const todayStr = toLocalDateString(today)
    const todayData = {
        date: todayStr,
        day: today.getDate(),
        isCurrentMonth: true,
        isToday: true,
        sessions: getSessionsForDate(today)
    }
    selectedDate.value = todayData
})

// Update selected date when sessions change
watch(() => props.sessions, () => {
    if (selectedDate.value) {
        const date = new Date(selectedDate.value.date)
        selectedDate.value = {
            ...selectedDate.value,
            sessions: getSessionsForDate(date)
        }
    }
}, { deep: true })
</script>
