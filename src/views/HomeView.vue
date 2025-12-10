<script setup lang="ts">
import Navbar from '@/components/Home/HomeNavbar.vue';
import Footer from '@/components/Home/HomeFooter.vue';
import HeroComponent from '@/components/Home/HomeHero.vue';
import ServicesComponent from '@/components/Home/HomeServices.vue';
import TherapistsComponent from '@/components/Home/HomeTherapists.vue';
import HomeAssistant from '@/components/Home/HomeAssistant.vue';

</script>

<template>
  <main>
    <Navbar />

    <HeroComponent />

    <ServicesComponent />

    <TherapistsComponent />

    <HomeAssistant />

    <Footer />
  </main>
</template>
