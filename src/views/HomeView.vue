<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Home/HomeNavbar.vue'
import Footer from '@/components/Home/HomeFooter.vue'
import HeroComponent from '@/components/Home/HomeHero.vue'
import ServicesComponent from '@/components/Home/HomeServices.vue'
import TherapistsComponent from '@/components/Home/HomeTherapists.vue'
import HomeAssistant from '@/components/Home/HomeAssistant.vue'

const currentView = ref('home')
const router = useRouter()

const setView = (view: string) => {
  if (view === 'dashboard') {
    router.push('/dashboard')
  } else {
    currentView.value = view
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-brand-bg flex flex-col font-sans antialiased">
    <Navbar v-model:currentView="currentView" />

    <main class="flex-1">
      <div v-if="currentView === 'home'" class="animate-fade-in">
        <HeroComponent @click-view="setView" />
        <ServicesComponent />
        <HomeAssistant />
      </div>

      <div v-else-if="currentView === 'terapeutas'" class="animate-fade-in">
        <TherapistsComponent @click-view="setView" />
      </div>

      <div v-else-if="currentView === 'asistente'" class="animate-fade-in">
        <HomeAssistant />
      </div>
    </main>

    <Footer @click-view="setView" />
  </div>
</template>
