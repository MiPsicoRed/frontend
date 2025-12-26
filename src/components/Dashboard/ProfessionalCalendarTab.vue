<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calendar Section -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar class="h-6 w-6 text-teal-600" />
                        Calendario
                    </h2>
                    <div class="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                        <button @click="previousMonth"
                            class="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600 hover:text-teal-600">
                            <ChevronLeft class="h-5 w-5" />
                        </button>
                        <span class="text-lg font-semibold min-w-[140px] text-center text-gray-800">{{ currentMonthYear
                        }}</span>
                        <button @click="nextMonth"
                            class="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600 hover:text-teal-600">
                            <ChevronRight class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <!-- Days Header -->
                <div class="grid grid-cols-7 gap-2 mb-4">
                    <div v-for="day in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']" :key="day"
                        class="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {{ day }}
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="grid grid-cols-7 gap-2">
                    <div v-for="date in calendarDays" :key="date.date" @click="selectDate(date)"
                        class="relative min-h-[100px] p-2 rounded-xl border transition-all duration-200 cursor-pointer group"
                        :class="[
                            date.isCurrentMonth ? 'bg-white hover:border-teal-300 hover:shadow-md' : 'bg-gray-50 text-gray-400 border-transparent',
                            date.isToday ? 'ring-2 ring-teal-500 ring-offset-2' : 'border-gray-100',
                            selectedDate?.date === date.date ? 'bg-teal-50 border-teal-500 shadow-sm' : ''
                        ]">

                        <div class="flex justify-between items-start">
                            <span class="text-sm font-semibold"
                                :class="date.isToday ? 'text-teal-600' : 'text-gray-700'">
                                {{ date.day }}
                            </span>
                            <span v-if="date.sessions.length > 0"
                                class="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-700">
                                {{ date.sessions.length }}
                            </span>
                        </div>

                        <!-- Session Dots -->
                        <div class="mt-2 flex flex-wrap gap-1">
                            <div v-for="(session, idx) in date.sessions.slice(0, 4)" :key="session.id"
                                class="h-1.5 w-1.5 rounded-full"
                                :class="session.completed ? 'bg-gray-300' : 'bg-teal-500'"></div>
                            <span v-if="date.sessions.length > 4"
                                class="text-[10px] text-gray-400 leading-none">+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Selected Date Details -->
        <div class="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div class="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 class="text-lg font-bold text-gray-900">
                    {{ selectedDate ? new Date(selectedDate.date).toLocaleDateString('es-ES', {
                        weekday: 'long', day:
                            'numeric', month: 'long'
                    }) : 'Selecciona una fecha' }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    {{ selectedDate?.sessions.length || 0 }} sesiones programadas
                </p>
            </div>

            <div class="flex-1 p-6 overflow-y-auto max-h-[600px]">
                <div v-if="selectedDate?.sessions.length > 0" class="space-y-4">
                    <div v-for="session in selectedDate.sessions" :key="session.id" @click="openModal(session)"
                        class="group p-4 rounded-xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all bg-white cursor-pointer">

                        <div class="flex justify-between items-start mb-3">
                            <div class="flex items-center gap-2 text-teal-700 font-bold">
                                <Clock class="h-4 w-4" />
                                {{ session.session_date ? new Date(session.session_date).toLocaleTimeString([], {
                                    hour:
                                        '2-digit', minute: '2-digit'
                                }) : '—' }}
                            </div>
                            <span :class="[
                                'px-2 py-0.5 rounded-full text-xs font-medium',
                                session.completed ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'
                            ]">
                                {{ session.completed ? 'Completada' : 'Pendiente' }}
                            </span>
                        </div>

                        <div class="flex items-center gap-3 mb-3">
                            <div class="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                <User class="h-4 w-4" />
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-gray-900">{{ session.patient_name }}</p>
                                <p class="text-xs text-gray-500">Paciente</p>
                            </div>
                        </div>

                        <div v-if="!session.completed && session.videocall_url"
                            class="mt-3 pt-3 border-t border-gray-50">
                            <a :href="session.videocall_url" target="_blank" @click.stop
                                class="flex items-center justify-center gap-2 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-lg transition-colors">
                                <Video class="h-4 w-4" />
                                Unirse a la llamada
                            </a>
                        </div>
                    </div>
                </div>

                <div v-else class="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                    <Calendar class="h-12 w-12 mb-3 opacity-20" />
                    <p class="text-sm">No hay sesiones para este día</p>
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
