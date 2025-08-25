<script setup>
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const router = useRouter();
</script>

<template>
  <v-footer class="footer" color="deep-orange-lighten-3">
    <v-row style="width: 100%">
      <v-col cols="3" class="links">
        <h2>SzybkiBooking</h2>
        <div class="icons">
          <i class="pi pi-github"></i>
          <i class="pi pi-linkedin"></i>
          <i class="pi pi-instagram"></i>
          <i class="pi pi-youtube"></i>
        </div>
      </v-col>

      <v-col cols="3" class="nav" v-if="!mobile">
        <ul>
          <li><a @click="router.push('/')">HOME</a></li>
          <li><a @click="router.push('/classes')">SALE</a></li>
          <li><a @click="router.push('/admin-panel')">PANEL ADMINA</a></li>
        </ul>
      </v-col>

      <v-col cols="6" class="copyright">
        <p>2024 Kamil Piskorz</p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.footer {
  padding: 4rem 25px 2rem 4rem;

  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.links {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 6rem;
}

.icons {
  font-size: 1.4rem;
  display: flex;
  gap: 1rem;
  padding: 1.5rem 0;
}

.nav {
  text-align: left;
  padding: 0 5rem;
}

li {
  font-size: 1.1rem;
  text-transform: capitalize;
  list-style: none;
  line-height: 2rem;
}

a {
  text-decoration: none;
  color: black;
  font-weight: 500;
  cursor: pointer;
}

.copyright {
  display: grid;
  align-content: end;
  text-align: right;
  padding: 1rem 7rem;
}

@media screen and (max-width: 800px) {
  .footer {
    padding: 2rem 2rem;
  }
  .copyright {
    display: flex;
    text-align: right;
    margin-left: 2rem;
    font-size: 0.8rem;
    padding-left: 10rem;
    padding-right: 0;
  }

  .links {
    padding: 0;
    text-align: left;
  }
}
</style>
