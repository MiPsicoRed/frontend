<template>
    <div class="flex items-center justify-between text-left gap-4">
        <div>
            <p class="text-[10px] text-brand-cool-gray font-black uppercase tracking-widest mb-1">{{ currentDate }}</p>
            <h2 class="text-xl font-bold font-serif text-brand-charcoal tracking-tight leading-tight">¡Bienvenido, {{ name }}!</h2>
            <p class="text-brand-muted-teal text-xs leading-relaxed mt-1 font-medium">Tu portal clínico confidencial de salud mental.</p>
        </div>
        <div class="hidden md:block shrink-0">
            <div class="w-12 h-12 bg-brand-sage-bg rounded-2xl flex items-center justify-center border border-brand-sage-border">
                <Heart class="h-5 w-5 text-brand-teal" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { Heart } from 'lucide-vue-next'

const props = defineProps({
    name: String
})

const currentDate = computed(() => {
    return new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
})
</script>