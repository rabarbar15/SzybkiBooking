<script setup>
import { onMounted, ref } from 'vue';
import { removeIssue, retrieveIssues } from '../../data/database';
import AdminSidebar from '../components/AdminSidebar.vue';

const issues = ref([])
const currentItemId = ref("")
const dialogDelete = ref(false)
const expanded = ref([])
const headers = [
  { title: 'Użytkownik', key: 'userEmail', sortable: false },
  { title: 'Data', key: 'data', sortable: false },
  { title: 'Sala', key: 'roomNumber', sortable: false  },
  { title: 'Akcje', key: 'actions', sortable: false, align: 'center' },
]

const fetchIssues = () => {
  issues.value = []
  retrieveIssues()
    .then(data => {
      Object.entries(data).forEach(issueData => {
        const newIssueObject = { 'id': issueData[0], ...issueData[1]}
        issues.value.push(newIssueObject)

      })
    })
    .catch(err => {
      console.log(err);
    })
}

const handleDeleteIssue = () => {
  removeIssue(currentItemId.value)
    .then(() => {
      fetchIssues()
    })
    .catch(err => {
      console.error(err);
    })
  dialogDelete.value = false
}


onMounted(() => {
  fetchIssues()
})
</script>

<template>
  <div class="container">
  <h1>Zgłoszone problemy</h1>

    <v-card class="table">
      
      <v-data-table
        v-model:expanded="expanded"
        :items="issues"
        :item-value="issues.id"
        :headers="headers"
        show-expand
      >
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <p style="padding: 0 1rem;"><i>Opis:</i> {{ item.description }}</p>
          </td>
        </tr>
      </template>

        <template v-slot:[`item.actions`]="{ item }">

          <v-icon size="small" @click="() => { 
            currentItemId = item.id
            dialogDelete = true
          }">mdi-delete </v-icon>

        </template>

      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="300px">
        <v-card>
          <v-card-title style="padding: 1rem">Usunąć zgłoszenie?</v-card-title>
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
                @click="handleDeleteIssue"
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
