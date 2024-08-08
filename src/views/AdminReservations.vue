<script setup>
import { onMounted, ref } from 'vue';
import { approveReservation, getReservations, removeReservation } from '../../data/database';
import AdminSidebar from '../components/AdminSidebar.vue';
import { useDisplay } from 'vuetify';

const reservations = ref([])
const currentItemId = ref("")
const dialogDelete = ref(false)
const dialogDetails = ref(false)
const currentItemDetails = ref({})
const { mobile } = useDisplay()

const headers = [
  { title: 'Status', key: 'status', align: 'center' },
  {
    title: 'Data',
    align: 'start',
    key: 'date',
  },
  { title: 'Początek', key: 'start', sortable: false },
  { title: 'Koniec', key: 'finish', sortable: false },
  { title: 'Kurs', key: 'name' },
  { title: 'Użytkownik', key: 'person' },
  { title: 'Sala', key: 'roomNumber' },
  { title: 'Akcje', key: 'actions', sortable: false, align: 'center' },
]

const mobileHeaders = [
  { title: 'Status', key: 'status', align: 'center' },
  { title: 'Kurs', key: 'name' },
  { title: 'Akcje', key: 'actions', sortable: false, align: 'center' },
]

const fetchReservations = () => {
  reservations.value = []
  getReservations()
    .then(data => {
      Object.entries(data).forEach(roomData => {
        const newRoomObject = { 'id': roomData[0], ...roomData[1]}
        reservations.value.push(newRoomObject)
      })
    })
    .catch(err => {
      console.log(err);
    })
}

const handleDeleteReservation = () => {

  removeReservation(currentItemId.value)
    .then(data => {
      fetchReservations()
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    })
  dialogDelete.value = false
}

const handleApproveReservation = () => {
  approveReservation(currentItemId.value)
    .then(data => {
      console.log(data);
      fetchReservations()
    })
    .catch(err => {
      console.error(err);
    })
}

const showDetails = (item) => {
  currentItemDetails.value = item
  console.log(currentItemDetails.value);
  dialogDetails.value = true
}

onMounted(() => {
  fetchReservations()
})
</script>

<template>
  <div class="container">
  <h1>Prośby o zatwierdzenie rezerwacji</h1>

    <v-card class="table-mobile" v-if="mobile">
      <v-data-table
        :items="reservations"
        item-value="name"
        :headers="mobileHeaders"
      >

        <template v-slot:[`item.status`]="{ item }">
          <div>
            <v-icon 
              :icon="item.status == 'PENDING' ? 'mdi mdi-calendar-question' : 'mdi mdi-check-decagram-outline'"
              :color="item.status == 'PENDING' ? 'red' : 'green'"
            ></v-icon>
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">

          <v-btn color="success" class="success-btn" icon="mdi mdi-arrow-right-thin" density="compact" @click="() => {
            currentItemId = item.id
            showDetails(item)
          }"></v-btn>

        </template>

      </v-data-table>

      <v-dialog v-model="dialogDetails" @keydown.esc="dialogDetails = false" scrollable>

        <v-card
            class="mx-auto pt-4 text-left"
            max-width="844"
        >
        <v-card-text>
            <div class="top">
  
                <button class="arr-btn" @click="dialogDetails = false">
                    <i class="pi pi-times"></i>
                </button>
  
                <div class="header">
                    <h1>{{ currentItemDetails.name }}</h1>
                </div>
            </div>
  
            <hr />
  
            <div class="details">
              <ul>
                  <li><p><strong>Status:</strong> {{ currentItemDetails.status == 'PENDING' ? 'Oczekująca' : 'Zatwierdzona' }} </p></li>
                  <li><p><strong>Data:</strong> {{ currentItemDetails.date }} </p></li>
                  <li><p><strong>Początek:</strong> {{ currentItemDetails.start }} </p></li>
                  <li><p><strong>Koniec:</strong> {{ currentItemDetails.finish }} </p></li>
                  <li><p><strong>Użytkownik:</strong> {{ currentItemDetails.person }} </p></li>
                  <li><p><strong>Sala:</strong> {{ currentItemDetails.roomNumber }} </p></li>
              </ul>
            </div>
        </v-card-text>
        
            <v-card-actions>
                <div class="buttons">
                    <v-btn 
                    v-if="currentItemDetails.status == 'PENDING'"
                        prepend-icon="mdi-check-decagram-outline"
                        text="Zatwierdź"
                        variant="text"
                        color="teal-accent-4"
                        class="dialog-btn"
                        @click="handleApproveReservation"
                    ></v-btn>
  
                    <v-btn
                        text="Usuń"
                        color="red-accent-3"
                        prepend-icon="mdi-trash-can"
                        variant="text"
                        class="dialog-btn"
                        @click="handleDeleteReservation"
                    ></v-btn>
  
                </div>
            </v-card-actions>
          </v-card>
        </v-dialog> 
    </v-card>

    <v-card class="table" v-else>

      <v-data-table

        :items="reservations"
        item-value="name"
        :headers="headers"
      >

        <template v-slot:[`item.status`]="{ item }">
          <div>
            <v-chip
              :color="item.status == 'PENDING' ? 'red' : 'green'"
              :text="item.status == 'PENDING' ? 'Oczekujące' : 'Potwierdzone'"
              class="text-uppercase"
              size="small"
              label
            ></v-chip>
          </div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">

          <v-btn color="success" class="success-btn" @click="() => {
            currentItemId = item.id
            handleApproveReservation()
          }">Zatwierdź</v-btn>

          <v-icon size="small" @click="() => { 
            currentItemId = item.id
            dialogDelete = true
          }">mdi-delete </v-icon>
        </template>

      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="300px">
        <v-card>
          <v-card-title style="padding: 1rem">Usunąć rezerwację?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
                text="Anuluj"
                variant="plain"
                @click="dialogDelete = false"
            ></v-btn>

            <v-btn
                color="primary"
                text="Usuń"
                variant="tonal"
                @click="handleDeleteReservation"
            ></v-btn>
            
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card>
    <AdminSidebar />

  </div>
</template>

<style scoped>

.container {
  padding: 0 2rem;
  margin: 6rem 3rem;
  min-height: 60vh;
}

.table {
  background-color: rgba(128, 128, 128, 0.075);
}

.sidebar-container {
  background-color: rgba(0, 0, 0, 0.741);
}

.link {
  text-decoration: none;
  color: white;
}

h1 {
  font-weight: 400;
  padding: 1rem;
  text-align: center;

}

.tile-first-row {
  width: 19rem;
  height: 15rem;
  align-items: center;
  text-align: center;
  padding: 0.4rem;
  padding-top: 1.5rem;
  margin: auto;
  margin-top: 2rem;

}

.tile-second-row {
  width: 24rem;
  height: 15rem;
  align-items: center;
  text-align: center;
  padding: 0.4rem;
  padding-top: 1.5rem;
  margin: auto;
  margin-top: 2rem;

}

.title, .v-card-subtitle {
  white-space: normal; 
  overflow-wrap: break-word; 
  word-wrap: break-word;
}


.initials {
  margin: auto;
  width: 4rem;
  height: 4rem;
  font-size: 32px;
  background-color: #303030;
  color: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.buttons {
  display: flex;
  margin: 1rem;
  justify-content: center;
  gap: 10%;
  width: 100%;
  padding-bottom: 1rem;
}

.edit-btn {
  font-size: 0.8rem;
  margin: 1rem 0;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 60%;
  margin: auto;
}

.buttons .v-btn {
  font-size: 0.8rem;
}

.success-btn {
  font-size: 0.8rem;
  margin: 0 1rem;
}

.details {
  padding: 2rem 3rem;
}

.details p {
  line-height: 1.8rem;
  font-size: 0.9rem;
}

.details li {
  list-style-type: none;
  line-height: 0.1rem;
}

.v-dialog {
  overflow-y: auto;
  max-width: 100vw;
  max-height: 100wh;
}

.v-card {
  max-height: 80vh; /* Adjust as needed */
  overflow-y: auto;
}

.v-card-text {
  overflow-y: auto;
}

@media screen and (max-width: 800px) {
  .container {
    padding: 0;
    margin: 0;
  }
  .v-snackbar {
      width: 10vw;
      margin: auto;
      padding-bottom: 2rem;
  }
}

</style>
