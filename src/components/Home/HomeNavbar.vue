<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.module'
import { Brain, User, Sparkles, LogOut, ArrowRight, Menu, X } from 'lucide-vue-next'

const props = defineProps<{
  currentView: string
}>()

const emit = defineEmits<{
  (e: 'update:currentView', view: string): void
}>()

const authStore = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  mobileMenuOpen.value = false
  emit('update:currentView', 'home')
  router.push('/')
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const setView = (view: string) => {
  emit('update:currentView', view)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b border-brand-border h-[80px]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
      
      <!-- Brand Logo -->
      <button 
        @click="setView('home')" 
        class="flex items-center gap-3 transition-transform active:scale-95 text-left cursor-pointer bg-transparent border-0"
      >
        <div class="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-teal/10 hover:bg-brand-teal-hover transition-colors">
          <Brain class="w-5.5 h-5.5" />
        </div>
        <div class="flex flex-col">
          <h1 class="font-sans font-bold text-xl tracking-tight text-brand-teal leading-none">
            MiPsicoRed
          </h1>
          <p class="font-sans text-[10px] uppercase tracking-widest text-[#66827F] font-semibold mt-1">
            Salud Mental Online
          </p>
        </div>
      </button>

      <!-- Desktop Nav Actions -->
      <nav class="hidden md:flex xl:gap-8 gap-6 text-[13px] font-semibold text-brand-muted-teal">
        <button
          @click="setView('home')"
          class="transition-colors cursor-pointer pb-1 bg-transparent border-0"
          :class="currentView === 'home' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-brand-muted-teal border-b-2 border-transparent hover:text-brand-teal'"
        >
          Inicio
        </button>
        <button
          @click="setView('terapeutas')"
          class="transition-colors cursor-pointer pb-1 bg-transparent border-0"
          :class="currentView === 'terapeutas' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-brand-muted-teal border-b-2 border-transparent hover:text-brand-teal'"
        >
          Terapeutas
        </button>
        <button
          @click="setView('asistente')"
          class="transition-colors cursor-pointer pb-1 flex items-center gap-1 bg-transparent border-0"
          :class="currentView === 'asistente' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-brand-muted-teal border-b-2 border-transparent hover:text-brand-teal'"
        >
          <Sparkles class="w-3.5 h-3.5 text-brand-teal" />
          Asistente IA
        </button>
      </nav>

      <!-- User Status and Auth Actions -->
      <div class="flex items-center gap-3">
        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden text-brand-teal p-1.5 rounded-lg hover:bg-brand-sage-bg transition-colors" aria-label="Toggle menu">
          <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>

        <div v-if="authStore.isLoggedIn" class="hidden md:flex items-center gap-2 bg-[#F4F7F6] px-3.5 py-1.5 rounded-full border border-brand-border">
          <button
            @click="router.push('/dashboard')"
            class="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-brand-border hover:border-brand-teal transition-colors"
            title="Ir a mi panel"
          >
            <User class="w-3.5 h-3.5 text-brand-teal" />
          </button>
          <div class="hidden lg:block text-left pr-1">
            <p class="text-xs font-bold text-brand-charcoal leading-none">
              {{ authStore.fullUserName?.split(' ')[0] || 'Usuario' }}
            </p>
          </div>
          <button
            @click="handleLogout"
            class="p-1 text-brand-cool-gray hover:text-red-600 rounded transition-colors cursor-pointer bg-transparent border-0"
            title="Cerrar sesión"
          >
            <LogOut class="w-4 h-4" />
          </button>
        </div>

        <button
          v-else
          @click="router.push('/login')"
          class="hidden md:flex bg-brand-teal text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-brand-teal/10 hover:bg-brand-teal-hover transition-all active:scale-95 cursor-pointer items-center gap-1.5 border-0"
        >
          Acceso Portal
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-b border-brand-border px-6 py-4 shadow-md absolute w-full left-0 z-40">
      <nav class="flex flex-col space-y-4 text-[14px] font-semibold text-brand-muted-teal">
        <button
          @click="setView('home')"
          class="text-left py-2 border-b border-brand-border/40 bg-transparent"
          :class="currentView === 'home' ? 'text-brand-teal' : 'text-brand-muted-teal hover:text-brand-teal'"
        >
          Inicio
        </button>
        <button
          @click="setView('terapeutas')"
          class="text-left py-2 border-b border-brand-border/40 bg-transparent"
          :class="currentView === 'terapeutas' ? 'text-brand-teal' : 'text-brand-muted-teal hover:text-brand-teal'"
        >
          Terapeutas
        </button>
        <button
          @click="setView('asistente')"
          class="text-left py-2 border-b border-brand-border/40 flex items-center gap-1 bg-transparent"
          :class="currentView === 'asistente' ? 'text-brand-teal' : 'text-brand-muted-teal hover:text-brand-teal'"
        >
          <Sparkles class="w-3.5 h-3.5 text-brand-teal" />
          Asistente IA
        </button>

        <div class="pt-4 flex flex-col gap-2">
          <div v-if="authStore.isLoggedIn" class="flex flex-col gap-2">
            <p class="text-xs text-brand-cool-gray">Sesión iniciada como: <span class="font-bold text-brand-charcoal">{{ authStore.fullUserName }}</span></p>
            <button
              @click="router.push('/dashboard')"
              class="w-full bg-brand-sage-bg text-brand-teal px-4 py-2.5 rounded-full text-center hover:bg-[#dcedeb] font-bold transition border border-brand-sage-border cursor-pointer"
            >
              Mi Espacio (Panel)
            </button>
            <button
              @click="handleLogout"
              class="w-full bg-white text-red-605 px-4 py-2.5 rounded-full text-center hover:bg-red-50/50 font-bold transition border border-red-200 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>

          <button
            v-else
            @click="router.push('/login')"
            class="w-full bg-brand-teal text-white px-4 py-2.5 rounded-full text-center hover:bg-brand-teal-hover font-bold transition shadow-md shadow-brand-teal/5 cursor-pointer flex items-center justify-center gap-1.5 border-0"
          >
            Acceso Portal
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>