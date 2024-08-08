<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
    <v-app-bar class="navigation" color="grey-darken-4">
      <v-toolbar-title class="title" @click="router.push('/')">SzybkiBooking</v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
       <div class="links">
        <router-link to="/">
          <v-btn text class="nav-btn" color="white">HOME</v-btn>
        </router-link>

        <router-link to="/classes">
          <v-btn text class="nav-btn" color="white">SALE</v-btn>
        </router-link>

        <router-link to="/admin-panel">
          <v-btn text class="nav-btn" color="white">PANEL ADMINA</v-btn>
        </router-link>
      </div>
    </v-app-bar>
</template>

<style scoped>
  .v-toolbar-title {
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .navigation {
    padding: 0rem 10rem;
    color: black;
  }

  .links{
    padding: 0 13rem;
  }

  .nav-btn {
    font-size: 1.05rem;
    padding: 0 1rem;
    text-decoration: none;
    color: black;
  }
</style>