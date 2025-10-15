<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Encabezado -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-800 mb-4">
          Elige Tu Plan de Terapia
        </h2>
        <p class="text-lg text-slate-600 max-w-3xl mx-auto">
          Selecciona el plan perfecto para tu bienestar mental. Todos nuestros planes incluyen acceso a psicólogos certificados y profesionales.
        </p>
      </div>

      <!-- Tarjetas de Precios -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Plan Básico -->
        <div class="bg-white rounded-3xl shadow-lg p-8 relative border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">Plan Básico</h3>
            <p class="text-slate-600 mb-6">Ideal para comenzar tu proceso</p>
            <div class="mb-6">
              <span class="text-4xl font-bold text-slate-800">€{{ planes.basico.precio }}</span>
              <span class="text-slate-600">/mes</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li v-for="caracteristica in planes.basico.caracteristicas" :key="caracteristica" class="flex items-start">
              <CheckIcon class="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              <span class="text-slate-700">{{ caracteristica }}</span>
            </li>
          </ul>

          <button class="w-full bg-slate-800 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-slate-700 transition-colors duration-200 text-lg">
            Comenzar Ahora
          </button>
        </div>

        <!-- Plan Profesional (Más Popular) -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 relative border-2 border-teal-400 hover:shadow-3xl transition-all duration-300 transform scale-105">
          <!-- Badge Más Popular -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              Más Popular
            </span>
          </div>

          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">Plan Profesional</h3>
            <p class="text-slate-600 mb-6">Perfecto para terapia regular</p>
            <div class="mb-6">
              <span class="text-4xl font-bold text-teal-600">€{{ planes.profesional.precio }}</span>
              <span class="text-slate-600">/mes</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li v-for="caracteristica in planes.profesional.caracteristicas" :key="caracteristica" class="flex items-start">
              <CheckIcon class="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              <span class="text-slate-700">{{ caracteristica }}</span>
            </li>
          </ul>

          <button class="w-full bg-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-teal-700 transition-colors duration-200 text-lg">
            Prueba Gratuita 7 Días
          </button>
        </div>

        <!-- Plan Premium -->
        <div class="bg-white rounded-3xl shadow-lg p-8 relative border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">Plan Premium</h3>
            <p class="text-slate-600 mb-6">Atención integral completa</p>
            <div class="mb-6">
              <span class="text-4xl font-bold text-slate-800">€{{ planes.premium.precio }}</span>
              <span class="text-slate-600">/mes</span>
            </div>
          </div>

          <ul class="space-y-4 mb-8">
            <li v-for="caracteristica in planes.premium.caracteristicas" :key="caracteristica" class="flex items-start">
              <CheckIcon class="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              <span class="text-slate-700">{{ caracteristica }}</span>
            </li>
          </ul>

          <button class="w-full bg-slate-800 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-slate-700 transition-colors duration-200 text-lg">
            Contactar Ventas
          </button>
        </div>
      </div>

      <!-- Información Adicional -->
      <div class="text-center mt-16">
        <p class="text-slate-600 mb-6 text-lg">
          Todos los planes incluyen soporte 24/7 y garantía de satisfacción de 30 días
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
          <div class="flex items-center">
            <ShieldCheckIcon class="h-5 w-5 mr-2 text-teal-500" />
            <span>Confidencialidad Garantizada</span>
          </div>
          <div class="flex items-center">
            <LockIcon class="h-5 w-5 mr-2 text-teal-500" />
            <span>Sesiones Seguras</span>
          </div>
          <div class="flex items-center">
            <HeartIcon class="h-5 w-5 mr-2 text-teal-500" />
            <span>Psicólogos Certificados</span>
          </div>
          <div class="flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-teal-500" />
            <span>Horarios Flexibles</span>
          </div>
        </div>
      </div>

      <!-- Sección de Primera Sesión Gratis -->
      <div class="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 text-center text-white">
        <h3 class="text-2xl font-bold mb-4">¿No estás seguro? ¡Prueba tu primera sesión GRATIS!</h3>
        <p class="text-lg mb-6 opacity-90">
          Conoce a nuestros terapeutas y experimenta la calidad de nuestros servicios sin compromiso
        </p>
        <button class="bg-white text-teal-600 py-3 px-8 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
          Reservar Sesión Gratuita
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { CheckIcon, ShieldCheckIcon, LockIcon, HeartIcon, ClockIcon } from 'lucide-vue-next'

const planes = ref({
  basico: {
    precio: 39,
    caracteristicas: [
      '2 sesiones de terapia al mes',
      'Evaluaciones psicológicas básicas',
      'Soporte por email',
      'Acceso a la app móvil',
      'Seguimiento de progreso',
      'Recursos de autoayuda'
    ]
  },
  profesional: {
    precio: 79,
    caracteristicas: [
      '4 sesiones de terapia al mes',
      'Evaluaciones psicológicas completas',
      'Soporte prioritario',
      'Acceso a terapia grupal',
      'Planes de tratamiento personalizados',
      'Intervención en crisis',
      'Sesiones de terapia familiar',
      'Herramientas de mindfulness'
    ]
  },
  premium: {
    precio: 149,
    caracteristicas: [
      'Sesiones de terapia ilimitadas',
      'Programas de terapia especializados',
      'Coordinador de atención dedicado',
      'Consultas psiquiátricas',
      'Soporte de crisis 24/7',
      'Terapia familiar y de pareja',
      'Análisis avanzado de progreso',
      'Protocolos de tratamiento personalizados',
      'Acceso a talleres exclusivos'
    ]
  }
})
</script>