import { createMemoryHistory, createRouter } from 'vue-router';

// Views
import TestView from '../views/TestView.vue';
import AboutView from '../views/AboutView.vue';

export const Route = {
  Root: '/',
  About: '/about'
} as const;

const routes = [
  { path: Route.Root, component: TestView },
  { path: Route.About, component: AboutView }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
