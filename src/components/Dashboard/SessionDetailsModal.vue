<template>
    <div v-if="isOpen && session"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 class="text-xl font-bold text-gray-900">Detalles de la Sesión</h3>
                <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
                    <X class="h-6 w-6" />
                </button>
            </div>

            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-sm font-medium text-gray-500">ID Sesión</p>
                        <p class="text-gray-900">{{ session.id }}</p>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Estado</p>
                        <span :class="session.session_status_id == 2 ? 'text-green-600' : 'text-yellow-600'" class="font-medium">
                            {{ session.session_status_id == 2 ? 'Completada' : 'Pendiente' }}
                        </span>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-500">Paciente</p>
                        <p class="text-gray-900 font-medium">{{ session.patient_name || 'Desconocido' }}</p>
                        <p class="text-xs text-gray-400">{{ session.patient_id }}</p>
                    </div>
                    <div class="md:col-span-2">
                        <p class="text-sm font-medium text-gray-500">Fecha y Hora Actual</p>
                        <p class="text-gray-900 text-lg">{{ formatDateTime(session.session_date) }}</p>
                    </div>
                    <div class="md:col-span-2" v-if="session.notes">
                        <p class="text-sm font-medium text-gray-500">Notas</p>
                        <p class="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">{{ session.notes }}</p>
                    </div>
                </div>

                <div class="border-t border-gray-100 pt-6">
                    <h4 class="font-bold text-gray-900 mb-4">Acciones</h4>

                    <div class="flex flex-col gap-4">
                        <!-- Confirm Action -->
                        <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p class="font-medium text-gray-900">Confirmar Sesión</p>
                                <p class="text-sm text-gray-500">Marcar la sesión como confirmada/completada</p>
                            </div>
                            <button @click="confirmSession" :disabled="updating"
                                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                                Confirmar
                            </button>
                        </div>

                        <!-- Reschedule Action -->
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="font-medium text-gray-900 mb-2">Proponer Nueva Fecha</p>
                            <div class="flex flex-wrap gap-3 items-end">
                                <div>
                                    <label class="block text-xs text-gray-500 mb-1">Fecha</label>
                                    <input v-model="newDate" type="date" class="border rounded-lg px-3 py-2 text-sm">
                                </div>
                                <div>
                                    <label class="block text-xs text-gray-500 mb-1">Hora</label>
                                    <input v-model="newTime" type="time" class="border rounded-lg px-3 py-2 text-sm">
                                </div>
                                <button @click="updateDate" :disabled="updating || !newDate || !newTime"
                                    class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 text-sm">
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
            session_date: sessionDate,
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
