<script setup lang="ts">
import { Smile, Users, Compass, Leaf, ShieldAlert, Eye } from 'lucide-vue-next'

const services = [
  {
    icon: Smile,
    title: 'Terapia Individual',
    description: 'Supera la ansiedad, depresión, fobias y bloqueos. Diseñado para que reencuentres la tranquilidad y crezcas a nivel personal.',
  },
  {
    icon: Users,
    title: 'Terapia de Pareja y Familiar',
    description: 'Espacios neutros para mejorar la resolución de problemas, resolver dinámicas disfuncionales de convivencia y reconstruir el afecto.',
  },
  {
    icon: Compass,
    title: 'Psicoanálisis y Autoconocimiento',
    description: 'Explora tu subconsciente, repeticiones de patrones y la raíz histórica de tu conducta para lograr cambios profundos y verdaderamente permanentes.',
  },
  {
    icon: Leaf,
    title: 'Mindfulness y Estrés',
    description: 'Integra técnicas orientales cognitivas y de respiración respaldadas científicamente para vivir en el presente libre de fatigas crónicas.',
  },
  {
    icon: ShieldAlert,
    title: 'Terapia del Trauma y Duelo',
    description: 'Procesamiento emocional enfocado (EMDR, ACT) para sanar eventos adversos significativos, pérdidas profundas y reestructurar tu resiliencia.',
  },
  {
    icon: Eye,
    title: 'Psicología Infantil y Adolescente',
    description: 'Diagnósticos especializados de aprendizaje, TDAH, y acompañamiento integrador para regular emociones de los más jóvenes.',
  },
]
</script>

<template>
  <section class="bg-white py-20 border-b border-brand-border">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <p class="font-sans text-xs font-bold uppercase tracking-widest text-brand-teal bg-brand-sage-bg px-3 py-1 rounded-full w-fit mx-auto">
          Terapias Especializadas
        </p>
        <h2 class="text-3xl sm:text-4xl font-serif font-medium text-brand-dark-text tracking-tight">
          Consultas Adaptadas a tu Bienestar
        </h2>
        <p class="text-[#526663] text-sm leading-relaxed font-sans">
          Combinamos metodologías psicológicas avanzadas y científicamente validadas para garantizar que recibes el trato idóneo para tus objetivos reales.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="bg-white p-8 rounded-3xl border border-brand-border hover:border-brand-sage-border hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 transform hover:-translate-y-1 text-left flex flex-col justify-between"
        >
          <div class="space-y-4">
            <div class="w-12 h-12 rounded-xl bg-brand-sage-bg flex items-center justify-center">
              <component :is="service.icon" class="w-6 h-6 text-brand-teal" />
            </div>
            <h3 class="text-[19px] font-bold text-brand-charcoal font-sans tracking-tight">
              {{ service.title }}
            </h3>
            <p class="text-[#526663] text-xs leading-relaxed font-sans">
              {{ service.description }}
            </p>
          </div>

          <div class="pt-5 mt-6 border-t border-brand-border/60 flex items-center justify-between text-[11px] text-brand-teal font-bold uppercase tracking-wider font-sans">
            <span>Consulta en línea</span>
            <span>Duración: 50 min</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>