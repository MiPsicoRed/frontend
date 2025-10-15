<template>
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">¡Hola, {{ profile?.first_name }}!</h2>
            <p class="text-gray-600">Bienvenido a tu panel de terapia online</p>
        </div>
        <div class="hidden md:block">
            <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <Heart class="h-8 w-8 text-teal-600" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { 
  Heart
} from 'lucide-vue-next'
const props = defineProps({
    profile: Object
})
</script>