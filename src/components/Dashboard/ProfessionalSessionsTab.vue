<template>
    <div class="bg-white rounded-xl shadow-sm border">
        <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900">Gestión de Sesiones</h2>
                <div class="flex space-x-2">
                    <button @click="sessionFilter = 'all'"
                        :class="sessionFilter === 'all' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                        class="px-3 py-1 rounded-md text-sm font-medium">
                        Todas
                    </button>
                    <button @click="sessionFilter = 'today'"
                        :class="sessionFilter === 'today' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                        class="px-3 py-1 rounded-md text-sm font-medium">
                        Hoy
                    </button>
                    <button @click="sessionFilter = 'upcoming'"
                        :class="sessionFilter === 'upcoming' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                        class="px-3 py-1 rounded-md text-sm font-medium">
                        Próximas
                    </button>
                    <button @click="sessionFilter = 'completed'"
                        :class="sessionFilter === 'completed' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
                        class="px-3 py-1 rounded-md text-sm font-medium">
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
                                <UserIcon class="h-6 w-6 text-teal-600" />
                            </div>
                            <div class="ml-4">
                                <h3 class="font-medium text-gray-900">{{ session.patient_name || 'Paciente Desconocido'
                                    }}</h3>
                                <p class="text-sm text-gray-500">{{ session.session_date ? new
                                    Date(session.session_date).toLocaleString() : '—' }}
                                </p>
                                <p class="text-sm text-gray-600 mt-1">{{ session.notes }}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span
                                :class="getSessionStatusClass(session.session_status_id == 2 ? 'Completada' : 'Próxima')"
                                class="px-2 py-1 text-xs font-medium rounded-full">
                                {{ session.session_status_id == 2 ? 'Completada' : 'Próxima' }}
                            </span>
                            <a v-if="session.session_status_id != 2 && session.videocall_url"
                                :href="session.videocall_url" target="_blank"
                                class="text-teal-600 hover:text-teal-700 text-sm font-medium border border-teal-600 px-3 py-1 rounded-md hover:bg-teal-50 transition-colors">
                                Unirse
                            </a>
                            <button v-if="session.session_status_id != 2" @click="completeSession(session)"
                                :disabled="loadingId === session.id"
                                class="text-green-600 hover:text-green-700 text-sm font-medium border border-green-600 px-3 py-1 rounded-md hover:bg-green-50 transition-colors disabled:opacity-50">
                                {{ loadingId === session.id ? '...' : 'Completar' }}
                            </button>
                            <button @click="openModal(session)"
                                class="text-gray-500 hover:text-teal-600 text-sm font-medium">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                </div>
                <div v-if="filteredSessions.length === 0" class="text-center py-8 text-gray-500">
                    No hay sesiones en esta categoría (Total: {{ sessions.length }})
                </div>
            </div>
        </div>
    </div>

    <SessionDetailsModal :is-open="showModal" :session="selectedSession" @close="closeModal"
        @session-updated="handleSessionUpdated" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { User as UserIcon } from 'lucide-vue-next'
import SessionsService, { type Session } from '@/services/session/session.service'
import type { UpdatePayload } from '@/services/session/session.types'
import SessionDetailsModal from './SessionDetailsModal.vue'

const props = defineProps<{
    sessions: Session[]
}>()

//TODO: Update session state
const emit = defineEmits(['session-updated'])

const sessionFilter = ref('all')

const selectedSession = ref<any | null>(null)
const showModal = ref(false)
const loadingId = ref<string | null>(null)

const toLocalDateString = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

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

const completeSession = async (session: Session) => {
    if (!confirm('¿Estás seguro de marcar esta sesión como completada?')) return

    console.log("SESSION DATE: ", session.session_date)

    loadingId.value = session.id
    try {
        const payload: UpdatePayload = {
            id: session.id,
            patient_id: session.patient_id,
            professional_id: session.professional_id,
            session_type_id: session.session_type_id,
            session_status_id: 2, // 2 = Completed/Confirmed
            session_date: session.session_date,
            videocall_url: session.videocall_url,
            notes: session.notes,
            session_duration: session.session_duration
        }
        await SessionsService.update(payload)
        emit('session-updated')
    } catch (error) {
        console.error('Error completing session:', error)
        alert('Error al completar la sesión')
    } finally {
        loadingId.value = null
    }
}

const filteredSessions = computed(() => {
    // console.log('Filtering sessions. Total:', props.sessions.length, 'Filter:', sessionFilter.value)
    switch (sessionFilter.value) {
        case 'today':
            const today = new Date()
            const todayStr = toLocalDateString(today)
            return props.sessions.filter((s: any) => {
                const raw = s.session_date ?? s.date ?? s.start_at
                if (!raw) return false
                const d = new Date(raw)
                return toLocalDateString(d) === todayStr && s.session_status_id == 1
            })
        case 'upcoming':
            return props.sessions.filter((s: any) => s.session_status_id == 1)
        case 'completed':
            return props.sessions.filter((s: any) => s.session_status_id == 2)
        case 'all':
        default:
            return props.sessions
    }
})

const getSessionStatusClass = (status: string) => {
    switch (status) {
        case 'Próxima':
            return 'bg-blue-100 text-blue-800'
        case 'Completada':
            return 'bg-green-100 text-green-800'
        case 'Cancelada':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}
</script>
