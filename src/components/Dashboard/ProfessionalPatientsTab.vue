<template>
    <div class="bg-white rounded-xl shadow-sm border">
        <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Gestión de Pacientes</h2>
        </div>

        <div class="p-6">
            <!-- Search Bar -->
            <div class="mb-6">
                <div class="relative">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input v-model="patientSearch" type="text" placeholder="Buscar pacientes..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                </div>
            </div>

            <!-- Patients List -->
            <div class="space-y-4">
                <div v-for="patient in filteredPatients" :key="patient.id" class="border rounded-lg p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <UserIcon class="h-6 w-6 text-blue-600" />
                            </div>
                            <div class="ml-4">
                                <h3 class="font-medium text-gray-900">{{ patient.name || `Patient
                                    ${patient.id?.substring(0, 8)}` }}</h3>
                                <p class="text-sm text-gray-500">ID: {{ patient.id }}</p>
                                <div class="flex items-center mt-2 space-x-4">
                                    <span class="text-sm text-gray-600">
                                        <Calendar class="h-4 w-4 inline mr-1" />
                                        Creado: {{ new Date(patient.created_at).toLocaleDateString() }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="filteredPatients.length === 0" class="text-center py-8 text-gray-500">
                    No hay pacientes disponibles
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
