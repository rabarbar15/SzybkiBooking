<template>
    <div class="container">

        <v-card class="list">
            <v-card-title><h2>Lista dostępnych sal </h2></v-card-title>
            <v-btn @click="router.push('/new-class')" color="success" style="margin: 0 0 1rem 0;">Dodaj nową</v-btn>

            <v-divider></v-divider>
            <v-virtual-scroll
                :items="rooms"
                height="40rem"
                item-height="48"
            >
            <template v-slot:default="{ item }">
                <v-list-item
                  :subtitle="`Liczba miejsc: ${item.numberOfPlaces}`"
                  :title="`${item.roomNumber}`"
                >
                  <template v-slot:prepend>
                    <v-icon v-if="!item.computers">mdi-book-open-variant</v-icon>
                    <v-icon v-else>mdi mdi-laptop</v-icon>
                  </template>
        
                  <template v-slot:append>
                    <v-btn
                      icon="mdi-pencil"
                      size="x-small"
                      variant="tonal"

                      @click="router.push({ path: `/edit-class/${item.roomNumber}` })"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>
            </v-virtual-scroll>
        
        </v-card>
        <AdminSidebar />

    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import { retrieveAllRoomsDetails } from '../../data/database';
import AdminSidebar from '../components/AdminSidebar.vue';
import { useRouter } from 'vue-router';

const rooms = ref([]);
const router = useRouter()

onMounted(() => {
    try {
        retrieveAllRoomsDetails()
            .then(data => {
                rooms.value = Object.values(data).map((room) => {
                    return room;
                })
                console.log(rooms.value);
            })
            .catch(err => {
                console.error('Error retrieving room details:', err);
            })

        console.log("ROoms", rooms.value);
    } catch (error) {
        console.error("Error while retrieving rooms:", error);
    }
});
</script>

<style scoped>

.container {
    padding: 0 2rem;
    text-align: center;
    margin: 4rem 3rem;
    min-height: 60vh;
}

h2 {
    font-weight: 400;
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

@media screen and (max-width: 800px) {
    .container {
        margin: 0;
        padding: 0;
    }

    .list {
        width: 85vw;
    }

    .v-card-title {
        font-size: 1rem;
    }
}

</style>
  