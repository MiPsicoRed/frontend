<template>
    <div class="max-w-2xl mx-auto space-y-6">
        <!-- Professional Settings -->
        <div class="bg-white rounded-xl shadow-sm border p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Profesional</h3>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.module'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'
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
