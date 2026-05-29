<template>
  <aside class="w-72 shrink-0 bg-white border-r border-brand-border flex flex-col sticky top-0 h-[calc(100vh-57px)] overflow-y-auto">

    <!-- User identity block -->
    <div class="px-6 pt-8 pb-5 border-b border-brand-border">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-full bg-brand-sage-bg border border-brand-sage-border flex items-center justify-center shrink-0 overflow-hidden">
          <img v-if="profilePicture" :src="profilePicture" class="w-full h-full object-cover" alt="Avatar" />
          <UserCircle v-else class="w-6 h-6 text-brand-teal" />
        </div>
        <div class="min-w-0">
          <p class="text-xs font-bold text-brand-charcoal truncate font-serif">{{ name || 'Usuario' }}</p>
          <p class="text-[10px] text-brand-cool-gray font-medium">Paciente</p>
        </div>
      </div>

      <!-- Primary CTA -->
      <button
        @click="activeTab = 'book'"
        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-teal text-white rounded-full hover:bg-brand-teal-hover transition-all active:scale-[0.98] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md shadow-brand-teal/10"
      >
        <CalendarPlus class="w-4 h-4" />
        Reservar Sesión
      </button>
    </div>

    <!-- Navigation links -->
    <nav class="px-4 py-5 flex-1 space-y-1">
      <p class="text-[9px] text-brand-cool-gray font-black uppercase tracking-widest px-3 mb-3">Navegación</p>

      <button
        @click="activeTab = 'dashboard'"
        :class="activeTab === 'dashboard'
          ? 'bg-brand-sage-bg text-brand-teal border border-brand-sage-border font-extrabold'
          : 'text-brand-cool-gray hover:text-brand-charcoal hover:bg-brand-bg border border-transparent'"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
      >
        <LayoutDashboard class="w-4 h-4 shrink-0" />
        Panel Principal
      </button>

      <button
        @click="activeTab = 'sessions'"
        :class="activeTab === 'sessions'
          ? 'bg-brand-sage-bg text-brand-teal border border-brand-sage-border font-extrabold'
          : 'text-brand-cool-gray hover:text-brand-charcoal hover:bg-brand-bg border border-transparent'"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
      >
        <CalendarCheck class="w-4 h-4 shrink-0" />
        Mis Sesiones
      </button>

      <button
        @click="activeTab = 'book'"
        :class="activeTab === 'book'
          ? 'bg-brand-sage-bg text-brand-teal border border-brand-sage-border font-extrabold'
          : 'text-brand-cool-gray hover:text-brand-charcoal hover:bg-brand-bg border border-transparent'"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
      >
        <Plus class="w-4 h-4 shrink-0" />
        Reservar Cita
      </button>

      <button
        @click="activeTab = 'settings'"
        :class="activeTab === 'settings'
          ? 'bg-brand-sage-bg text-brand-teal border border-brand-sage-border font-extrabold'
          : 'text-brand-cool-gray hover:text-brand-charcoal hover:bg-brand-bg border border-transparent'"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
      >
        <Settings class="w-4 h-4 shrink-0" />
        Configuración
      </button>
    </nav>

    <!-- Next session mini-card -->
    <div v-if="nextSession && nextSession.date !== '—'" class="mx-4 mb-4 p-4 bg-brand-sage-bg border border-brand-sage-border rounded-2xl">
      <p class="text-[9px] font-black text-brand-teal uppercase tracking-widest mb-2 flex items-center gap-1.5">
        <Clock class="w-3 h-3" />
        Próxima Sesión
      </p>
      <p class="text-xs font-bold text-brand-charcoal font-serif">{{ nextSession.date }}</p>
      <p class="text-[10px] text-brand-muted-teal mt-0.5">{{ nextSession.time }}</p>
    </div>

    <!-- Resources block -->
    <div class="px-4 pb-6 space-y-1 border-t border-brand-border pt-4">
      <p class="text-[9px] text-brand-cool-gray font-black uppercase tracking-widest px-3 mb-3">Recursos</p>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-brand-cool-gray hover:text-brand-charcoal hover:bg-brand-bg border border-transparent transition-all cursor-pointer">
        <FileText class="w-4 h-4 shrink-0" />
        Ejercicios de Relajación
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-brand-cool-gray hover:text-brand-charcoal hover:bg-brand-bg border border-transparent transition-all cursor-pointer">
        <BookOpen class="w-4 h-4 shrink-0" />
        Biblioteca de Recursos
      </a>
    </div>

  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  UserCircle,
  CalendarPlus,
  CalendarCheck,
  LayoutDashboard,
  Plus,
  Settings,
  Clock,
  FileText,
  BookOpen
} from 'lucide-vue-next'

const props = defineProps<{
  activeTab: string
  name?: string
  profilePicture?: string
  nextSession?: { date: string; time: string }
}>()

const emit = defineEmits(['update:activeTab'])

const activeTab = computed({
  get: () => props.activeTab,
  set: (value) => emit('update:activeTab', value)
})
</script>
