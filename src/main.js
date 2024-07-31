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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
  
initializeApp(firebaseConfig);
// importDataFromFiles()

createApp(App)
    .use(vuetify).use(router)
    .mount('#app')

