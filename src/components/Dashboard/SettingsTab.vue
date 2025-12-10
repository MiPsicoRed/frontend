<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Profile Settings -->
    <div class="bg-white rounded-xl shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
      <form @submit.prevent="saveSettings" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input v-model="form.name" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input v-model="form.surname" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" disabled
            class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed">
          <p class="mt-1 text-xs text-gray-500">El correo electrónico no se puede cambiar.</p>
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
          <button @click="form.notifications.sessions = !form.notifications.sessions"
            :class="form.notifications.sessions ? 'bg-teal-600' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
            <span :class="form.notifications.sessions ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
          </button>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Nuevos recursos</p>
            <p class="text-sm text-gray-500">Notificaciones sobre nuevos materiales</p>
          </div>
          <button @click="form.notifications.resources = !form.notifications.resources"
            :class="form.notifications.resources ? 'bg-teal-600' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
            <span :class="form.notifications.resources ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
      {{ errorMessage }}
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button @click="saveSettings" :disabled="loading"
        class="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
        {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.module'

const props = defineProps({
  currentUser: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const emit = defineEmits(['save'])

const form = ref({
  name: '',
  surname: '',
  email: '',
  notifications: {
    sessions: true,
    resources: false
  }
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const initForm = () => {
  // Try to get from props
  const user = props.currentUser && Object.keys(props.currentUser).length > 0
    ? props.currentUser
    : {
      username: '',
      usersurname: '',
      email: ''
    }

  form.value.name = (user as any).username || ''
  form.value.surname = (user as any).usersurname || ''
  form.value.email = (user as any).email || ''
}

onMounted(() => {
  initForm()
})

watch(() => props.currentUser, () => {
  initForm()
}, { deep: true })

const saveSettings = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock success
    successMessage.value = 'Perfil actualizado exitosamente (Simulado)'
    emit('save', form.value)

  } catch (error) {
    errorMessage.value = 'Error al actualizar el perfil'
  } finally {
    loading.value = false
  }
}
</script>