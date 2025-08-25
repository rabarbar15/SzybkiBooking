<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminSidebar from '../components/AdminSidebar.vue';
import { deleteRoom, retrieveRoomDataByNumber, updateRoomDetails } from '../../data/database';

const route = useRoute();
const router = useRouter();
const roomInfo = ref(null);
const snackbar = ref(false);
const snackbarMessage = ref('');
const dialog = ref(false);

const buildings = ref([
  'III Kampus, budynek Wydziału Fizyki, Astronomii i Informatyki Stosowanej',
  'I Kampus, budynek Wydziału Matematyki i Informatyki',
  'II Kampus, budynek WZiKS',
  'III Kampus, Centrum Biotechnologii',
  'III Kampus, Centrum Dydaktyki',
]);

const organizationalUnits = ref([
  'Wydział Fizyki, Astronomii i Informatyki Stosowanej',
  'Wydział Matematyki i Informatyki',
  'WZiKS',
]);

const streets = [
  'Ulica Słoneczna',
  'Ulica Wiosny',
  'Aleja Lipowa',
  'Ulica Zielona',
  'Ulica Miodowa',
  'Ulica Jesienna',
  'Ulica Wrzosowa',
  'prof. Stanisława Łojasiewicza',
];

const zones = ref(['Strefa Badawcza', 'I Kampus', 'II Kampus', 'III Kampus']);

const handleSubmit = () => {
  console.log('Neeew', roomInfo.value);

  updateRoomDetails(route.params.roomNumber, roomInfo.value)
    .then((data) => {
      console.log(data);
      snackbarMessage.value = 'Zaktualizowano pomyślnie';
      snackbar.value = true;
    })
    .catch((err) => {
      console.error(err);
      snackbarMessage.value = 'Wystąpił błąd';
      snackbar.value = true;
    });
};

const fetchRoomInfo = () => {
  retrieveRoomDataByNumber(route.params.roomNumber)
    .then((data) => {
      roomInfo.value = data;
      console.log('helllooo', data);
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleDeleteRoom = () => {
  deleteRoom(route.params.roomNumber)
    .then((data) => {
      console.log(data);
      dialog.value = false;
      snackbarMessage.value = data;
      snackbar.value = true;
      router.push('/admin-classes');
    })
    .catch((err) => {
      console.error(err);
    });
};

onMounted(() => {
  fetchRoomInfo();
});
</script>

<template>
  <div class="container">
    <h1>Edytuj informacje o sali</h1>
    <v-card class="list">
      <v-card-title>{{ route.params.roomNumber }}</v-card-title>

      <v-divider></v-divider>
      <form @submit.prevent="submit" v-if="roomInfo">
        <v-select v-model="roomInfo.zone" :items="zones" label="Strefa"></v-select>

        <v-select v-model="roomInfo.street" :items="streets" label="Ulica"></v-select>

        <v-select v-model="roomInfo.building" :items="buildings" label="Budynek"></v-select>

        <v-select
          v-model="roomInfo.organizationalUnit"
          :items="organizationalUnits"
          label="Wydział"
        ></v-select>

        <p>Liczba miejsc</p>
        <v-slider
          v-model="roomInfo.numberOfPlaces"
          :max="300"
          :min="0"
          class="align-center"
          hide-details
          :step="1"
        >
          <template v-slot:append>
            <v-text-field
              v-model="roomInfo.numberOfPlaces"
              style="width: 5rem"
              type="number"
              hide-details
              step="1"
            ></v-text-field>
          </template>
        </v-slider>

        <v-checkbox
          v-model="roomInfo.computers"
          label="Sala komputerowa"
          type="checkbox"
        ></v-checkbox>

        <v-btn class="me-4" type="submit" @click="handleSubmit"> Zapisz </v-btn>

        <v-btn @click="fetchRoomInfo"> Reset </v-btn>
      </form>

      <v-progress-circular
        color="primary"
        indeterminate
        v-else
        style="margin: 4rem"
      ></v-progress-circular>
    </v-card>

    <v-btn color="red" style="margin-top: 2rem" @click="dialog = true">Usuń salę</v-btn>
    <v-dialog v-model="dialog" max-width="350" persistent>
      <v-card
        text="Po zatwierdzeniu sala zostanie trwale usunięta z bazy danych."
        title="Jesteś pewien?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Anuluj </v-btn>

          <v-btn @click="handleDeleteRoom"> Zatwierdź </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>

  <AdminSidebar />

  <v-snackbar v-model="snackbar">
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false"> Zamknij </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.container {
  padding: 0 2rem;
  text-align: center;
}

.container h1 {
  padding-bottom: 2rem;
}

.list {
  padding: 1.5rem;
  background-color: rgba(128, 128, 128, 0.075);
  width: 35vw;
  margin: auto;
  text-align: center;
  border-radius: 8px;
}

.form {
  text-align: left;
  margin: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
}

input {
  background-color: rgba(128, 128, 128, 0.098);
  padding: 0.5rem;
  margin: 0.1rem;
}

.link {
  text-decoration: none;
  color: white;
}

h1 {
  font-weight: 300;
}

.initials {
  margin: auto;
  width: 5rem;
  height: 5rem;
  font-size: 32px;
  background-color: #303030;
  color: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.edit-btn {
  font-size: 0.8rem;
  margin: auto;
  text-align: center;
}

.deleted-container {
  height: 30vh;
  align-content: center;
  text-align: center;
}

@media screen and (max-width: 800px) {
  .container {
    padding: 1rem 0;
    margin: 0;
  }

  .list {
    width: 85vw;
  }

  .v-snackbar {
    width: 10vw;
    margin: auto;
    padding-bottom: 2rem;
  }

  h1 {
    font-size: 1.6rem;
  }
}
</style>
