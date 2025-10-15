<template>
    <div class="bg-white rounded-xl shadow-sm border p-6">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Próxima Sesión</p>
                <p class="text-2xl font-bold text-gray-900">{{ props.nextSession.date }}</p>
                <p class="text-sm text-gray-500">{{ props.nextSession.time }}</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border p-6">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Sesiones Completadas</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
                <p class="text-sm text-gray-500">Este mes</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border p-6">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock class="h-6 w-6 text-purple-600" />
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Tiempo Total</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalHours }}h</p>
                <p class="text-sm text-gray-500">En terapia</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { 
    Calendar, CheckCircle, Clock, 
} from 'lucide-vue-next'

const props = defineProps({
    nextSession: {
        type: Object,
    },
    stats: {
        type: Object,
    }
})

console.log("HOLAAAA:", props)
</script>