<template>
    <div class="bg-white rounded-[2rem] border border-brand-border p-8 h-full flex flex-col shadow-xs text-left">
        <div class="flex items-center justify-between mb-6 gap-2">
            <h3 class="text-base font-bold text-brand-charcoal flex items-center gap-2 font-serif">
                <BellIcon class="w-4.5 h-4.5 text-brand-teal" />
                Notificaciones
            </h3>
            <button v-if="notifications.length > 0" @click="clearAll"
                class="text-xs font-bold text-brand-cool-gray hover:text-brand-teal hover:underline transition-colors cursor-pointer shrink-0">
                Marcar leídas
            </button>
        </div>

        <!-- Notifications List -->
        <div v-if="notifications.length > 0" class="flex-1 overflow-y-auto pr-1 space-y-4">
            <div v-for="notification in notifications" :key="notification.id"
                class="p-4 rounded-2xl flex gap-4 items-start transition-colors border" :class="{
                    'bg-brand-sage-bg/30 border-brand-sage-border': notification.type === 'info',
                    'bg-emerald-50/40 border-emerald-200': notification.type === 'success',
                    'bg-amber-50/40 border-amber-200': notification.type === 'warning',
                    'bg-brand-bg border-brand-border': notification.type === 'default'
                }">
                <!-- Icon based on type -->
                <div class="mt-0.5 flex-shrink-0">
                    <InfoIcon v-if="notification.type === 'info'" class="w-4 h-4 text-brand-teal" />
                    <CheckCircleIcon v-else-if="notification.type === 'success'" class="w-4 h-4 text-emerald-600" />
                    <AlertCircleIcon v-else-if="notification.type === 'warning'" class="w-4 h-4 text-amber-600" />
                    <BellIcon v-else class="w-4 h-4 text-brand-cool-gray" />
                </div>

                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                        <h4 class="text-xs font-bold text-brand-charcoal truncate">{{ notification.title }}</h4>
                        <span class="text-[9.5px] text-brand-cool-gray font-mono whitespace-nowrap">{{ notification.time }}</span>
                    </div>
                    <p class="text-xs text-brand-muted-teal leading-relaxed">{{ notification.message }}</p>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div class="w-14 h-14 bg-brand-sage-bg rounded-full flex items-center justify-center border border-brand-sage-border mb-4">
                <BellSleepIcon class="w-6 h-6 text-brand-teal" />
            </div>
            <h4 class="text-xs font-bold text-brand-charcoal mb-1">No tienes notificaciones</h4>
            <p class="text-xs text-brand-muted-teal leading-relaxed max-w-xs">Te avisaremos cuando haya novedades importantes o recordatorios de tus sesiones.</p>

            <button @click="resetFakeNotifications" class="mt-6 text-xs text-brand-teal hover:text-brand-teal-hover font-bold cursor-pointer transition-colors">
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
