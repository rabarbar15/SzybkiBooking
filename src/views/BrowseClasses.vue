<template>
    <v-app>
      <v-container class="container">
        <div class="content">
            <header>
                <h1 style="text-align: center;">Katalog sal</h1>
                <br>
                <div class="filter" v-if="!isMobile">

                    <p>Liczba miejsc</p>
                    <input type="number" class="number-input" min="0" v-model="filterCapacity[0]" placeholder="min">
                    <p>-</p>
                    <input type="number" class="number-input" min="0" v-model="filterCapacity[1]" placeholder="maks">

                    <p style="padding-left: 1rem;">Sale komputerowe</p>
                    <input type="checkbox" class="check-input" v-model="filterComputer">

                </div>

                <div class="mobile-filter" v-else>

                    <h3>Liczba miejsc</h3>

                    <br>
                    <!-- <input type="number" class="number-input-mobile" min="0" v-model="filterCapacityMin" placeholder="min">
                    <input type="number" class="number-input-mobile" min="0" v-model="filterCapacityMax" placeholder="maks"> -->
                    <v-range-slider
                        step="1"
                        thumb-label="always"
                        strict
                        :max="300"
                        v-model="filterCapacity"
                    ></v-range-slider>

                    <div class="computer-classes-filter">
                        <v-checkbox label="Sale komputerowe" v-model="filterComputer"></v-checkbox>
                    </div>

                </div>
            </header>

            <v-table class="table" v-if="!isMobile">
                <thead>
                    <tr>
                        <th>STREFA</th>
                        <th>ULICA</th>
                        <th>NUMER SALI</th>
                        <th>MIEJSCA</th>
                        <th>KOMPUTEROWA</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(room, index) in filteredRooms" :key="index">
                        <td>{{ room.zone }}</td>
                        <td>{{ room.street }}</td>
                        <td>
                            <v-btn text class="btn" @click="openDialog(room)">{{ room.roomNumber }}</v-btn>
                        </td>
                        <td>{{ room.numberOfPlaces }}</td>
                        <td>{{ room.computers ? 'Tak' : 'Nie' }}</td>
                        <td>
                            <v-btn @click="() => {
                                    this.selectedRoom = room;
                                    goToCalendar()
                                }"
                                color="success"
                            >
                            Rezerwuj</v-btn>
                        </td>
                    </tr>

                    <tr v-if="filteredRooms.length === 0">
                        <td colspan="8" class="text-center">Brak dostępnych sal spełniających kryteria.</td>
                    </tr>
                </tbody>
            </v-table>

            <v-card class="list" v-else>
    
                <v-divider></v-divider>
                <v-virtual-scroll
                    :items="filteredRooms"
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
                          icon="mdi-notebook-edit"
                          size="x-small"
                          variant="tonal"
    
                          @click="openDialog(item)"
                        ></v-btn>
                      </template>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>

            </v-card>

            <v-dialog v-model="dialog" @keydown.esc="handleEscape" scrollable>

                <v-card
                    class="mx-auto pt-4 text-left"
                    max-width="844"
                >
                <v-card-text>
                    <div class="top">

                        <button class="arr-btn" @click="closeDialog()">
                            <i class="pi pi-times"></i>
                        </button>

                        <div class="header">
                            <h1>Szczegóły sali</h1>
                        </div>
                    </div>

                    <hr />

                    <div class="details">
                    <ul>
                        <li> <p><strong>Strefa:</strong> {{ selectedRoom.zone }} </p></li>
                        <li> <p><strong>Ulica:</strong> {{ selectedRoom.street }} </p></li>
                        <li> <p><strong>Budynek:</strong> {{ selectedRoom.building }} </p></li>
                        <li> <p><strong>Jednostka organizacyjna:</strong> {{ selectedRoom.organizationalUnit }} </p></li>
                        <li> <p><strong>Numer sali:</strong> {{ selectedRoom.roomNumber }} </p></li>
                        <li> <p><strong>Liczba miejsc:</strong> {{ selectedRoom.numberOfPlaces }} </p></li>
                    </ul>
                    </div>
                </v-card-text>
                
                    <v-card-actions>
                        <div class="buttons">
                            <v-btn 
                                prepend-icon="mdi-calendar-blank"
                                text="Zobacz plan zajęć"
                                variant="text"
                                color="teal-accent-4"
                                class="dialog-btn"
                                @click="goToCalendar"
                            ></v-btn>

                            <v-btn
                                text="Zgłoś usterkę"
                                color="red-accent-3"
                                prepend-icon="mdi-pencil"
                                variant="text"
                                class="dialog-btn"
                                @click="reveal = true"
                            ></v-btn>

                        </div>
                    </v-card-actions>
            
                <v-expand-transition scrollable>
                    <v-card
                        v-if="reveal"
                        class="position-absolute w-100 expand"
                        height="100%"
                        style="bottom: 0;"
                    >
                    <button class="arr-btn" @click="closeDialog()">
                        <i class="pi pi-times"></i>
                    </button>
                    <v-card-text >
                        <h2>Masz problem?</h2>
                        <span class="issue-info">Jeśli w wybranej sali coś się zepsuło bądź czegoś brakuje, <br> opisz problem, a my zajmiemy się nim natychmiast.</span>
                    </v-card-text>

                    <v-container fluid>
                        <v-textarea
                            label="Twój e-mail"
                            name="input-5-1"
                            variant="outlined"
                            rows="1"
                            auto-grow
                            v-model="userEmail"
                        ></v-textarea>

                        <v-textarea
                            label="Opis problemu"
                            name="input-7-1"
                            variant="outlined"
                            rows="5"
                            auto-grow
                            v-model="problemDescription"
                        ></v-textarea>
                    </v-container>
            
                    <v-card-actions class="form-actions">

                        <div class="buttons">
                            <v-btn 
                                prepend-icon="mdi-check"
                                text="Wyślij"
                                variant="text"
                                color="teal-accent-4"
                                class="dialog-btn"
                                @click="submitReport"
                            ></v-btn>
                            <v-btn
                                prepend-icon="mdi-cancel"
                                color="red-accent-3"
                                text="Anuluj"
                                variant="text"
                                class="dialog-btn"
                                @click="reveal = false"
                            ></v-btn>
                        </div>
                    </v-card-actions>
                    </v-card>
                </v-expand-transition>
                </v-card>
            </v-dialog>
        </div>
      </v-container>
    </v-app>

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
  
  <script >
  import { reportIssue, retrieveAllRoomsDetails } from "../../data/database.js";
  import { useDisplay } from 'vuetify';

    export default {
        data() {
            return {
                rooms: [],
                filterCapacityMin: '',
                filterCapacityMax: '',
                filterCapacity: [0, 300],
                filterComputer: false,
                dialog: false,
                selectedRoom: {},
                reveal: false,
                userEmail: "",
                problemDescription: "",
                snackbar: false,
                snackbarMessage: "",
                isMobile: false 
            };
        },
        methods: {
            openDialog(room) {
                this.selectedRoom = room;
                this.dialog = true;
            },
            closeDialog() {
                this.dialog = false
                this.reveal = false
            },
            goToCalendar() {
                this.$router.push({ path: `/calendar/${this.selectedRoom.roomNumber}` });
            },

            submitReport() {
            
            try {
                if (!this.userEmail || !this.problemDescription) {
                    this.snackbarMessage = "Wypełnij wszystkie pola"
                    this.snackbar = true
                    return
                }
                reportIssue(this.selectedRoom.roomNumber, this.userEmail, this.problemDescription)
                this.snackbarMessage = "Wysłano, dziękujemy za zgłoszenie"
                this.snackbar = true
            } catch (error) {
                this.snackbarMessage = "Wystąpił problem z wysłaniem zgłoszenia, spróbuj ponownie"
                this.snackbar = true
                console.error("Błąd przy wysłaniu zgłoszenia: ", error)
            }
                this.reveal = false;
            },
            handleEscape() {
                this.reveal = false
            }
        },
        computed: {
            filteredRooms() {
                let filtered = this.rooms;

                if (this.filterCapacity[0]) {
                    filtered = filtered.filter(room => room.numberOfPlaces >= this.filterCapacity[0])
                }

                if (this.filterCapacity[1]) {
                    filtered = filtered.filter(room => room.numberOfPlaces <= this.filterCapacity[1]);
                }

                if (this.filterComputer) {
                    filtered = filtered.filter(room => room.computers === true);
                }

                return filtered;
            }
        },
        mounted() {
            const { mobile } = useDisplay();
            this.isMobile = mobile.value

            retrieveAllRoomsDetails()
                .then(roomsData => {
                    this.rooms = Object.values(roomsData)
                    console.log("Rooms loaded successfully", roomsData);
                })
                .catch(err => {
                    console.error(err);
                })
        },
    }
  </script>
  
<style scoped>
.elevation-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

header {
    padding: 0rem 0 1rem 0;
}

.container {
    padding: 3rem 0;
}

h1 {
    font-weight: 400;
}

.table {
    border-radius: 4px;
    border: 1px solid rgba(128, 128, 128, 0.326);
}

thead {
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    background-color: rgba(0, 0, 0, 0.768);
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* Light grey */
}

.btn {
    font-size: 0.8rem;
}

.filter {
    display: flex;
    gap: 0.6rem;
}

.mobile-filter {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.number-input {
    border: 1px solid rgba(128, 128, 128, 0.403);
    border-radius: 2px;
    padding: 0.2rem;
    width: 7%;
}

.filter p {
    font-size: 1.2rem;
}

.check-input {
    cursor: pointer;
}

.text-left {
    text-align: left;
    border-radius: 10px;
    overflow: auto;
    min-height: 57vh;
}

.header {
    text-align: center;
}

.arr-btn {
    position: absolute;
    left: 1rem;
    top: 1rem;
}

.content {
    width: 70vw;
    margin: 0 auto;
}

.arr-btn:hover {
    color: rgba(80, 88, 243, 0.79);
}

p {
    line-height: 2.8rem;
    font-size: 1.1rem;
}

.details {
    padding: 2rem 3rem;
}

h1, h2 {
    padding: 0.4rem 0;
}

h3 {
    font-weight: 400;
}

hr {
    margin: 0.6rem;
    border-color: rgba(0, 0, 0, 0.191);
}

.buttons {
    display: flex;
    margin: 1rem;
    justify-content: center;
    gap: 10%;
    width: 100%;
}

span {
    display: inline-block;
    margin-top: 1rem;
    font-size: 1.1rem;
    font-style: italic;
    color: rgba(0, 0, 0, 0.545);
}

.expand {
    padding: 2rem;
    text-align: center;
}

.computer-classes-filter {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.7rem;
    height: 3rem;
}

.check-input {
    padding: 0.2rem;
    width: 1em;
    border: 2px solid black;
}

.list {
    text-align: center;
}

.details {
    min-width: 40vw;
}

@media screen and (max-width: 800px) {
    .content {
        width: 90vw;
        margin: 0 auto;
    }

    .details {
        padding: 1rem 0;
    }

    .details li {
        list-style-type: none;
        line-height: 0.1rem;
    }
    
    .details p {
        line-height: 1.8rem;
        font-size: 0.9rem;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        width: 60%;
        margin: auto;
        padding-bottom: 1rem;
    }

    .buttons .v-btn {
        font-size: 0.8rem;
    }

    .issue-info {
        font-size: 0.9rem;
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

}

</style>
  