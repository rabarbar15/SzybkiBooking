<script setup>
  import Navbar from './components/Navbar.vue';
  import Foot from './components/Foot.vue';
</script>

<template>
  <v-app>
    <Navbar />
    <v-main class="container">
      <router-view class="container"></router-view>
    </v-main>
    <Foot />
  </v-app>
</template>

<style scoped>
.container {
  margin: 2rem;
}
</style>
