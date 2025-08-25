<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCurrentUser } from '../../data/database';
import { useDisplay } from 'vuetify';

const router = useRouter();
const user = ref(null);
const drawer = ref(true);
const rail = ref(true);
const { mobile } = useDisplay();

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    router.push('/login');
  });
};

const fetchCurrentUser = () => {
  getCurrentUser()
    .then((data) => {
      user.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(() => {
  fetchCurrentUser();

  if (!mobile) {
    rail.value = false;
  }
});
</script>

<template>
  <v-card>
    <v-navigation-drawer
      color="grey-darken-4"
      v-model="drawer"
      location="right"
      permanent
      class="sidebar-container"
      :rail="rail"
      @click="rail = false"
    >
      <template v-slot:prepend>
        <v-list-item lines="two" subtitle="Logged in" :title="user.email" style="color: white">
          <template v-slot:prepend v-if="rail">
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>

          <template v-slot:prepend v-else>
            <v-btn icon="mdi-chevron-right" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
      </template>

      <v-divider />

      <v-list density="compact" nav :class="{ hide: rail }">
        <v-list-item prepend-icon="mdi-home" @click="router.push('/')">SzybkiBooking</v-list-item>
        <v-list-item prepend-icon="mdi-home-analytics" @click="router.push('/admin-panel')"
          >Panel</v-list-item
        >
        <v-list-item prepend-icon="mdi-account" @click="router.push('/admin-account')"
          >Moje konto</v-list-item
        >
        <v-list-item prepend-icon="mdi-book" @click="router.push('/admin-reservations')"
          >Rezerwacje</v-list-item
        >
        <v-list-item prepend-icon="mdi-format-list-bulleted" @click="router.push('/admin-classes')"
          >Sale</v-list-item
        >
        <v-list-item prepend-icon="mdi-alert-circle-outline" @click="router.push('/admin-issues')"
          >Zgłoszone usterki</v-list-item
        >
      </v-list>

      <div class="logout-btn">
        <v-btn @click="handleSignOut" v-if="!rail">Wyloguj się</v-btn>
      </div>
    </v-navigation-drawer>
  </v-card>
</template>

<style scoped>
.sidebar-container {
  background-color: rgba(0, 0, 0, 0.741);
  text-align: left;
}

.v-list-item {
  text-decoration: none;
  color: white;
}

.hide {
  line-height: 0.4rem;
}

.logout-btn {
  width: 100%;
  text-align: center;
  margin: 1rem 0;
}

@media screen and (max-width: 800px) {
  .hide {
    line-height: 0.1rem;
  }
}
</style>
