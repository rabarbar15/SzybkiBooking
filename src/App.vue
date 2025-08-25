<script setup>
import Navbar from './components/Navbar.vue';
import Foot from './components/Foot.vue';
import MobileNavbar from './components/MobileNavbar.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
</script>

<template>
  <v-app>
    <Navbar v-if="!mobile" />
    <MobileNavbar v-else />

    <v-main class="container">
      <router-view class="container"></router-view>
    </v-main>

    <Foot />
  </v-app>
</template>

<style scoped>
.container {
  font-family: 'Quicksand', sans-serif;
}
</style>
