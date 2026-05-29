<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Brain, ShieldAlert } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'click-view', view: string): void
}>()

const router = useRouter()

const handleMySpace = () => {
  router.push('/dashboard')
}
</script>

<template>
  <footer class="bg-stone-900 text-stone-300 py-16 border-t border-stone-850">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <!-- Branding Column -->
        <div class="space-y-4 text-left">
          <div class="flex items-center gap-2 text-white">
            <Brain class="w-6 h-6 text-teal-400" />
            <span class="font-bold font-sans text-lg tracking-tight">MiPsicoRed</span>
          </div>
          <p class="text-stone-400 text-xs leading-relaxed max-w-sm font-sans">
            Plataforma integrada de psicología para conectar a personas con terapeutas certificados bajo soporte de triaje inteligente de IA.
          </p>
        </div>

        <!-- Quick Navigation Links -->
        <div class="space-y-4 text-left">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider font-sans">Enlaces</h4>
          <ul class="space-y-2 text-xs font-sans">
            <li>
              <button @click="emit('click-view', 'home')" class="hover:text-teal-400 bg-transparent border-0 p-0 text-left cursor-pointer text-stone-300">
                Inicio
              </button>
            </li>
            <li>
              <button @click="emit('click-view', 'terapeutas')" class="hover:text-teal-400 bg-transparent border-0 p-0 text-left cursor-pointer text-stone-300">
                Encontrar Terapeuta
              </button>
            </li>
            <li>
              <button @click="emit('click-view', 'asistente')" class="hover:text-teal-400 bg-transparent border-0 p-0 text-left cursor-pointer text-stone-300">
                Derivador IA
              </button>
            </li>
            <li>
              <button @click="handleMySpace" class="hover:text-teal-400 bg-transparent border-0 p-0 text-left cursor-pointer text-stone-300">
                Mi Espacio
              </button>
            </li>
          </ul>
        </div>

        <!-- Security Compliance Column -->
        <div class="space-y-4 text-left">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider font-sans">Garantía Clínica</h4>
          <ul class="space-y-2 text-xs text-stone-400 leading-normal font-sans">
            <li class="flex items-start gap-1">
              <span class="text-teal-400 text-xs shrink-0">✔</span>
              <span>Colegio de Psicólogos validado</span>
            </li>
            <li class="flex items-start gap-1">
              <span class="text-teal-400 text-xs shrink-0">✔</span>
              <span>Estándar HIPAA de protección de datos clínicos</span>
            </li>
          </ul>
        </div>

        <!-- Crisis / Support Line emergency Column -->
        <div class="space-y-4 text-left bg-stone-850 p-4 rounded-2xl border border-stone-800">
          <div class="flex items-center gap-1.5 text-white">
            <ShieldAlert class="w-5 h-5 text-red-500" />
            <span class="text-xs font-black uppercase tracking-wider font-sans">¿Estás en Crisis Súbita?</span>
          </div>
          <p class="text-[10px] text-stone-400 leading-tight font-sans">
            Si experimentas ideas de autolesión o peligro inminente para tu integridad, llama inmediatamente al servicio de emergencias o al fono de contención regional.
          </p>
          <div class="flex gap-2 pt-1 font-mono text-white text-xs font-black">
            <span>Chile: 4141</span>
            <span>•</span>
            <span>España: 024</span>
          </div>
        </div>

      </div>

      <!-- Copy bottom row -->
      <div class="border-t border-stone-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 gap-4">
        <p class="font-sans">© {{ new Date().getFullYear() }} MiPsicoRed. Todos los derechos reservados.</p>
        <div class="flex gap-4 font-sans">
          <a href="#" class="hover:text-stone-300">Términos de Servicio y Consentimiento Clínico Informado</a>
        </div>
      </div>

    </div>
  </footer>
</template>