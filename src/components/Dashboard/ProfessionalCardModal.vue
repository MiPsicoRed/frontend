<template>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isOpen" @click.self="close"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div
                class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">

                <!-- Header / Image Area -->
                <div class="relative h-32 bg-gradient-to-r from-teal-500 to-teal-600">
                    <button @click="close"
                        class="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors">
                        <X class="h-5 w-5" />
                    </button>

                    <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <div
                            class="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                            <img v-if="professionalImage" :src="professionalImage" alt="Professional"
                                class="w-full h-full object-cover" />
                            <div v-else
                                class="w-full h-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-3xl">
                                {{ professionalName ? professionalName.charAt(0) : '?' }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="pt-16 pb-8 px-6 text-center">
                    <h2 class="text-2xl font-bold text-gray-900 mb-1">{{ professionalName }}</h2>
                    <p class="text-teal-600 font-medium text-sm mb-4">Psicólogo Profesional</p>

                    <div v-if="loading" class="py-8 flex justify-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                    </div>

                    <div v-else-if="details" class="space-y-6">
                        <!-- Bio -->
                        <p class="text-gray-600 text-sm leading-relaxed">
                            {{ details.bio || 'Sin descripción disponible.' }}
                        </p>

                        <!-- Stats / Info Grid -->
                        <div class="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4">
                            <div class="text-center">
                                <p class="text-xs text-gray-400 uppercase tracking-wide">Experiencia</p>
                                <p class="font-bold text-gray-900">{{ details.experience_years || 0 }} años</p>
                            </div>
                            <div class="text-center">
                                <p class="text-xs text-gray-400 uppercase tracking-wide">Tarifa</p>
                                <p class="font-bold text-gray-900">{{ formatPrice(details.hourly_rate) }} /h</p>
                            </div>
                        </div>

                        <!-- Education -->
                        <div v-if="details.education" class="text-left bg-gray-50 p-4 rounded-xl">
                            <h4 class="text-xs font-bold text-gray-900 uppercase mb-2 flex items-center gap-2">
                                <GraduationCap class="h-4 w-4 text-teal-600" />
                                Formación
                            </h4>
                            <p class="text-sm text-gray-600">{{ details.education }}</p>
                        </div>

                        <!-- Action Button -->
                        <button @click="bookSession"
                            class="w-full bg-teal-600 text-white py-3 px-6 rounded-xl hover:bg-teal-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <Calendar class="h-5 w-5" />
                            Reservar Sesión
                        </button>
                    </div>

                    <div v-else class="text-gray-500 py-4">
                        No se pudo cargar la información.
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { X, Calendar, GraduationCap } from 'lucide-vue-next'
import ProfessionalService, { type Professional } from '@/services/professional/professional.service'

const props = defineProps<{
    isOpen: boolean
    professionalId: string
    professionalName: string
    professionalImage?: string
}>()

const emit = defineEmits(['close', 'book'])

const loading = ref(false)
const details = ref<Professional | null>(null)

const fetchDetails = async () => {
    if (!props.professionalId) return

    loading.value = true
    try {
        const response = await ProfessionalService.readSingle({ professional_id: props.professionalId })
        details.value = response.data || response
    } catch (err) {
        console.error('Error fetching professional details:', err)
    } finally {
        loading.value = false
    }
}

const close = () => {
    emit('close')
}

const bookSession = () => {
    emit('book', props.professionalId)
}

// Watch for opening or ID change to fetch data
watch(() => [props.isOpen, props.professionalId], ([isOpen, newId]) => {
    if (isOpen && newId) {
        fetchDetails()
    }
})

const formatPrice = (price: number | null) => {
    if (price === null) return '--'
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

// Handle click outside to close (simple implementation)
// Note: A proper v-click-outside directive is better, but for now we can use a backdrop click
// The template has a backdrop div, but the click event on it might propagate. 
// Actually, the backdrop div wraps everything. I'll add @click.self="close" to the backdrop.
</script>
