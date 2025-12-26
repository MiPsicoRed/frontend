<template>
    <div class="bg-white rounded-xl shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Sesiones de Hoy</h3>
        <div class="space-y-4">
            <div v-for="session in todaySessions" :key="session.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <UserIcon class="h-5 w-5 text-teal-600" />
                    </div>
                    <div class="ml-4">
                        <p class="font-medium text-gray-900">{{ session.patientName }}</p>
                        <p class="text-sm text-gray-500">{{ session.session_date ? new
                            Date(session.session_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :
                            '—' }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="todaySessions.length === 0" class="text-center py-8 text-gray-500">
                No hay sesiones programadas para hoy
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User as UserIcon } from 'lucide-vue-next'

defineProps<{
    todaySessions: any[]
}>()
</script>
