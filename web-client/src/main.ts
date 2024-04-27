// Vue
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";
import { store } from "./store";
import "./style.css";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "vuetify/styles";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi }
  },
  components,
  directives
});

createApp(App).use(router).use(store).use(vuetify).mount("#app");
