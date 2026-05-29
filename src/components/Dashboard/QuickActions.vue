<template>
  <div class="bg-white rounded-[2rem] border border-brand-border p-8 text-left hover:border-brand-sage-border transition-all">
    <h3 class="text-base font-bold text-brand-charcoal mb-5 font-serif">Acciones Rápidas</h3>
    <div class="space-y-3">
      <button @click="activeTab = 'book'" class="w-full flex items-center justify-center px-4 py-3 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all text-xs font-bold cursor-pointer shadow-md shadow-brand-teal/5">
        <Plus class="h-4 w-4 mr-2" />
        Reservar Nueva Sesión
      </button>
      <button class="w-full flex items-center justify-center px-4 py-3 border border-brand-border text-brand-charcoal rounded-full hover:bg-brand-bg transition-all text-xs font-bold cursor-pointer">
        <MessageCircle class="h-4 w-4 mr-2" />
        Contactar Terapeuta
      </button>
    </div>
  </div>

  <div class="bg-white rounded-[2rem] border border-brand-border p-8 text-left hover:border-brand-sage-border transition-all">
    <h3 class="text-base font-bold text-brand-charcoal mb-5 font-serif">Recursos</h3>
    <div class="space-y-3">
      <a href="#" class="block p-3.5 rounded-xl hover:bg-brand-sage-bg/30 border border-transparent hover:border-brand-sage-border/50 transition-colors">
        <div class="flex items-center">
          <FileText class="h-4.5 w-4.5 text-brand-teal mr-3" />
          <div>
            <p class="text-xs font-bold text-brand-charcoal">Ejercicios de Relajación</p>
            <p class="text-[11px] text-brand-cool-gray mt-0.5">Técnicas para el bienestar</p>
          </div>
        </div>
      </a>
      <a href="#" class="block p-3.5 rounded-xl hover:bg-brand-sage-bg/30 border border-transparent hover:border-brand-sage-border/50 transition-colors">
        <div class="flex items-center">
          <BookOpen class="h-4.5 w-4.5 text-brand-teal mr-3" />
          <div>
            <p class="text-xs font-bold text-brand-charcoal">Biblioteca de Recursos</p>
            <p class="text-[11px] text-brand-cool-gray mt-0.5">Artículos y guías</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  Plus, MessageCircle, FileText, BookOpen 
} from 'lucide-vue-next'

const props = defineProps({
  activeTab: String
})

const emit = defineEmits(['update:activeTab'])

const activeTab = computed({
  get: () => props.activeTab,
  set: (value) => emit('update:activeTab', value)
})
</script>