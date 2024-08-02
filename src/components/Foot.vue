<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <v-footer class="footer bg-indigo-lighten-1 text-center d-flex flex-column">
        <v-row style="width: 100%;">
            
            <v-col cols="3" class="links">
                <h2>SzybkiBooking</h2>
                <div class="icons">
                    <i class="pi pi-github"></i>
                    <i class="pi pi-linkedin"></i>
                    <i class="pi pi-instagram"></i>
                    <i class="pi pi-youtube"></i>
                </div>
            </v-col>

            <v-col cols="3" class="nav">
                <ul>
                    <li><a @click="router.push('/')">HOME</a></li>
                    <li><a @click="router.push('/classes')">SALE</a></li>
                    <li><a @click="router.push('/admin-panel')">PANEL ADMINA</a></li>
                </ul>
            </v-col>

            <v-col cols="6" class="copyright">
                <p>Copyright 2024 All Rights Reserved</p>
            </v-col>
            
        </v-row>
    </v-footer>
</template>

<style scoped>

  .footer {
    padding: 4rem 25px 2rem 4rem;
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

  .svg-icon {
    width: 24px;
    height: 24px;
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
    color: white;
    font-weight: 500;
    cursor: pointer;
  }

  .copyright {
    display: grid;
    align-content: end;
    text-align: right;
    padding: 1rem 7rem;
  }

</style>
