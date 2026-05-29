<script setup lang="ts">
import { CalendarDays, Sparkles, ShieldCheck } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'click-view', view: string): void
}>()
</script>

<template>
  <section class="relative overflow-hidden bg-[#F9FBFA] pt-20 pb-24 border-b border-brand-border">
    
    <!-- Absolute Decorative Blobs -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8F3F1] rounded-full blur-[120px] opacity-70 pointer-events-none -mr-40 -mt-20" />
    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0D5C63]/5 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

    <div class="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Hero Content Left  -->
        <div class="lg:col-span-7 space-y-8 text-left">
          <div class="inline-flex items-center gap-2 bg-brand-sage-bg text-brand-teal px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 w-fit">
            <span class="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse"></span>
            Terapeutas colegiados disponibles ahora
          </div>

          <h1 class="text-5xl sm:text-6xl md:text-[64px] font-serif leading-[1.05] text-[#1A202C] font-semibold tracking-tight">
            Bienestar mental a tu <br />
            <span class="text-brand-teal italic">propio ritmo.</span>
          </h1>

          <p class="text-lg text-[#526663] leading-relaxed max-w-xl font-sans">
            Conectamos a personas con psicólogos colegiados a través de una plataforma segura, humana y profesional. Tu primera sesión de orientación diagnóstica es gratuita.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              @click="emit('click-view', 'terapeutas')"
              class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-teal text-white rounded-full font-bold text-sm shadow-md shadow-brand-teal/10 hover:bg-brand-teal-hover active:scale-98 transition-all cursor-pointer border-0"
            >
              <CalendarDays class="w-4 h-4" />
              Encontrar mi Terapeuta
            </button>
            <button
              @click="emit('click-view', 'asistente')"
              class="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F4F7F6] text-[#0D5C63] font-bold text-sm rounded-full border border-[#D1E2E0] hover:bg-[#e9f0ee] active:scale-98 transition-all cursor-pointer"
            >
              <Sparkles class="w-4 h-4 text-brand-teal" />
              Asistente de Triaje IA
            </button>
          </div>

          <!-- Micro Highlights styled as minimalist stat boxes -->
          <div class="flex flex-wrap gap-5 pt-8 border-t border-brand-border">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-brand-border flex flex-col gap-1 w-52 text-left">
              <span class="text-3xl font-bold text-brand-teal font-sans">2.4k+</span>
              <span class="text-xs text-brand-cool-gray font-medium uppercase tracking-wider font-sans">Pacientes activos</span>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-brand-border flex flex-col gap-1 w-52 text-left">
              <span class="text-3xl font-bold text-brand-teal font-sans">4.9/5</span>
              <span class="text-xs text-brand-cool-gray font-medium uppercase tracking-wider font-sans">Valoración media</span>
            </div>
          </div>

        </div>

        <!-- Right Hero Visual Area - Layered Therapist Card components resembling the Design HTML list -->
        <div class="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
          
          <div class="relative w-full max-w-[360px] py-8">
            
            <!-- Doctor Card 1 -->
            <div class="bg-white p-6 rounded-[2rem] shadow-xl shadow-brand-teal/5 flex items-center gap-5 border border-brand-border transform hover:scale-[1.02] transition-transform duration-300">
              <div class="w-16 h-16 bg-[#D1E2E0] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150" alt="Dra. Clara Méndez" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col text-left">
                <span class="font-bold text-brand-charcoal text-base font-sans">Dra. Clara Méndez</span>
                <span class="text-[11px] text-brand-teal font-bold uppercase tracking-tight font-sans">Psicología Clínica</span>
                <div class="flex gap-0.5 mt-2">
                  <div v-for="s in 5" :key="s" class="w-2.5 h-2.5 bg-[#F2C94C] rounded-sm" />
                </div>
              </div>
            </div>

            <!-- Doctor Card 2 - Offset visually -->
            <div class="bg-white p-6 rounded-[2rem] shadow-xl shadow-brand-teal/5 flex items-center gap-5 border border-brand-border translate-x-6 sm:translate-x-8 my-6 transform hover:scale-[1.02] transition-transform duration-300">
              <div class="w-16 h-16 bg-[#F8E9E2] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150" alt="Dr. Julián Sastre" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col text-left">
                <span class="font-bold text-brand-charcoal text-base font-sans">Dr. Julián Sastre</span>
                <span class="text-[11px] text-brand-teal font-bold uppercase tracking-tight font-sans">Terapia Cognitiva</span>
                <div class="flex gap-0.5 mt-2">
                  <div v-for="s in 5" :key="s" class="w-2.5 h-2.5 bg-[#F2C94C] rounded-sm" />
                </div>
              </div>
            </div>

            <!-- Doctor Card 3 -->
            <div class="bg-white p-6 rounded-[2rem] shadow-xl shadow-brand-teal/5 flex items-center gap-5 border border-brand-border transform hover:scale-[1.02] transition-transform duration-300">
              <div class="w-16 h-16 bg-[#E2E8F8] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150" alt="Lic. Martina Val" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col text-left">
                <span class="font-bold text-brand-charcoal text-base font-sans">Lic. Martina Val</span>
                <span class="text-[11px] text-brand-teal font-bold uppercase tracking-tight font-sans">Ansiedad y Estrés</span>
                <div class="flex gap-0.5 mt-2">
                  <div v-for="s in 4" :key="s" class="w-2.5 h-2.5 bg-[#F2C94C] rounded-sm" />
                  <div class="w-2.5 h-2.5 bg-gray-250 rounded-sm" />
                </div>
              </div>
            </div>

            <!-- Absolute micro indicator -->
            <div class="absolute top-1/2 -right-8 -translate-y-1/2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-brand-border shadow-lg flex items-center gap-2 pointer-events-none">
              <ShieldCheck class="w-4 h-4 text-brand-teal" />
              <span class="text-[10px] font-bold text-brand-charcoal uppercase tracking-wider font-sans">HIPAA Compliant</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
</template>