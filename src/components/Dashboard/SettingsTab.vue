<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Profile Settings -->
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
      <form class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input 
              v-model="localSettings.name" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              disabled
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="localSettings.email" 
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input 
            v-model="localSettings.phone" 
            type="tel" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
        </div>
      </form>
    </div>

    <!-- Notification Settings -->
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Notificaciones</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Recordatorios de sesión</p>
            <p class="text-sm text-gray-500">Recibe recordatorios antes de tus sesiones</p>
          </div>
          <button 
            @click="localSettings.notifications.sessions = !localSettings.notifications.sessions"
            :class="localSettings.notifications.sessions ? 'bg-teal-600' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          >
            <span 
              :class="localSettings.notifications.sessions ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            ></span>
          </button>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Nuevos recursos</p>
            <p class="text-sm text-gray-500">Notificaciones sobre nuevos materiales</p>
          </div>
          <button 
            @click="localSettings.notifications.resources = !localSettings.notifications.resources"
            :class="localSettings.notifications.resources ? 'bg-teal-600' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          >
            <span 
              :class="localSettings.notifications.resources ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            ></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button 
        @click="handleSave"
        class="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium"
      >
        Guardar Cambios
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  currentUser: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save'])

const localSettings = reactive({
  name: props.currentUser?.data?.user?.user_metadata?.first_name + ' ' + props.currentUser?.data?.user?.user_metadata?.last_name || '',
  email: props.currentUser?.data?.user?.email || '',
  phone: props.currentUser?.data?.user?.user_metadata?.phone || '',
  notifications: {
    sessions: true,
    resources: false
  }
})

const handleSave = () => {
  emit('save', localSettings)
}
</script>