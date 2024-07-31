
<template>
    <v-app-bar class="navigation">
      <v-toolbar-title class="title">SzybkiBooking</v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
       <div class="links">
        <router-link to="/">
          <v-btn text class="nav-btn">HOME</v-btn>
        </router-link>

        <router-link to="/classes">
          <v-btn text class="nav-btn">SALE</v-btn>
        </router-link>

        <router-link to="/admin-panel">
          <v-btn text class="nav-btn">PANEL ADMINA</v-btn>
        </router-link>
      </div>
    </v-app-bar>
</template>

<script>

</script>

<style scoped>
  .navigation {
    padding: 0rem 10rem;
    color: black;
  }

  .title {
    font-size: 1.4rem;
    font-weight: bold;
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