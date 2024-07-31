import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import { importDataFromFiles } from '../data/database'
import 'vuetify/styles';
import { pl } from 'vuetify/locale';

import { initializeApp } from "firebase/app";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'primeicons/primeicons.css'
import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
    components,
    directives,
    locale: {
      locale: 'pl',
      fallback: 'en',
      messages: { pl },
    },
})  

const firebaseConfig = {
    apiKey: "AIzaSyBGw5FiTQdR3yrcmcsBZHoppdAjxZ8i6VI",
    authDomain: "classreservations-10585.firebaseapp.com",
    databaseURL: "https://classreservations-10585-default-rtdb.firebaseio.com",
    projectId: "classreservations-10585",
    storageBucket: "classreservations-10585.appspot.com",
    messagingSenderId: "1034868512",
    appId: "1:1034868512:web:7ea653b63a79d68669e945"
  };
  
initializeApp(firebaseConfig);
// importDataFromFiles()

createApp(App)
    .use(vuetify).use(router)
    .mount('#app')

