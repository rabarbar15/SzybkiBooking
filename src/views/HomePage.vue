<template>
    <div id="app">

      <v-container class="container">
        <v-row class="page-content">
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <div class="text-content">
              <h3>Witaj w SzybkiBooking!<br></h3>
              <p>Tutaj możesz przeglądać i rezerwować sale do różnych celów edukacyjnych i spotkań. Nasza platforma jest prosta w obsłudze, zapewniając szybkie i wygodne dokonywanie rezerwacji online.<br></p>
              <p style="font-size: 1.2rem;"><br> Dziękujemy za korzystanie z naszego systemu!</p>
              <router-link to="classes">
                <v-btn color="primary" variant="outlined" class="classes-btn">Przeglądaj dostępne sale<i class="pi pi-arrow-right"></i></v-btn>
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
    </div>
  </template>
  
  <style scoped>

    h3 {
      font-weight: 400;
    }

    .page-content {
      width: 70vw;
      margin: 0 auto;
    }

    .text-content {
      font-size: 1.4rem;
      text-align: center;
      padding: 0 3rem;
    }

    .classes-btn {
      margin: 2rem;
      /* font-size: 2rem; */
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
  
  </style>
  