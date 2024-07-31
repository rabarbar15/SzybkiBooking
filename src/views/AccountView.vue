<script setup>
import { onMounted, ref } from 'vue';
import { changeUserPassword, deleteUserAccount, getCurrentUser } from '../../data/database';
import AdminSidebar from '../components/AdminSidebar.vue';
import { useRouter } from 'vue-router';

const user = ref(null)
const oldPassword = ref("")
const newPasswordConfirm = ref("")
const newPassword = ref("")
const errMsg = ref("")
const snackbar = ref(false)
const dialog = ref(false)
const router = useRouter()
const confirmDeleteAccountPassword = ref("")

const fetchCurrentUser = () => {
    getCurrentUser()
      .then((data) => {
        user.value = data
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      })
};

const handleChangePassword = async () => {
    if (user.value.email === "admin@gmail.com") {
        errMsg.value = "Niestety, nie można zmienić hasła głównego konta admin."
        snackbar.value = true
        return
    }

    if (newPassword.value !== newPasswordConfirm.value) {
        errMsg.value = 'Passwords dont match';
        snackbar.value = true;
        return;
    }

    try {
        await changeUserPassword(oldPassword.value, newPassword.value)
        errMsg.value = 'Zmieniono hasło'
        snackbar.value = true
    } catch (err) {
        switch (err.code){
            case "auth/weak-password":
                errMsg.value = "Weak password";
                break;
            case "auth/invalid-credential":
                errMsg.value = "Invalid password";
                break;
            default:
                errMsg.value = "Error";
                break;
            }
        snackbar.value = true
    }
}

const handleDeleteAccount = async () => {
    if (user.value.email === "admin@gmail.com") {
        errMsg.value = "Niestety, głównego konta admin nie można usunąć."
        snackbar.value = true
        dialog.value = false
        return
    }

    try {
        await deleteUserAccount(confirmDeleteAccountPassword.value)
        router.push('/');
        console.log("Account deleted successfully");
    } catch (err) {

        switch (err.code){
            case "auth/weak-password":
                errMsg.value = "Słabe hasło";
                break;
            case "auth/invalid-credential":
                errMsg.value = "Nieprawidłowe hasło";
                break;
            case "auth/missing-password":
                errMsg.value = "Wymagane jest hasło"
                break
            default:
                errMsg.value = "Błąd";
                break;
        }
        snackbar.value = true;
    } finally {
        dialog.value = false;
    }
}

onMounted(() => {
  fetchCurrentUser()
})

</script>

<template>
    <div class="container">

        <v-card class="panel">
        <h2>Zmień hasło</h2>

            <v-card-title>Email: {{ user ? user.email : '' }}</v-card-title>
            
            <div class="form">

                <div class="form-field">
                    <label for="oldPassword">Stare hasło:</label>
                    <input type="password" id="oldPassword" v-model="oldPassword">
                </div>

                <div class="form-field">
                    <label for="newPassword">Nowe hasło:</label>
                    <input type="password" id="newPassword" v-model="newPassword">
                </div>

                <div class="form-field">
                    <label for="newPasswordConfirm">Powtórz nowe hasło:</label>
                    <input type="password" id="newPasswordConfirm" v-model="newPasswordConfirm">
                </div>
            </div>

            <v-btn class="edit-btn" @click="handleChangePassword">Zatwierdź</v-btn>

            <AdminSidebar />
        </v-card>
        <br>
        <v-btn color="red" @click="dialog = true">Usuń moje konto</v-btn>

        <v-dialog
            v-model="dialog"
            width="auto"
        >
        <v-card
            max-width="400"
            prepend-icon="mdi-alert"
            text="Czy na pewno chcesz usunąć swoje konto?"
            title="Usuwanie konta"
        >
            <template v-slot:actions>

                <div class="dialog-content">
                    <v-text-field
                        type="password"
                        label="Wprowadź hasło"
                        v-model="confirmDeleteAccountPassword"
                        required
                    ></v-text-field>

                    <v-divider></v-divider>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
            
                        <v-btn
                            text="Anuluj"
                            variant="plain"
                            @click="dialog = false"
                        ></v-btn>
            
                        <v-btn
                            color="primary"
                            text="Zatwierdź"
                            variant="tonal"
                            @click="handleDeleteAccount"
                        ></v-btn>
                        
                    </v-card-actions>
                </div>
            </template>
        </v-card>
        </v-dialog>
    </div>

    <v-snackbar
    v-model="snackbar"
  >
    {{ errMsg }}

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
    padding: 4rem 2rem;
    text-align: center;
    min-height: 70vh;
}

.container h1 {
    padding-bottom: 2rem;
}

.panel {
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

h2, .v-card-title {
    font-weight: 400;
}

.dialog-content {
    padding: 0 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.edit-btn {
    font-size: 0.8rem;
    margin: auto;
    text-align: center;
}

.dialog-actions {
    display: flex;
    flex-direction: column;

}


</style>
  