
<template>
  <v-container>
    <v-row class="page-content">
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div class="text-content">
          <h1>Wygodna rezerwacja sal w zasięgu ręki</h1>
          <h4>Zarezerwuj salę w kilku prostych krokach</h4>

          <v-btn 
            color="deep-orange-darken-3" 
            variant="outlined" 
            class="classes-btn"
            @click="router.push('/classes')"
          >
            Przeglądaj dostępne sale<i class="pi pi-arrow-right"></i>
          </v-btn>

          <v-btn 
            color="deep-orange-darken-3" 
            variant="tonal" 
            class="classes-btn"
            @click="router.push('/admin-panel')"

          >
            Zarządzaj jako administrator<i class="pi pi-arrow-right"></i>
          </v-btn>

        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-img
          src="https://img.freepik.com/free-vector/appointment-booking-with-man-calendar_23-2148554943.jpg?t=st=1723040385~exp=1723043985~hmac=2814ed2bdc1800701caf52ea409b14771cb71f78fc054110473005ed36854548&w=1480"
          class="image"

        >
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

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
    h1 {
      font-size: 3rem;
    }
  }

</style>
  