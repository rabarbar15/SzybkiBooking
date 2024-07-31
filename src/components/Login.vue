<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router'

const password = ref("");
const router = useRouter();
const errMsg = ref("");
const snackbar = ref(false)

const login = () =>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed in");
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
                case "auth/user-not-found":
                    errMsg.value = "No account with that email found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Invalid password";
                    break;
                default:
                    errMsg.value = "Email or password was incorrect";
                    break;
            }
            snackbar.value = true
        });
};

</script>

<template>
  <div class="container">

      <v-card class="login-field">
          <v-card-title><h3>Zaloguj się</h3></v-card-title>
          
          <div class="form">
              <div class="form-field">
                  <label for="email">Email:</label>
                  <input type="text" id="email" v-model="email">
              </div>

              <div class="form-field">
                  <label for="secondName">Hasło:</label>
                  <input type="password" id="password" v-model="password">
              </div>

          </div>

          <v-btn class="login-btn" @click="login">Zaloguj się</v-btn>

          <br>

          <!-- <button @click="router.push('/signup')">
            <p class="signup-link">Nie masz jeszcze konta? Zarejestruj się</p>
          </button> -->
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
