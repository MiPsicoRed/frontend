<script setup lang="ts">
import { ref } from 'vue';

const therapists = ref([
    {
        name: "Dra. Sara Jiménez",
        specialty: "Psicóloga Holística",
        bio: "Especializada en ansiedad, depresión y recuperación de traumas con un enfoque en la conexión mente-cuerpo y la sanación natural.",
        image: "/other/placeholder.svg?height=300&width=300",
    },
    {
        name: "Dr. Miguel Chen",
        specialty: "Guía de Relaciones",
        bio: "Experto en terapia de parejas, dinámicas familiares y crecimiento interpersonal a través de la comunicación compasiva.",
        image: "/other/placeholder.svg?height=300&width=300",
    },
    {
        name: "Dra. Luisa Rodríguez",
        specialty: "Practicante de Mindfulness",
        bio: "Especializada en terapia cognitiva basada en mindfulness para ansiedad, manejo del estrés y transformación personal.",
        image: "/other/placeholder.svg?height=300&width=300",
    },
])
</script>

<template>
    <section id="terapeutas" class="py-16 bg-[url('/planta1.jpg')] bg-cover bg-center h-[65vh]">
        <div class="container mx-auto px-4">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Conoce a nuestros psicológicos certificados</h2>
                <p class="text-gray-600">
                    Conoce a nuestro equipo de terapeutas experimentados dedicados a apoyar tu viaje de bienestar
                    mental.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(therapist, index) in therapists" :key="index"
                    class="bg-white p-6 rounded-[2rem] shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                    <div class="relative mb-6">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-[#e8d5c4]/70 to-[#b8d8d8]/50 rounded-2xl transform rotate-3">
                        </div>
                        <img :src="therapist.image" :alt="therapist.name"
                            class="w-full h-64 object-cover rounded-[1.5rem] relative z-10" />
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ therapist.name }}</h3>
                    <p class="text-[#5a7d7c] mb-3">{{ therapist.specialty }}</p>
                    <p class="text-gray-600 mb-4">{{ therapist.bio }}</p>
                    <RouterLink to="/reservar"
                        class="text-[#5a7d7c] hover:text-[#7a9e9f] font-medium inline-flex items-center">
                        Conecta con {{ therapist.name.split(" ")[0] }}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </RouterLink>
                </div>
            </div>
            <div class="w-full flex justify-center container mx-auto px-4 mt-8">
                <a href="#book"
                    class="bg-[#7a9e9f] text-white text-xl px-8 py-2 mt-8 rounded-full text-center hover:shadow-lg transition">
                    Conoce a todos nuestros terapeutas
                </a>
            </div>
        </div>
    </section>
</template>