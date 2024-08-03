<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { getCurrentUser } from '../../data/database';

const router = useRouter()
const user = ref(null)

const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      router.push("/login");
    });
};

const fetchCurrentUser = () => {
    getCurrentUser()
      .then((data) => {
        user.value = data
      })
      .catch((err) => {
        console.error(err);
      })
  };

onMounted(() => {
  fetchCurrentUser()
})
</script>

<template>
    <v-navigation-drawer
      location="right"
      permanent
      class="sidebar-container"
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          subtitle="Logged in"
          :title=user.email
          style="color: white;"
        ></v-list-item>
      </template>

      <v-divider />

      <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" @click="router.push('/')">SzybkiBooking</v-list-item>
          <v-list-item prepend-icon="mdi-home-analytics" @click="router.push('/admin-panel')">Panel</v-list-item>
          <v-list-item prepend-icon="mdi-account" @click="router.push('/admin-account')">Moje konto</v-list-item>
          <v-list-item prepend-icon="mdi-book" @click="router.push('/admin-reservations')">Rezerwacje</v-list-item>
          <v-list-item prepend-icon="mdi-format-list-bulleted" @click="router.push('/admin-classes')">Sale</v-list-item>
          <v-list-item prepend-icon="mdi-alert-circle-outline" @click="router.push('/admin-issues')">Zgłoszone usterki</v-list-item>
      </v-list>

      <div class="logout-btn">
        <v-btn @click="handleSignOut">Wyloguj się</v-btn>
      </div>
      
    </v-navigation-drawer>

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

.logout-btn {
  width: 100%;
  text-align: center;
  margin: 1rem 0;
}

</style>
