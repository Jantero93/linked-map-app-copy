import { createMemoryHistory, createRouter } from 'vue-router';

import TestView from '../views/TestView.vue';
import AboutView from '../views/AboutView.vue';
import { Route } from '../utilities/constants';

const routes = [
  { path: Route.Root, component: TestView },
  { path: Route.About, component: AboutView }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
