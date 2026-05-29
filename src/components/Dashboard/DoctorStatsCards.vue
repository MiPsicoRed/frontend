<template>
  <div class="bg-white border border-brand-border rounded-[2rem] p-6 text-left hover:border-brand-sage-border hover:shadow-xs transition-all">
    <div class="flex items-center">
      <div class="w-11 h-11 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
        <Calendar class="h-5 w-5 text-brand-teal" />
      </div>
      <div class="ml-4">
        <p class="text-[10px] font-black uppercase tracking-wider text-brand-cool-gray">Hoy</p>
        <p class="text-lg font-bold font-serif text-brand-charcoal mt-1">{{ todaySessions.length }}</p>
        <p class="text-[11px] text-brand-muted-teal mt-0.5">Sesiones</p>
      </div>
    </div>
  </div>

  <div class="bg-white border border-brand-border rounded-[2rem] p-6 text-left hover:border-brand-sage-border hover:shadow-xs transition-all">
    <div class="flex items-center">
      <div class="w-11 h-11 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
        <Users class="h-5 w-5 text-brand-teal" />
      </div>
      <div class="ml-4">
        <p class="text-[10px] font-black uppercase tracking-wider text-brand-cool-gray">Pacientes Activos</p>
        <p class="text-lg font-bold font-serif text-brand-charcoal mt-1">{{ stats.activePatients }}</p>
        <p class="text-[11px] text-brand-muted-teal mt-0.5">Este mes</p>
      </div>
    </div>
  </div>

  <div class="bg-white border border-brand-border rounded-[2rem] p-6 text-left hover:border-brand-sage-border hover:shadow-xs transition-all">
    <div class="flex items-center">
      <div class="w-11 h-11 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
        <CheckCircle class="h-5 w-5 text-brand-teal" />
      </div>
      <div class="ml-4">
        <p class="text-[10px] font-black uppercase tracking-wider text-brand-cool-gray">Completadas</p>
        <p class="text-lg font-bold font-serif text-brand-charcoal mt-1">{{ stats.completedSessions }}</p>
        <p class="text-[11px] text-brand-muted-teal mt-0.5">Esta semana</p>
      </div>
    </div>
  </div>

  <div class="bg-white border border-brand-border rounded-[2rem] p-6 text-left hover:border-brand-sage-border hover:shadow-xs transition-all">
    <div class="flex items-center">
      <div class="w-11 h-11 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
        <TrendingUp class="h-5 w-5 text-brand-teal" />
      </div>
      <div class="ml-4">
        <p class="text-[10px] font-black uppercase tracking-wider text-brand-cool-gray">Ingresos</p>
        <p class="text-lg font-bold font-serif text-brand-charcoal mt-1">€{{ stats.monthlyRevenue }}</p>
        <p class="text-[11px] text-brand-muted-teal mt-0.5">Este mes</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Calendar, CheckCircle, Users, TrendingUp
} from 'lucide-vue-next'

const props = defineProps({
  todaySessions: {
    type: Array,
    required: true
  },
  patients: {
    type: Array,
    required: true
  },
  sessions: {
    type: Array,
    required: true
  },
  professional: {
    type: Object,
    required: true
  }
})

const loading = ref(false)

const stats = computed(() => ({
  activePatients: props.patients.length,
  completedSessions: props.sessions.filter((s: any) => s.session_status_id == 2).length,
  monthlyRevenue: props.sessions
    .filter((s: any) => s.session_status_id == 2)
    .reduce((total: number, s: any) => total + (Number(props.professional.hourly_rate) || 0), 0)
}))
</script>