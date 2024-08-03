
<template>
  <v-app-bar class="navigation">
    <v-toolbar-title class="title">SzybkiBooking</v-toolbar-title>

    <a @click="drawer = !drawer" class="mdi mdi-hamburger"></a>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : 'right'"
    temporary
    style="text-align: center;"
  >
    <!-- <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
    <v-divider></v-divider> -->
    <v-list-item @click="router.push('/')">HOME</v-list-item>
    <v-list-item @click="router.push('/classes')">SALE</v-list-item>
    <v-list-item @click="router.push('/admin-panel')">PANEL ADMINA</v-list-item>
  </v-navigation-drawer>
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const drawer = ref(false)
</script>

<style scoped>
.navigation {
  padding: 0rem 1rem;
  color: black;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
}

.nav-btn {
  font-size: 1.05rem;
  padding: 0 1rem;
  text-decoration: none;
  color: black;
}

a {
  padding: 0 3rem;
  font-size: 1.8rem;
  cursor: pointer;
}

.v-list-item {
  text-decoration: none;
  font-size: 1.4rem;
  padding: 0.6rem 0;
} 
</style>