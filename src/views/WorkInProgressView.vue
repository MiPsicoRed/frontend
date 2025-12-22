<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div
                class="absolute top-10 left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob">
            </div>
            <div
                class="absolute top-10 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000">
            </div>
            <div
                class="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000">
            </div>
        </div>

        <div class="relative z-10 text-center max-w-2xl mx-auto">
            <!-- Icon/Illustration -->
            <div class="mb-8 flex justify-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-teal-100 rounded-full animate-ping opacity-20"></div>
                    <div class="bg-white p-6 rounded-full shadow-xl border border-gray-100 relative">
                        <img src="/logo.svg" alt="MiPsicoPito Logo" class="w-16 h-16" />
                    </div>
                    <!-- Floating tools -->
                    <Wrench class="w-8 h-8 text-gray-400 absolute -top-2 -right-4 animate-bounce"
                        style="animation-duration: 3s;" />
                    <Ruler class="w-8 h-8 text-gray-400 absolute -bottom-2 -left-4 animate-bounce"
                        style="animation-duration: 2.5s;" />
                </div>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif tracking-tight">
                Estamos trabajando en ello
            </h1>

            <p class="text-xl text-gray-600 mb-10 leading-relaxed">
                Esta página está actualmente en construcción. Estamos preparando algo increíble para ti.
                <br class="hidden md:block" />
                Vuelve pronto para ver las novedades.
            </p>

            <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button @click="goBack"
                    class="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2">
                    <ArrowLeft class="w-4 h-4" />
                    Volver atrás
                </button>

                <button @click="goHome"
                    class="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                    <Home class="w-4 h-4" />
                    Ir al inicio
                </button>
            </div> -->
        </div>

        <!-- Footer info -->
        <div class="absolute bottom-8 text-center text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} MiPsicoRed. Todos los derechos reservados.
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Hammer, Wrench, Ruler, ArrowLeft, Home } from 'lucide-vue-next'

const router = useRouter()

const goBack = () => {
    router.back()
}

const goHome = () => {
    router.push('/')
}
</script>

<style scoped>
.font-serif {
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }

    33% {
        transform: translate(30px, -50px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}
</style>
