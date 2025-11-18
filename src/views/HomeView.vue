<script setup lang="ts">
import Navbar from '@/components/Home/HomeNavbar.vue';
import Footer from '@/components/Home/HomeFooter.vue';
import HeroComponent from '@/components/Home/HomeHero.vue';
import ServicesComponent from '@/components/Home/HomeServices.vue';
import TherapistsComponent from '@/components/Home/HomeTherapists.vue';

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
