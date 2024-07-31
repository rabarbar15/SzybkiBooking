<template>
    <div class="container">
    <h1>Panel administratora</h1>

      <v-card class="panel">
        
        <v-row>
            <v-col cols="4">

                <v-card class="tile-first-row" color="#FFF0F5">
                    <v-card-title class="initials"> {{ this.user ? this.user.email[0].toUpperCase() : '' }}</v-card-title >
                    <v-card-title >Moje konto</v-card-title>
                    <v-card-subtitle> {{ this.user ? this.user.email : '' }} </v-card-subtitle>
                    <v-btn class="edit-btn" @click="router.push('/admin-account');">Zarządzaj</v-btn>
                </v-card>

            </v-col>

            <v-col cols="4">
                <v-card class="tile-first-row" color="#F8F8FF">
                    <v-card-title class="initials"><i class="mdi mdi-account-box-plus-outline"></i></v-card-title >
                    <v-card-title class="title">Dodaj nowe konto administratora</v-card-title>
                    <v-btn @click="router.push('/admin-new-account')"><i class="mdi mdi-plus" style="font-size: 1.5rem"></i></v-btn>
                </v-card>
            </v-col>

            <v-col cols="4">
                <v-card class="tile-first-row" color="#F0FFFF">
                    <v-card-title class="initials"><i class="mdi mdi-format-list-bulleted"></i></v-card-title >
                    <v-card-title class="title">Sale</v-card-title>
                    <v-card-subtitle>Liczba sal: {{ numberOfRooms }} </v-card-subtitle>
                    <v-btn class="edit-btn" @click="router.push('/admin-classes')">Lista sal</v-btn>
                </v-card>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card class="tile-second-row" color="#FFF8DC">
                    <v-card-title class="initials"><i class="mdi mdi-account-box-plus-outline"></i></v-card-title >
                    <v-card-title class="title">Rezerwacje</v-card-title>
                    <v-card-subtitle>Oczekujące: {{ pendingReservationsNumber }}</v-card-subtitle>
                    <v-btn class="edit-btn" @click="router.push('/admin-reservations')">Lista rezerwacji</v-btn>

                </v-card>
            </v-col>

            <v-col cols="6">
                <v-card class="tile-second-row" color="#F0F8FF">
                    <v-card-title class="initials"><i class="mdi mdi-alert-circle-outline"></i></v-card-title >
                    <v-card-title class="title">Zgłoszenia</v-card-title>
                    <v-card-subtitle>Liczba zgłoszeń: {{ issuesNumber }}</v-card-subtitle>
                    <v-btn class="edit-btn" @click="router.push('/admin-issues')">Lista zgłoszeń</v-btn>

                </v-card>
            </v-col>
        </v-row>

        <AdminSidebar />
        
      </v-card>
    </div>
  </template>
  
<script>
import AdminSidebar from '../components/AdminSidebar.vue';
import { getCurrentUser, retrieveAllRoomsDetails, retrieveIssues } from '../../data/database';
import { getAllEvents } from '../../data/calendarEvents';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            rooms: [],
            reservations: [],
            issues: [],
            user: null,
            router: useRouter()
        }
    },
    components: {
        AdminSidebar
    },
     computed: {
        numberOfRooms() {
            return Object.keys(this.rooms).length
        },
        pendingReservationsNumber() {
            return this.reservations.reduce((number, reservation) => {
                return reservation.status === "PENDING" ? number + 1 : number;
            }, 0);
        },
        issuesNumber() {
            return Object.keys(this.issues).length;
        }
     },
     async mounted() {
        try {
            this.user = await getCurrentUser()
        } catch (error) {
            console.error(error);
        }

        try {            
            this.rooms = await retrieveAllRoomsDetails()
        } catch (error) {
            console.error("Error while retrieving rooms:", error)
        }

        try {
            this.reservations = await getAllEvents()
        } catch (error) {
            console.error("Error while retrieving reservations:", error)
        }

        try {
            this.issues = await retrieveIssues()
        } catch (error) {
            console.error('Error while retrieving issues:', error);
        }

     }
}
</script>

<style scoped>

.container {
    padding: 0 2rem;
}

.panel {
    padding: 3rem;

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

</style>
  