<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AdminSidebar from '../components/AdminSidebar.vue';
import { addNewRoom } from '../../data/database';

const route = useRoute()
const roomInfo = ref({
  "building": "",
  "computers": false,
  "numberOfPlaces": 0,
  "organizationalUnit": "",
  "roomNumber": "",
  "street": "",
  "zone": ""
})

const snackbar = ref(false)
const snackbarMessage = ref("")

const buildings = ref([
    "III Kampus, budynek Wydziału Fizyki, Astronomii i Informatyki Stosowanej",
    "I Kampus, budynek Wydziału Matematyki i Informatyki",
    "II Kampus, budynek WZiKS",
    "III Kampus, Centrum Biotechnologii",
    "III Kampus, Centrum Dydaktyki",
])

const organizationalUnits = ref([
    "Wydział Fizyki, Astronomii i Informatyki Stosowanej",
    "Wydział Matematyki i Informatyki",
    "WZiKS"
])

const streets = [
    "Ulica Słoneczna",
    "Ulica Wiosny",
    "Aleja Lipowa",
    "Ulica Zielona",
    "Ulica Miodowa",
    "Ulica Jesienna",
    "Ulica Wrzosowa",
    "prof. Stanisława Łojasiewicza"		
];

const zones = ref(["Strefa Badawcza", "I Kampus", "II Kampus", "III Kampus",])

const handleSubmit = () => {
    // console.log('Neeew', roomInfo.value);

    if (!roomInfo.value.building || !roomInfo.value.organizationalUnit || !roomInfo.value.roomNumber || !roomInfo.value.organizationalUnit || !roomInfo.value.street || !roomInfo.value.zone) {
      snackbarMessage.value = "Wypełnij wszystkie pola"
      snackbar.value = true
      return
    }

    if (roomInfo.value.numberOfPlaces === 0) {
      snackbarMessage.value = "Liczba miejsc musi być większa od 0"
      snackbar.value = true
      return
    }

    addNewRoom(roomInfo.value)
      .then(data => {
        console.log('Moje data', data);
        snackbarMessage.value = "Dodano nową salę"
        snackbar.value = true
      })
      .catch(err => {
        console.error("Error while pushing new room details", err);
        if (err === "Room number must be unque") {
          snackbarMessage.value = "Sala o takiej nazwie już istnieje"
          snackbar.value = true
        }
      })
}

</script>

<template>
    <div class="container">
        <h1>Dodaj nową salę</h1>
        <v-card class="list">
            <v-card-title>{{ route.params.roomNumber }}</v-card-title>
            <v-divider></v-divider>
            <form @submit.prevent="submit" v-if="roomInfo">

                <v-text-field
                  v-model="roomInfo.roomNumber"
                  label="Nazwa sali"
                ></v-text-field>

                <v-select
                    v-model="roomInfo.zone"
                    :items="zones"
                    label="Strefa"
                ></v-select>

                <v-select
                  v-model="roomInfo.street"
                  :items="streets"
                  label="Ulica"
                ></v-select>

                <v-select
                  v-model="roomInfo.building"
                  :items="buildings"
                  label="Budynek"
                ></v-select>

                <v-select
                    v-model="roomInfo.organizationalUnit"
                    :items="organizationalUnits"
                    label="Wydział"
                ></v-select>

                <p>Liczba miejsc</p>
                <v-slider
                    v-model="roomInfo.numberOfPlaces"
                    :max=300
                    :min=0
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
            
                <v-btn
                  class="me-4"
                  type="submit"
                  @click="handleSubmit"
                >
                  Zatwierdź
                </v-btn>

            </form>   
            
            <v-progress-circular
                color="primary"
                indeterminate
                v-else
                style="margin: 4rem;"
            ></v-progress-circular>

            <AdminSidebar />
        </v-card>

    </div>
    <v-snackbar
        v-model="snackbar"
    >
        {{ snackbarMessage }}

        <template v-slot:actions>
        <v-btn
            color="red"
            variant="text"
            @click="snackbar = false"
        >
            Zamknij
        </v-btn>
        </template>
    </v-snackbar>
</template>

<style scoped>

.container {
    padding: 0 2rem;
    text-align: center;
    margin-bottom: 3rem ;
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

</style>
  