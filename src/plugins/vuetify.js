// src/plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { pl } from 'vuetify/locale';

const vuetify = createVuetify({
  locale: {
    locale: 'pl',
    fallback: 'en',
    messages: { pl },
  },
});

export default vuetify;
