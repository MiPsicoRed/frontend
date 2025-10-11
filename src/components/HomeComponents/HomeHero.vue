<script setup lang="ts">

</script>

<template>
    <section id="home" class="relative overflow-hidden py-20">
        <div
            class="absolute inset-0 bg-[url('/other/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10">
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#f8f3eb]/90 to-[#e8d5c4]/50"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#e8d5c4] rounded-full opacity-20 blur-3xl -mr-48 -mt-48"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#b8d8d8] rounded-full opacity-20 blur-3xl -ml-48 -mb-48">
        </div>
        <div class="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
            <div class="md:w-1/2 mb-10 md:mb-0">
                <div
                    class="inline-block px-3 py-1 bg-[#b8d8d8]/30 text-[#5a7d7c] rounded-full text-sm font-medium mb-4">
                    Terapia online
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                    Reserva <span class="text-[#5a7d7c]">GRATIS</span> tu primera sesión
                </h2>
                <p class="text-lg text-gray-600 mb-8">
                    Agenda tus sesiones en línea con expertos certificados de forma rápida, segura y desde la comodidad
                    de tu
                    hogar. Conecta con profesionales verificados en distintas áreas y recibe atención personalizada sin
                    salir de
                    casa.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="/reservar"
                        class="bg-[#7a9e9f] text-white px-8 py-3 rounded-full text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        Pide tu cita
                    </a>
                    <RouterLink to="/login"
                        class="border border-[#7a9e9f] text-[#5a7d7c] px-8 py-3 rounded-full text-center hover:bg-[#f8f3eb] transition">
                        Inicia sesión
                    </RouterLink>
                </div>
            </div>
            <div class="md:w-1/2 md:pl-10">
                <div class="relative">
                    <div class="absolute -top-4 -left-4 w-24 h-24 bg-[#e8d5c4] rounded-full opacity-70"></div>
                    <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-[#b8d8d8] rounded-full opacity-70"></div>
                    <img src="/other/bram.jpeg" alt="Sesión de terapia online"
                        class="rounded-[2.5rem] shadow-lg w-full relative z-10 h-[500px] object-cover" />
                </div>
            </div>
        </div>
    </section>
</template>