import { createMemoryHistory, createRouter } from "vue-router";

import TestView from "../views/TestView.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  { path: "/", component: TestView },
  { path: "/about", component: AboutView }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
