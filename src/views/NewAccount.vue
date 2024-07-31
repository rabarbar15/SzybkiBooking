<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'
import AdminSidebar from '../components/AdminSidebar.vue';


const email = ref("");
const password = ref("");
const passwordConfirm = ref("")
const router = useRouter();
const snackbar = ref(false)
const errMsg = ref("");

const register = () =>{

  if (password.value !== passwordConfirm.value) {
        errMsg.value = 'Passwords do not match';
        snackbar.value = true;
        return;
    }
 
 const auth = getAuth();
 createUserWithEmailAndPassword(auth, email.value, password.value)
     .then((data) => {
         console.log("Successfully registered");
         console.log(data);
         console.log(auth.currentUser);
         router.push('/admin-panel')
     })
     .catch((error) => {
         console.log(error.code);
         switch (error.code){
                case "auth/invalid-email":
                    errMsg.value = "Invalid email";
                    break;
                case "auth/email-already-in-use":
                    errMsg.value = "Email already in use";
                    break;
                case "auth/weak-password":
                    errMsg.value = "Weak password";
                    break;
                default:
                    errMsg.value = "Registration failed";
                    break;
            }
            snackbar.value = true
     });
};

</script>

<template>
    <div class="container">
        <h1>Utwórz nowe konto</h1>

        <v-card class="panel">
            
            <div class="form">

                <div class="form-field">
                    <label for="secondName">Email:</label>
                    <input type="text" id="email" v-model="email">
                </div>

                <div class="form-field">
                    <label for="oldPassword">Hasło:</label>
                    <input type="password" id="password" v-model="password">
                </div>

                <div class="form-field">
                    <label for="passwordConfirm">Powtórz hasło:</label>
                    <input type="password" id="passwordConfirm" v-model="passwordConfirm">
                </div>
            </div>

            <v-btn class="edit-btn" @click="register">Zatwierdź</v-btn>

            <AdminSidebar />
        </v-card>
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
    min-height: 80vh;
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

h1 {
    font-weight: 400;
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
  