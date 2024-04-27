// Vue
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import 'vuetify/styles';
import { createPinia } from 'pinia';

const pinia = createPinia();

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
});

// Register services
createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
