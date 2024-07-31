<script setup>
import { onMounted, ref } from 'vue';
import { approveReservation, getReservations, getReservationById, removeReservation } from '../../data/database';
import AdminSidebar from '../components/AdminSidebar.vue';

const reservations = ref([])
const currentItemId = ref("")
const dialogDelete = ref(false)
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

onMounted(() => {
  fetchReservations()
})
</script>

<template>
  <div class="container">
  <h1>Prośby o zatwierdzenie rezerwacji</h1>

    <v-card class="table">
      
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

      <AdminSidebar />
    </v-card>

  </div>
</template>

<style scoped>

.container {
  padding: 0 2rem;
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

.edit-btn {
  font-size: 0.8rem;
  margin: 1rem 0;
}

.buttons {
  width: 100%;
  align-content: center;
  text-align: center;
}

.success-btn {
  font-size: 0.8rem;
  margin: 0 1rem;
}

</style>
