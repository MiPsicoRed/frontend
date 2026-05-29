<template>
    <div v-if="isOpen && session"
        class="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-xs p-4">
        <div class="bg-white rounded-[2rem] border border-brand-border shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto text-left">
            <div class="p-8 border-b border-brand-border flex justify-between items-center">
                <h3 class="text-base font-bold font-serif text-brand-charcoal">Detalles de la Sesión</h3>
                <button @click="$emit('close')" class="text-brand-cool-gray hover:text-brand-charcoal cursor-pointer transition-colors">
                    <X class="h-5 w-5" />
                </button>
            </div>

            <div class="p-8 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">ID Sesión</p>
                        <p class="text-xs font-bold text-brand-charcoal mt-1">{{ session.id }}</p>
                    </div>
                    <div>
                        <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">Estado</p>
                        <span :class="session.session_status_id == 2 ? 'bg-emerald-55/40 border border-emerald-200 text-emerald-800' : 'bg-brand-sage-bg border border-brand-sage-border text-brand-teal'" class="px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wider rounded-full inline-block mt-1">
                            {{ session.session_status_id == 2 ? 'Completada' : 'Pendiente' }}
                        </span>
                    </div>
                    <div>
                        <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">Paciente</p>
                        <p class="text-xs font-bold text-brand-charcoal mt-1">{{ session.patient_name || 'Desconocido' }}</p>
                        <p class="text-[10px] text-brand-cool-gray font-mono mt-0.5">{{ session.patient_id }}</p>
                    </div>
                    <div class="md:col-span-2">
                        <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">Fecha y Hora</p>
                        <p class="text-sm font-bold text-brand-teal mt-1">{{ formatDateTime(session.session_date) }} hrs</p>
                    </div>
                    <div class="md:col-span-2" v-if="session.notes">
                        <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">Notas</p>
                        <p class="text-xs text-brand-muted-teal bg-[#F9FBFA] border border-brand-border p-4 rounded-xl mt-1.5 font-medium leading-relaxed italic">"{{ session.notes }}"</p>
                    </div>
                </div>

                <div class="border-t border-brand-border pt-8">
                    <h4 class="text-xs font-black text-brand-charcoal uppercase tracking-wider mb-4">Acciones</h4>

                    <div class="flex flex-col gap-4">
                        <!-- Confirm Action -->
                        <div class="flex items-center justify-between bg-[#F9FBFA] border border-brand-border p-5 rounded-2xl flex-wrap sm:flex-nowrap gap-4">
                            <div>
                                <p class="text-xs font-bold text-brand-charcoal">Confirmar Sesión</p>
                                <p class="text-[10px] text-brand-cool-gray mt-0.5">Marcar la sesión como confirmada/completada</p>
                            </div>
                            <button @click="confirmSession" :disabled="updating"
                                class="bg-emerald-700 text-white px-4 py-2 rounded-full hover:bg-emerald-800 transition-all active:scale-[0.98] text-[10px] font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-emerald-700/5 disabled:opacity-50">
                                Confirmar
                            </button>
                        </div>

                        <!-- Reschedule Action -->
                        <div class="bg-[#F9FBFA] border border-brand-border p-5 rounded-2xl">
                            <p class="text-xs font-bold text-brand-charcoal mb-4">Proponer Nueva Fecha</p>
                            <div class="flex flex-wrap gap-4 items-end">
                                <div>
                                    <label class="block text-[10px] text-brand-cool-gray font-black uppercase tracking-wider mb-1.5">Fecha</label>
                                    <input v-model="newDate" type="date" class="px-3 py-2 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-white">
                                </div>
                                <div>
                                    <label class="block text-[10px] text-brand-cool-gray font-black uppercase tracking-wider mb-1.5">Hora</label>
                                    <input v-model="newTime" type="time" class="px-3 py-2 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-medium bg-white">
                                </div>
                                <button @click="updateDate" :disabled="updating || !newDate || !newTime"
                                    class="bg-brand-teal text-white px-4 py-2.5 rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-[10px] font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-brand-teal/5 disabled:opacity-50">
                                    Guardar Fecha
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import SessionsService, { type Session } from '@/services/session/session.service'

const props = defineProps<{
    isOpen: boolean
    session: any | null // Using any to allow enriched session with patient_name
}>()

const emit = defineEmits(['close', 'session-updated'])

const newDate = ref('')
const newTime = ref('')
const updating = ref(false)

const formatDateTime = (date: Date | string | null): string => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleString()
}

const confirmSession = async () => {
    if (!props.session) return

    if (!confirm('¿Estás seguro de confirmar esta sesión?')) return

    updating.value = true
    try {
        await SessionsService.update({
            id: props.session.id,
            patient_id: props.session.patient_id,
            professional_id: props.session.professional_id,
            session_type_id: props.session.session_type_id,
            session_status_id: props.session.session_status_id,
            session_date: props.session.session_date,
            videocall_url: props.session.videocall_url,
            notes: props.session.notes,
            session_duration: props.session.session_duration
        })
        alert('Sesión confirmada')
        emit('close')
        emit('session-updated')
    } catch (err) {
        console.error('Error confirming session:', err)
        alert('Error al confirmar la sesión')
    } finally {
        updating.value = false
    }
}

const updateDate = async () => {
    if (!props.session || !newDate.value || !newTime.value) {
        alert('Por favor selecciona fecha y hora')
        return
    }

    updating.value = true
    try {
        // Construct new date (naive)
        const sessionDate = new Date(`${newDate.value}T${newTime.value}:00`)

        await SessionsService.update({
            id: props.session.id,
            patient_id: props.session.patient_id,
            professional_id: props.session.professional_id,
            session_type_id: props.session.session_type_id,
            session_status_id: props.session.session_status_id,
            session_date: sessionDate.toISOString().slice(0, 19),
            videocall_url: props.session.videocall_url,
            notes: props.session.notes,
            session_duration: props.session.session_duration
        })
        alert('Fecha actualizada')
        emit('close')
        emit('session-updated')
    } catch (err) {
        console.error('Error updating date:', err)
        alert('Error al actualizar la fecha')
    } finally {
        updating.value = false
    }
}
</script>
