<script setup lang="ts">
import { ref } from 'vue';

const services = ref([
    {
        title: "Terapia Individual",
        description: "Sesiones personalizadas con un terapeuta compasivo adaptadas a tu viaje único y crecimiento personal.",
        icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
        title: "Terapia de Parejas",
        description: "Nutre tu relación en un espacio seguro y guiado donde ambos pueden crecer juntos y sanar.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
        title: "Mindfulness y Alivio del Estrés",
        description: "Aprende técnicas naturales para manejar la ansiedad, reducir el estrés y cultivar la paz interior en tu vida diaria.",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
])
</script>

<template>
    <section id="services" class="bg-[url('/fondo.jpg')] bg-cover bg-center relative overflow-hidden py-16">
        <div class="absolute top-0 right-0 w-64 h-64 bg-[#e8d5c4] rounded-full opacity-30 -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-[#b8d8d8] rounded-full opacity-30 -ml-32 -mb-32"></div>
        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-12">
                <h2 class="text-3xl font-bold text-gray-800 mb-4">Terapias Online Personalizadas Para Tu Bienestar</h2>
                <p class="text-gray-600">
                    Terapias adaptadas a ti: combinamos distintos métodos psicológicos para ofrecer el tratamiento que
                    mejor se
                    ajuste a tus necesidades
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(service, index) in services" :key="index"
                    class="bg-white p-8 rounded-[2rem] shadow-md hover:shadow-xl transition duration-300 border border-[#e8d5c4]/30">
                    <div
                        class="w-16 h-16 bg-gradient-to-br from-[#b8d8d8]/50 to-[#e8d5c4]/50 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#5a7d7c]" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ service.title }}</h3>
                    <p class="text-gray-600">{{ service.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>