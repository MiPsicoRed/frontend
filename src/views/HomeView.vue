<script setup lang="ts">
import Navbar from '@/components/HomeComponents/HomeNavbar.vue';
import Footer from '@/components/HomeComponents/HomeFooter.vue';
import HeroComponent from '@/components/HomeComponents/HomeHero.vue';
import ServicesComponent from '@/components/HomeComponents/HomeServices.vue';
import TherapistsComponent from '@/components/HomeComponents/HomeTherapists.vue';

</script>

<template>
  <main>
    <Navbar />

    <HeroComponent />

    <ServicesComponent />

    <TherapistsComponent />

    <Footer />
  </main>
</template>
