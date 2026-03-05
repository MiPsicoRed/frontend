<template>
    <div class="max-w-2xl mx-auto space-y-6">
        <!-- Professional Settings -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Profesional</h3>

            <!-- Avatar Upload Section -->
            <div class="mb-6 flex items-center space-x-6">
                <div class="shrink-0 flex items-center justify-center">
                    <img v-if="profilePictureUrl" :src="fullProfilePictureUrl" class="h-24 w-24 object-cover rounded-full border border-gray-200" alt="Avatar">
                    <div v-else class="h-24 w-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <UserIcon class="h-10 w-10 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label class="block">
                        <span class="sr-only">Elegir foto de perfil</span>
                        <input type="file" @change="handleFileUpload" accept="image/jpeg, image/png, image/webp"
                            class="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-teal-50 file:text-teal-700
                                hover:file:bg-teal-100 file:cursor-pointer
                            "/>
                    </label>
                    <p class="mt-2 text-xs text-gray-500">PNG, JPG o WEBP (max. 5MB)</p>
                </div>
            </div>

            <form @submit.prevent="saveSettings" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
                    <textarea v-model="professionalForm.bio" rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Cuéntanos sobre ti..."></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Número de Licencia</label>
                        <input v-model="professionalForm.license_number" type="text"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tarifa por Hora ($)</label>
                        <input v-model.number="professionalForm.hourly_rate" type="number" min="0" step="0.01"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Educación</label>
                    <input v-model="professionalForm.education" type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ej: Licenciatura en Psicología, Universidad X">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Años de Experiencia</label>
                        <input v-model.number="professionalForm.experience_years" type="number" min="0"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    </div>
                    <div class="flex items-center pt-6">
                        <label class="flex items-center space-x-3 cursor-pointer">
                            <input v-model="professionalForm.accepts_insurance" type="checkbox"
                                class="form-checkbox h-5 w-5 text-teal-600 rounded focus:ring-teal-500 border-gray-300">
                            <span class="text-sm font-medium text-gray-700">Acepta Seguro Médico</span>
                        </label>
                    </div>
                </div>

                <!-- Success Message -->
                <div v-if="successMessage"
                    class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {{ successMessage }}
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {{ errorMessage }}
                </div>

                <!-- Save Button -->
                <div class="flex justify-end pt-4">
                    <button type="submit" :disabled="loading"
                        class="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
import UserService from '@/services/user/user.service'
import { User as UserIcon } from 'lucide-vue-next'
import type { UpdatePayload } from '@/services/professional/professional.types'

const props = defineProps({
    professional: {
        type: Object as () => Professional | undefined,
        required: false
    }
})

const emit = defineEmits(['save'])
const authStore = useAuthStore()

// Professional Form
const professionalForm = ref<Partial<Professional>>({
    bio: '',
    license_number: '',
    education: '',
    experience_years: 0,
    hourly_rate: 0,
    accepts_insurance: false,
    gender_id: 1, // Default or fetch
    birthdate: new Date() // Default or fetch
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const professionalId = ref<string | null>(null)
const profilePictureUrl = ref('')

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
        if (!selectedFile) return;

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

const fetchProfessionalData = async () => {
    // If passed via props, use it
    if (props.professional) {
        setFormData(props.professional)
        return
    }

    // Otherwise fetch
    if (!authStore.userId) return

    loading.value = true
    try {
        const response = await ProfessionalService.readSingleByUser({ user_id: authStore.userId })
        const professional = response.data || response
        if (professional) {
            setFormData(professional)
        }
    } catch (error) {
        console.error('Error fetching professional data:', error)
    } finally {
        loading.value = false
    }
}

const setFormData = (professional: Professional) => {
    professionalId.value = professional.id
    professionalForm.value = {
        ...professional,
        // Ensure nulls are handled for inputs
        bio: professional.bio || '',
        license_number: professional.license_number || '',
        education: professional.education || '',
        experience_years: professional.experience_years || 0,
        hourly_rate: professional.hourly_rate || 0,
        accepts_insurance: professional.accepts_insurance || false
    }
    // Assume parent sets profile_picture_url via fetching User directly or we only default to empty if not fetched
    profilePictureUrl.value = (professional as any).user?.profile_picture_url || ''
}

onMounted(async () => {
    await fetchProfessionalData()
})

const saveSettings = async () => {
    loading.value = true
    successMessage.value = ''
    errorMessage.value = ''

    try {
        if (professionalId.value) {
            // Update Professional Profile
            const payload: UpdatePayload = {
                id: professionalId.value,
                bio: professionalForm.value.bio || null,
                license_number: professionalForm.value.license_number || null,
                education: professionalForm.value.education || null,
                experience_years: professionalForm.value.experience_years || null,
                hourly_rate: professionalForm.value.hourly_rate || null,
                accepts_insurance: professionalForm.value.accepts_insurance || false,
                // Required fields that shouldn't change here but are needed by type
                gender_id: (professionalForm.value as any).gender_id || 1,
                birthdate: (professionalForm.value as any).birthdate || new Date()
            }

            await ProfessionalService.update(payload)
            successMessage.value = 'Perfil profesional actualizado exitosamente'
            emit('save', professionalForm.value)
        } else {
            errorMessage.value = 'No se encontró el perfil profesional para actualizar.'
        }

    } catch (error) {
        console.error('Error saving settings:', error)
        errorMessage.value = 'Error al guardar los cambios'
    } finally {
        loading.value = false
    }
}
</script>
