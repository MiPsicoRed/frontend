<template>
    <div class="bg-white rounded-[2rem] border border-brand-border shadow-xs text-left">
        <div class="p-8 border-b border-brand-border">
            <h2 class="text-lg font-bold font-serif text-brand-dark-text">Gestión de Pacientes</h2>
        </div>

        <div class="p-8">
            <!-- Search Bar -->
            <div class="mb-6">
                <div class="relative">
                    <Search class="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-teal" />
                    <input v-model="patientSearch" type="text" placeholder="Buscar pacientes..."
                        class="w-full pl-10 pr-4 py-2.5 border border-brand-border rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-brand-charcoal text-xs font-bold bg-[#F9FBFA]">
                </div>
            </div>

            <!-- Patients List -->
            <div class="space-y-4">
                <div v-for="patient in filteredPatients" :key="patient.id" class="p-5 bg-brand-bg rounded-2xl border border-brand-border hover:border-brand-sage-border transition-all">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-11 h-11 bg-brand-sage-bg border border-brand-sage-border rounded-full flex items-center justify-center shrink-0">
                                <UserIcon class="h-5 w-5 text-brand-teal" />
                            </div>
                            <div class="ml-4 text-left">
                                <h3 class="text-xs font-bold text-brand-charcoal">{{ patient.name || `Patient ${patient.id?.substring(0, 8)}` }}</h3>
                                <p class="text-[10px] text-brand-cool-gray mt-1 font-mono">ID: {{ patient.id }}</p>
                                <div class="flex items-center mt-2.5">
                                    <span class="text-[11px] text-brand-muted-teal flex items-center font-medium">
                                        <Calendar class="h-3.5 w-3.5 text-brand-teal mr-1.5" />
                                        Creado: {{ new Date(patient.created_at).toLocaleDateString() }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="filteredPatients.length === 0" class="text-center py-12 text-brand-cool-gray text-xs font-medium">
                    No hay pacientes disponibles.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, User as UserIcon, Calendar } from 'lucide-vue-next'
import { type Patient } from '@/services/patient/patient.service'

interface EnrichedPatient extends Patient {
    name?: string
}

const props = defineProps<{
    patients: EnrichedPatient[]
}>()

const patientSearch = ref('')

const filteredPatients = computed(() => {
    if (!patientSearch.value) return props.patients
    return props.patients.filter(patient =>
        (patient as any).id?.toLowerCase().includes(patientSearch.value.toLowerCase())
    )
})
</script>
