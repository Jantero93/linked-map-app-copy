import App from './App.vue';
import { createApp } from 'vue';
import { router } from './routes';
import './app.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'vuetify/styles';

import { createPinia } from 'pinia';

// OpenLayer
import 'ol/ol.css';

// Register services
createApp(App).use(router).use(pinia()).use(vuetify()).mount('#app');

// Initialization functions
function pinia() {
  return createPinia();
}

function vuetify() {
  return createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi }
    },
    components,
    directives
  });
}
