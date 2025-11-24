<template>
  <div class="bg-white rounded-xl shadow-sm border">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Mis Sesiones</h2>
        <div class="flex space-x-2">
          <button 
            @click="sessionFilter = 'upcoming'"
            :class="sessionFilter === 'upcoming' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
            class="px-3 py-1 rounded-md text-sm font-medium"
          >
            Próximas
          </button>
          <button 
            @click="sessionFilter = 'completed'"
            :class="sessionFilter === 'completed' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:text-gray-700'"
            class="px-3 py-1 rounded-md text-sm font-medium"
          >
            Completadas
          </button>
        </div>
      </div>
    </div>

    <div class="p-6">
      <div class="space-y-4">
        <div v-for="session in filteredSessions" :key="session.id" class="border rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <User class="h-6 w-6 text-teal-600" />
              </div>
              <div class="ml-4">
                <h3 class="font-medium text-gray-900">{{ session.therapist }}</h3>
                <p class="text-sm text-gray-500">{{ session.specialty }}</p>
                <p class="text-sm text-gray-500">{{ session.date }} - {{ session.time }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span :class="getStatusClass(session.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ session.status }}
              </span>
              <button v-if="session.status === 'Próxima'" class="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Unirse
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <MoreVertical class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  User,
  MoreVertical
} from 'lucide-vue-next'

const props = defineProps({
  allSessions: {
    type: Array,
    required: true
  },
  sessionFilter: String
})

const emit = defineEmits(['update:sessionFilter'])

const sessionFilter = computed({
  get: () => props.sessionFilter,
  set: (value) => emit('update:sessionFilter', value)
})

const filteredSessions = computed(() => {
  if (sessionFilter.value === 'upcoming') {
    return props.allSessions.filter(session => session.status === 'Próxima')
  } else {
    return props.allSessions.filter(session => session.status === 'Completada')
  }
})

const getStatusClass = (status) => {
  switch (status) {
    case 'Próxima':
      return 'bg-blue-100 text-blue-800'
    case 'Completada':
      return 'bg-green-100 text-green-800'
    case 'Cancelada':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>