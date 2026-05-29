<template>
    <nav class="-mb-px flex space-x-8">
        <button @click="activeTab = 'dashboard'"
            :class="activeTab === 'dashboard' ? 'border-brand-teal text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal hover:border-brand-sage-border'"
            class="whitespace-nowrap py-3.5 px-1 border-b-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer">
            Panel Principal
        </button>
        <button @click="activeTab = 'sessions'"
            :class="activeTab === 'sessions' ? 'border-brand-teal text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal hover:border-brand-sage-border'"
            class="whitespace-nowrap py-3.5 px-1 border-b-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer">
            Mis Sesiones
        </button>
        <button @click="activeTab = 'book'"
            :class="activeTab === 'book' ? 'border-brand-teal text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal hover:border-brand-sage-border'"
            class="whitespace-nowrap py-3.5 px-1 border-b-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer">
            Reservar Cita
        </button>
        <button @click="activeTab = 'settings'"
            :class="activeTab === 'settings' ? 'border-brand-teal text-brand-teal font-extrabold' : 'border-transparent text-brand-cool-gray hover:text-brand-charcoal hover:border-brand-sage-border'"
            class="whitespace-nowrap py-3.5 px-1 border-b-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer">
            Configuración
        </button>
    </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    activeTab: String
})

const emit = defineEmits(['update:activeTab'])

const activeTab = computed({
    get: () => props.activeTab,
    set: (value) => emit('update:activeTab', value)
})
</script>