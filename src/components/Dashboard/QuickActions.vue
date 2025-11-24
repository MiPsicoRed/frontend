<template>
  <div class="bg-white rounded-xl shadow-sm border p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
    <div class="space-y-3">
      <button @click="activeTab = 'book'" class="w-full flex items-center justify-center px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
        <Plus class="h-4 w-4 mr-2" />
        Reservar Nueva Sesión
      </button>
      <button class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
        <MessageCircle class="h-4 w-4 mr-2" />
        Contactar Terapeuta
      </button>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Recursos</h3>
    <div class="space-y-3">
      <a href="#" class="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div class="flex items-center">
          <FileText class="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p class="font-medium text-gray-900">Ejercicios de Relajación</p>
            <p class="text-sm text-gray-500">Técnicas para el bienestar</p>
          </div>
        </div>
      </a>
      <a href="#" class="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div class="flex items-center">
          <BookOpen class="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p class="font-medium text-gray-900">Biblioteca de Recursos</p>
            <p class="text-sm text-gray-500">Artículos y guías</p>
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