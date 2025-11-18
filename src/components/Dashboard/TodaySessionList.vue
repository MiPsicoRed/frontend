<template>
  <div class="bg-white rounded-xl shadow-sm border p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Sesiones de Hoy</h3>
      <button @click="activeTab = 'calendar'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
        Ver calendario
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="session in todaySessions" :key="session.id"
        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <User class="h-5 w-5 text-teal-600" />
          </div>
          <div class="ml-4">
            <p class="font-medium text-gray-900">{{ session.patientName }}</p>
            <p class="text-sm text-gray-500">{{ session.time }} - {{ session.type }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span :class="getSessionStatusClass(session.status)"
            class="px-2 py-1 text-xs font-medium rounded-full">
            {{ session.status }}
          </span>
          <button v-if="session.status === 'Próxima'"
            class="text-teal-600 hover:text-teal-700 text-sm font-medium">
            Iniciar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  User
} from 'lucide-vue-next'

const props = defineProps({
  todaySessions: {
    type: Array,
    required: true
  },
  activeTab: String
})

const emit = defineEmits(['update:activeTab'])

const activeTab = computed({
  get: () => props.activeTab,
  set: (value) => emit('update:activeTab', value)
})

const getSessionStatusClass = (status) => {
  switch (status) {
    case 'Próxima':
      return 'bg-blue-100 text-blue-800'
    case 'En Progreso':
      return 'bg-green-100 text-green-800'
    case 'Completada':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>