<template>
  <div class="bg-white rounded-xl shadow-sm border p-6">
    <div class="flex items-center">
      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Calendar class="h-6 w-6 text-blue-600" />
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">Hoy</p>
        <p class="text-2xl font-bold text-gray-900">{{ todaySessions.length }}</p>
        <p class="text-sm text-gray-500">Sesiones</p>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border p-6">
    <div class="flex items-center">
      <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
        <Users class="h-6 w-6 text-green-600" />
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">Pacientes Activos</p>
        <p class="text-2xl font-bold text-gray-900">{{ stats.activePatients }}</p>
        <p class="text-sm text-gray-500">Este mes</p>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border p-6">
    <div class="flex items-center">
      <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
        <CheckCircle class="h-6 w-6 text-purple-600" />
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">Completadas</p>
        <p class="text-2xl font-bold text-gray-900">{{ stats.completedSessions }}</p>
        <p class="text-sm text-gray-500">Esta semana</p>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border p-6">
    <div class="flex items-center">
      <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
        <TrendingUp class="h-6 w-6 text-yellow-600" />
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">Ingresos</p>
        <p class="text-2xl font-bold text-gray-900">€{{ stats.monthlyRevenue }}</p>
        <p class="text-sm text-gray-500">Este mes</p>
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