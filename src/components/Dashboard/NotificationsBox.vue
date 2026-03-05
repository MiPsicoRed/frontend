<template>
    <div class="bg-white rounded-xl shadow-sm border p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BellIcon class="w-5 h-5 text-gray-500" />
                Notificaciones
            </h3>
            <button v-if="notifications.length > 0" @click="clearAll"
                class="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline">
                Marcar todas como leídas
            </button>
        </div>

        <!-- Notifications List -->
        <div v-if="notifications.length > 0" class="flex-1 overflow-y-auto pr-2 space-y-4">
            <div v-for="notification in notifications" :key="notification.id"
                class="p-4 rounded-lg flex gap-4 items-start transition-colors" :class="{
                    'bg-blue-50/50 border border-blue-100': notification.type === 'info',
                    'bg-green-50/50 border border-green-100': notification.type === 'success',
                    'bg-orange-50/50 border border-orange-100': notification.type === 'warning',
                    'bg-gray-50 border border-gray-100': notification.type === 'default'
                }">
                <!-- Icon based on type -->
                <div class="mt-0.5 flex-shrink-0">
                    <InfoIcon v-if="notification.type === 'info'" class="w-5 h-5 text-blue-500" />
                    <CheckCircleIcon v-else-if="notification.type === 'success'" class="w-5 h-5 text-green-500" />
                    <AlertCircleIcon v-else-if="notification.type === 'warning'" class="w-5 h-5 text-orange-500" />
                    <BellIcon v-else class="w-5 h-5 text-gray-400" />
                </div>

                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <h4 class="text-sm font-medium text-gray-900 truncate">{{ notification.title }}</h4>
                        <span class="text-xs text-gray-400 whitespace-nowrap">{{ notification.time }}</span>
                    </div>
                    <p class="text-sm text-gray-600 line-clamp-2">{{ notification.message }}</p>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <BellSleepIcon class="w-8 h-8 text-gray-300" />
            </div>
            <h4 class="text-sm font-medium text-gray-900 mb-1">No tienes notificaciones</h4>
            <p class="text-sm text-gray-500">Te avisaremos cuando haya novedades importantes o recordatorios de tus
                sesiones.</p>

            <button @click="resetFakeNotifications" class="mt-6 text-xs text-teal-600 hover:text-teal-700 font-medium">
                Recargar notificaciones (Demo)
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    Bell as BellIcon,
    Info as InfoIcon,
    CheckCircle as CheckCircleIcon,
    AlertCircle as AlertCircleIcon,
    BellOff as BellSleepIcon
} from 'lucide-vue-next'

interface Notification {
    id: number
    type: 'info' | 'success' | 'warning' | 'default'
    title: string
    message: string
    time: string
}

const initialNotifications: Notification[] = [
    {
        id: 1,
        type: 'info',
        title: 'Nueva funcionalidad',
        message: 'Ahora puedes subir tu propia foto de perfil desde los ajustes de tu cuenta.',
        time: 'Hace 2 horas',
    },
    {
        id: 2,
        type: 'success',
        title: 'Pago confirmado',
        message: 'Hemos recibido correctamente el pago de tu última sesión.',
        time: 'Ayer',
    },
    {
        id: 3,
        type: 'warning',
        title: 'Recordatorio',
        message: 'Tu próxima sesión es en 48 horas. Revisa que tu cámara y micrófono funcionen correctamente.',
        time: 'Ayer',
    }
]

const notifications = ref<Notification[]>([...initialNotifications])

const clearAll = () => {
    notifications.value = []
}

const resetFakeNotifications = () => {
    notifications.value = [...initialNotifications]
}
</script>
