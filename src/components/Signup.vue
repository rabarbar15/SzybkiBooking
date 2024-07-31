<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

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
      <!-- <h1>Ustawienia konta</h1> -->

      <v-card class="login-field">
          <v-card-title><h3>Zarejestruj się</h3></v-card-title>
          
          <div class="form" @submit.prevent="register">

              <div class="form-field">
                  <label for="email">Email:</label>
                  <input type="text" id="email" v-model="email">
              </div>

              <div class="form-field">
                  <label for="secondName">Hasło:</label>
                  <input type="password" id="password" v-model="password">
              </div>

              <div class="form-field">
                <label for="secondName">Potwierdź hasło:</label>
                <input type="password" id="passwordConfirm" v-model="passwordConfirm">
            </div>

          </div>

          <v-btn class="login-btn" @click="register">Zarejestruj się</v-btn>

          <br>

          <button @click="router.push('/login')">
            <p class="signup-link">Masz już konto? Zaloguj się</p>
          </button>

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
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<style scoped>

.container {
  padding: 6rem;
  text-align: center;
}

.container h1 {
  padding-bottom: 2rem;
}

.login-field {
  padding: 2rem;
  background-color: rgba(128, 128, 128, 0.075);
  width: 30vw;
  margin: auto;
  text-align: center;
  border-radius: 10px;
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

.login-btn {
  font-size: 0.8rem;
  margin: auto;
  text-align: center;
}

.signup-link {
  padding-top: 1.2rem;
  color: #303030af;
}

</style>
