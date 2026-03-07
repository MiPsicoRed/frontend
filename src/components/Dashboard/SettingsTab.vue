<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <!-- Subtabs Navigation -->
    <div class="border-b border-gray-200 mb-6" v-if="onboardingForm">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          @click="activeSubTab = 'profile'"
          :class="[
            activeSubTab === 'profile'
              ? 'border-teal-500 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm',
          ]"
        >
          Perfil General
        </button>
        <button
          @click="activeSubTab = 'onboarding'"
          :class="[
            activeSubTab === 'onboarding'
              ? 'border-teal-500 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm',
          ]"
        >
          Consentimientos y Registro
        </button>
      </nav>
    </div>

    <!-- Tab Content: Profile -->
    <div v-show="activeSubTab === 'profile'" class="space-y-6">
      <!-- Profile Settings -->
      <div class="bg-white rounded-xl shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>

        <!-- Avatar Upload Section -->
        <div class="mb-6 flex items-center space-x-6">
          <div class="shrink-0 flex items-center justify-center">
            <img
              v-if="profilePictureUrl"
              :src="fullProfilePictureUrl"
              class="h-24 w-24 object-cover rounded-full border border-gray-200"
              alt="Avatar"
            />
            <div
              v-else
              class="h-24 w-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center"
            >
              <UserIcon class="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <div>
            <label class="block">
              <span class="sr-only">Elegir foto de perfil</span>
              <input
                type="file"
                @change="handleFileUpload"
                accept="image/jpeg, image/png, image/webp"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 file:cursor-pointer"
              />
            </label>
            <p class="mt-2 text-xs text-gray-500">PNG, JPG o WEBP (max. 5MB)</p>
          </div>
        </div>

        <form @submit.prevent="saveSettings" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <input
                v-model="form.surname"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
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
            <button
              @click="form.notifications.sessions = !form.notifications.sessions"
              :class="form.notifications.sessions ? 'bg-teal-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            >
              <span
                :class="form.notifications.sessions ? 'translate-x-6' : 'translate-x-1'"
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
              @click="form.notifications.resources = !form.notifications.resources"
              :class="form.notifications.resources ? 'bg-teal-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            >
              <span
                :class="form.notifications.resources ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content: Onboarding -->
    <div v-if="onboardingForm" v-show="activeSubTab === 'onboarding'" class="space-y-6">
      <div class="bg-white rounded-xl shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Información de Registro</h3>
        <div class="space-y-4 text-sm form-grid">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="onboardingForm.birthdate">
              <p class="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</p>
              <p class="px-3 py-2 text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                {{ onboardingForm.birthdate }}
              </p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Motivo de consulta</label>
              <textarea
                v-model="onboardingForm.reason"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
            </div>

            <div v-if="onboardingForm.guardian_name">
              <p class="block text-sm font-medium text-gray-700 mb-1">Nombre Tutor Legal 1</p>
              <p class="px-3 py-2 text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                {{ onboardingForm.guardian_name }}
              </p>
            </div>
            <div v-if="onboardingForm.guardian_id_document">
              <p class="block text-sm font-medium text-gray-700 mb-1">DNI/ID Tutor Legal 1</p>
              <p class="px-3 py-2 text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                {{ onboardingForm.guardian_id_document }}
              </p>
            </div>

            <div v-if="!onboardingForm.is_monoparental && onboardingForm.guardian2_name">
              <p class="block text-sm font-medium text-gray-700 mb-1">Nombre Tutor Legal 2</p>
              <p class="px-3 py-2 text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                {{ onboardingForm.guardian2_name }}
              </p>
            </div>
            <div v-if="!onboardingForm.is_monoparental && onboardingForm.guardian2_id_document">
              <p class="block text-sm font-medium text-gray-700 mb-1">DNI/ID Tutor Legal 2</p>
              <p class="px-3 py-2 text-gray-600 bg-gray-50 rounded-lg border border-gray-200">
                {{ onboardingForm.guardian2_id_document }}
              </p>
            </div>
          </div>

          <!-- Signatures (Read-Only as they require the canvas pad to re-sign easily) -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6" v-if="onboardingForm.signature">
            <div>
              <p class="block text-sm font-medium text-gray-700 mb-1">Firma Tutor Legal 1</p>
              <div class="border border-gray-300 rounded-lg p-2 bg-gray-50 flex justify-center">
                <img
                  :src="onboardingForm.signature"
                  class="max-h-32 object-contain"
                  alt="Firma Tutor 1"
                />
              </div>
              <p class="text-xs text-gray-500 mt-1">La firma no se puede modificar por aquí.</p>
            </div>
            <div v-if="onboardingForm.signature2">
              <p class="block text-sm font-medium text-gray-700 mb-1">Firma Tutor Legal 2</p>
              <div class="border border-gray-300 rounded-lg p-2 bg-gray-50 flex justify-center">
                <img
                  :src="onboardingForm.signature2"
                  class="max-h-32 object-contain"
                  alt="Firma Tutor 2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
    >
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
    >
      {{ errorMessage }}
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        :disabled="loading"
        class="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import UserService from '@/services/user/user.service'
import { User as UserIcon } from 'lucide-vue-next'

const props = defineProps({
  currentUser: {
    type: Object,
    required: false,
    default: () => ({}),
  },
})

const emit = defineEmits(['save'])

const activeSubTab = ref('profile')

const form = ref({
  name: '',
  surname: '',
  email: '',
  notifications: {
    sessions: true,
    resources: false,
  },
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const profilePictureUrl = ref('')
const onboardingForm = ref<any>(null)

const fullProfilePictureUrl = computed(() => {
  if (!profilePictureUrl.value) return ''
  const base = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3001/api/user/'
  const appBaseUrl = base.split('/api/')[0] // Gets the http://localhost:3001
  return `${appBaseUrl}${profilePictureUrl.value}`
})

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0]
    if (!selectedFile) return

    // Auto upload instantly
    loading.value = true
    successMessage.value = ''
    errorMessage.value = ''

    try {
      const url = await UserService.uploadProfilePicture(selectedFile)
      profilePictureUrl.value = url
      successMessage.value = 'Foto de perfil actualizada exitosamente'
    } catch (error) {
      console.error('Error uploading profile picture:', error)
      errorMessage.value = 'Error al subir la foto de perfil'
    } finally {
      loading.value = false
    }
  }
}

const initForm = () => {
  // Try to get from props
  const user =
    props.currentUser && Object.keys(props.currentUser).length > 0
      ? props.currentUser
      : {
          username: '',
          usersurname: '',
          email: '',
        }

  form.value.name = (user as any).username || ''
  form.value.surname = (user as any).usersurname || ''
  form.value.email = (user as any).email || ''
  profilePictureUrl.value = (user as any).profile_picture_url || ''

  if ((user as any).onboarding_info) {
    onboardingForm.value = JSON.parse(JSON.stringify((user as any).onboarding_info))
  } else {
    onboardingForm.value = null
  }
}

onMounted(() => {
  initForm()
})

watch(
  () => props.currentUser,
  () => {
    initForm()
  },
  { deep: true },
)

const saveSettings = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // If onboarding data is present, update the backend onboarding first
    if (onboardingForm.value) {
      // Enforce basic API structure
      const onboardPayload = {
        user_id: onboardingForm.value.user_id,
        user_type: onboardingForm.value.user_type || 'minor',
        full_name: onboardingForm.value.full_name || form.value.name + ' ' + form.value.surname,
        phone: onboardingForm.value.phone || '',
        birthdate: onboardingForm.value.birthdate || null,
        reason: onboardingForm.value.reason || '',
        experience: onboardingForm.value.experience || '',
        is_monoparental: onboardingForm.value.is_monoparental,
        guardian_name: onboardingForm.value.guardian_name || null,
        guardian_id_document: onboardingForm.value.guardian_id_document || null,
        signature: onboardingForm.value.signature || null,
        guardian_2_name: onboardingForm.value.guardian2_name || null,
        guardian_2_id_document: onboardingForm.value.guardian2_id_document || null,
        signature_2: onboardingForm.value.signature2 || null,
      }
      await UserService.userOnboarded(onboardPayload)
    }

    // Simulate standard generic API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock success
    successMessage.value = 'Configuración y Registro actualizados exitosamente.'
    emit('save', form.value)
  } catch (error) {
    errorMessage.value = 'Error al actualizar el perfil'
  } finally {
    loading.value = false
  }
}
</script>
