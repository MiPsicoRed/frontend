<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative h-[90vh] overflow-hidden flex flex-col">
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
                <X class="w-6 h-6" />
            </button>

            <div class="mb-4">
                <h2 class="text-xl font-bold">Pago Seguro</h2>
            </div>

            <div id="checkout" class="flex-grow overflow-y-auto">
                <!-- Stripe Checkout is inserted here -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { X } from 'lucide-vue-next'

const props = defineProps<{
    isOpen: boolean
    clientSecret: string
}>()

const emit = defineEmits(['close', 'complete'])
const stripe = ref<Stripe | null>(null)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

watch(() => props.isOpen, async (newValue) => {
    if (newValue && props.clientSecret) {
        await initStripe()
    }
})

const initStripe = async () => {
    const stripeInstance = await stripePromise
    if (!stripeInstance) return

    stripe.value = stripeInstance
    const checkout = await stripeInstance.initEmbeddedCheckout({
        clientSecret: props.clientSecret,
    })

    checkout.mount('#checkout')
}

onMounted(async () => {
    if (props.isOpen && props.clientSecret) {
        await initStripe()
    }
})
</script>
