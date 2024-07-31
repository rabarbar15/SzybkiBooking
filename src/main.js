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

  };
  
initializeApp(firebaseConfig);
// importDataFromFiles()

createApp(App)
    .use(vuetify).use(router)
    .mount('#app')

