<template>
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-30" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-30"
        leave-to-class="opacity-0">
        <div v-if="isOpen" @click.self="close"
            class="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 backdrop-blur-xs p-4">
            <div
                class="bg-white rounded-[2rem] border border-brand-border shadow-lg w-full max-w-md overflow-hidden transform transition-all text-left">

                <!-- Header / Image Area -->
                <div class="relative h-32 bg-brand-sage-bg border-b border-brand-border">
                    <button @click="close"
                        class="absolute top-4 right-4 p-2 bg-white border border-brand-border hover:bg-brand-bg rounded-full text-brand-cool-gray hover:text-brand-charcoal cursor-pointer transition-colors shadow-xs z-10">
                        <X class="h-4 w-4" />
                    </button>

                    <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <div
                            class="w-24 h-24 rounded-full border-4 border-white bg-brand-sage-bg shadow-sm overflow-hidden flex items-center justify-center">
                            <img v-if="professionalImage" :src="professionalImage" alt="Professional"
                                class="w-full h-full object-cover" />
                            <div v-else
                                class="w-full h-full bg-brand-sage-bg flex items-center justify-center text-brand-teal font-bold font-serif text-3xl">
                                {{ professionalName ? professionalName.charAt(0) : '?' }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="pt-16 pb-8 px-8 text-center">
                    <h2 class="text-lg font-bold font-serif text-brand-charcoal mb-1">{{ professionalName }}</h2>
                    <p class="text-brand-teal font-extrabold text-xs uppercase tracking-wider mb-4">Psicólogo Profesional</p>

                    <div v-if="loading" class="py-8 flex justify-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
                    </div>

                    <div v-else-if="details" class="space-y-6">
                        <!-- Bio -->
                        <p class="text-xs text-brand-muted-teal leading-relaxed font-medium">
                            {{ details.bio || 'Sin descripción disponible.' }}
                        </p>

                        <!-- Stats / Info Grid -->
                        <div class="grid grid-cols-2 gap-4 border-t border-b border-brand-border py-4">
                            <div class="text-center">
                                <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">Experiencia</p>
                                <p class="text-xs font-bold text-brand-charcoal">{{ details.experience_years || 0 }} años</p>
                            </div>
                            <div class="text-center">
                                <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-wider">Tarifa</p>
                                <p class="text-xs font-bold text-brand-charcoal">{{ formatPrice(details.hourly_rate) }} /h</p>
                            </div>
                        </div>

                        <!-- Education -->
                        <div v-if="details.education" class="text-left bg-[#F9FBFA] border border-brand-border p-4 rounded-2xl">
                            <h4 class="text-[10px] font-black text-brand-charcoal uppercase tracking-wider mb-2 flex items-center gap-2">
                                <GraduationCap class="h-4 w-4 text-brand-teal" />
                                Formación
                            </h4>
                            <p class="text-xs text-brand-muted-teal font-medium">{{ details.education }}</p>
                        </div>

                        <!-- Action Button -->
                        <button @click="bookSession"
                            class="w-full bg-brand-teal text-white py-3 px-6 rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-teal/5">
                            <Calendar class="h-4 w-4" />
                            Reservar Sesión
                        </button>
                    </div>

                    <div v-else class="text-brand-cool-gray py-4 text-xs font-medium">
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
