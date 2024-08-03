<script setup>
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <v-container>
    <v-row class="page-content">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div class="text-content">
          <h1>Wygodna rezerwacja sal w zasięgu ręki</h1>
          <h4>Zarezerwuj salę w kilku prostych krokach</h4>

          <router-link to="classes">
            <v-btn color="primary" variant="outlined" class="classes-btn">Przeglądaj dostępne sale<i class="pi pi-arrow-right"></i></v-btn>
          </router-link>

          <router-link to="admin-panel">
            <v-btn color="indigo-darken-1" variant="tonal" class="classes-btn">Zarządzaj jako administrator<i class="pi pi-arrow-right"></i></v-btn>
          </router-link>

        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-img
          src="https://img.freepik.com/darmowe-wektory/rezerwacja-terminu-ze-smartfonem_23-2148554312.jpg?t=st=1720153880~exp=1720157480~hmac=82e137942e40ce1772f3fc537e7f1ac3fdc3b8de9d9f5c1473a036a1bc3676de&w=1480"
          class="image"

        >
        </v-img>
      </v-col>
    </v-row>
    
  </v-container>
  

</template>

<style scoped>

  .v-container {
    padding: 5rem 0;
  }

  h3, h4 {
    font-weight: 400;
  }

  h4 {
    color: grey;
    padding: 1rem 0;
  }

  h1 {
    font-weight: 400;
    font-size: 3.5rem;
    line-height: 4.5rem;
  }

  .page-content {
    width: 70vw;
    margin: 0 auto;
  }

  .text-content {
    font-size: 1.4rem;
    text-align: left;
  }

  .classes-btn {
    margin: 1rem 0;
  }

  .pi {
    padding-left: 0.5rem;
    font-size: 0.8rem;
  }

  .info {
    width: 100%;
  }

  .image {
    max-width: 100%;
    height: auto;
  }

  @media screen and (max-width: 800px) {
    .image {
      display: none;
    }

    .text-content {
      text-align: center;
    }
  }

</style>
  