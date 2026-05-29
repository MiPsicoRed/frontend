<template>
    <div class="bg-white rounded-[2rem] border border-brand-border shadow-xs text-left">
        <div class="p-8 border-b border-brand-border">
            <div class="flex items-center justify-between gap-4 flex-wrap">
                <h2 class="text-lg font-bold font-serif text-brand-dark-text">Gestión de Sesiones</h2>
                <div class="flex space-x-2">
                    <button @click="sessionFilter = 'all'"
                        :class="sessionFilter === 'all' ? 'bg-brand-sage-bg border-brand-sage-border text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal'"
                        class="px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer">
                        Todas
                    </button>
                    <button @click="sessionFilter = 'today'"
                        :class="sessionFilter === 'today' ? 'bg-brand-sage-bg border-brand-sage-border text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal'"
                        class="px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer">
                        Hoy
                    </button>
                    <button @click="sessionFilter = 'upcoming'"
                        :class="sessionFilter === 'upcoming' ? 'bg-brand-sage-bg border-brand-sage-border text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal'"
                        class="px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer">
                        Próximas
                    </button>
                    <button @click="sessionFilter = 'completed'"
                        :class="sessionFilter === 'completed' ? 'bg-brand-sage-bg border-brand-sage-border text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal'"
                        class="px-4 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer">
                        Completadas
                    </button>
                </div>
            </div>
        </div>

        <div class="p-8">
            <div class="space-y-4">
                <div v-for="session in filteredSessions" :key="session.id" class="p-5 bg-brand-bg rounded-2xl border border-brand-border hover:border-brand-sage-border transition-all flex items-center justify-between flex-wrap sm:flex-nowrap gap-4">
                    <div class="flex items-center">
                        <div class="w-11 h-11 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
                            <UserIcon class="h-5 w-5 text-brand-teal" />
                        </div>
                        <div class="ml-4 text-left">
                            <h3 class="text-xs font-bold text-brand-charcoal">{{ session.patient_name || 'Paciente Desconocido' }}</h3>
                            <p class="text-[11px] text-brand-cool-gray mt-0.5">
                                {{ session.session_date ? new Date(session.session_date).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' }) : '—' }} hrs
                            </p>
                            <p v-if="session.notes" class="text-xs text-brand-muted-teal mt-1.5 line-clamp-1 italic max-w-md">"{{ session.notes }}"</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-end">
                        <span
                            :class="getSessionStatusClass(session.session_status_id == 2 ? 'Completada' : 'Próxima')"
                            class="px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full">
                            {{ session.session_status_id == 2 ? 'Completada' : 'Próxima' }}
                        </span>
                        <JoinMeetButton v-if="session.session_status_id != 2" :session="session" />
                        <button v-if="session.session_status_id != 2" @click="completeSession(session)"
                            :disabled="loadingId === session.id"
                            class="text-emerald-700 hover:text-emerald-800 text-[10px] font-bold border border-emerald-200 bg-emerald-50 hover:bg-emerald-100/60 px-3 py-1.5 rounded-full transition-all disabled:opacity-50 cursor-pointer uppercase tracking-wider">
                            {{ loadingId === session.id ? '...' : 'Completar' }}
                        </button>
                        <button @click="openModal(session)"
                            class="text-brand-cool-gray hover:text-brand-teal text-[10px] font-bold border border-brand-border hover:border-brand-sage-border bg-white px-3 py-1.5 rounded-full transition-all cursor-pointer uppercase tracking-wider shadow-xs">
                            Ver Detalles
                        </button>
                    </div>
                </div>
                <div v-if="filteredSessions.length === 0" class="text-center py-12 text-brand-cool-gray text-xs font-medium">
                    No hay sesiones en esta categoría.
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
import JoinMeetButton from './JoinMeetButton.vue'

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
            return 'bg-brand-sage-bg border border-brand-sage-border text-brand-teal'
        case 'Completada':
            return 'bg-emerald-55/40 border border-emerald-200 text-emerald-800'
        case 'Cancelada':
            return 'bg-red-50/50 border border-red-200 text-red-800'
        default:
            return 'bg-brand-bg border border-brand-border text-brand-cool-gray'
    }
}
</script>
