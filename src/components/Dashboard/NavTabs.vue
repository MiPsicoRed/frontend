<template>
    <nav class="-mb-px flex space-x-8">
        <button @click="activeTab = 'dashboard'"
            :class="activeTab === 'dashboard' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
            Panel Principal
        </button>
        <button @click="activeTab = 'sessions'"
            :class="activeTab === 'sessions' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
            Mis Sesiones
        </button>
        <button @click="activeTab = 'book'"
            :class="activeTab === 'book' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
            Reservar Cita
        </button>
        <button @click="activeTab = 'settings'"
            :class="activeTab === 'settings' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
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