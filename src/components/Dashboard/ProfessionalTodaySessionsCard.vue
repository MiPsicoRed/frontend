<template>
    <div class="bg-white rounded-[2rem] border border-brand-border p-8 hover:border-brand-sage-border hover:shadow-xs transition-all text-left">
        <h3 class="text-base font-bold font-serif text-brand-charcoal mb-6">Sesiones de Hoy</h3>
        <div class="space-y-3">
            <div v-for="session in todaySessions" :key="session.id"
                class="flex items-center justify-between p-4 bg-[#F9FBFA] border border-brand-border hover:border-brand-sage-border rounded-xl transition-all">
                <div class="flex items-center">
                    <div class="w-9 h-9 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
                        <UserIcon class="h-4.5 w-4.5 text-brand-teal" />
                    </div>
                    <div class="ml-3">
                        <p class="text-xs font-bold text-brand-charcoal">{{ session.patientName }}</p>
                        <p class="text-[11px] text-brand-cool-gray mt-0.5">
                            Hora: {{ session.session_date ? new Date(session.session_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—' }}
                        </p>
                    </div>
                </div>
                <JoinMeetButton :session="session" />
            </div>
            <div v-if="todaySessions.length === 0" class="text-center py-8 text-xs text-brand-cool-gray">
                No hay sesiones programadas para hoy
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User as UserIcon } from 'lucide-vue-next'
import JoinMeetButton from './JoinMeetButton.vue'

defineProps<{
    todaySessions: any[]
}>()
</script>
