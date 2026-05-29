<template>
    <div class="bg-white rounded-[2rem] border border-brand-border p-6 text-left hover:border-brand-sage-border transition-all">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-brand-sage-bg rounded-2xl flex items-center justify-center border border-brand-sage-border shrink-0">
                <Calendar class="h-5 w-5 text-brand-teal" />
            </div>
            <div class="ml-4 min-w-0">
                <p class="text-[10px] font-black uppercase tracking-wider text-brand-muted-teal">Próxima Cita</p>
                <p class="text-lg font-black text-brand-charcoal font-serif mt-1 truncate">{{ props.nextSession.date }}</p>
                <p class="text-[11px] text-brand-cool-gray mt-0.5">{{ props.nextSession.time }}</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-[2rem] border border-brand-border p-6 text-left hover:border-brand-sage-border transition-all">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-150 shrink-0">
                <CheckCircle class="h-5 w-5 text-emerald-600" />
            </div>
            <div class="ml-4 min-w-0">
                <p class="text-[10px] font-black uppercase tracking-wider text-brand-muted-teal">Sesiones Completadas</p>
                <p class="text-lg font-black text-brand-charcoal font-serif mt-1 truncate">{{ stats.completed }}</p>
                <p class="text-[11px] text-brand-cool-gray mt-0.5">Este mes</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-[2rem] border border-brand-border p-6 text-left hover:border-brand-sage-border transition-all">
        <div class="flex items-center">
            <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-150 shrink-0">
                <Clock class="h-5 w-5 text-indigo-650" />
            </div>
            <div class="ml-4 min-w-0">
                <p class="text-[10px] font-black uppercase tracking-wider text-brand-muted-teal">Tiempo Total</p>
                <p class="text-lg font-black text-brand-charcoal font-serif mt-1 truncate">{{ stats.totalHours }}h</p>
                <p class="text-[11px] text-brand-cool-gray mt-0.5">En terapia</p>
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