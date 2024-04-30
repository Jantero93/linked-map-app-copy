import { createMemoryHistory, createRouter } from 'vue-router';

// Views
import TestView from '../views/TestView.vue';
import AboutView from '../views/AboutView.vue';
import MapView from '../views/MapView.vue';

export const Route = {
  Root: '/',
  About: '/about',
  Map: '/map'
} as const;

const routes = [
  { path: Route.Root, component: TestView },
  { path: Route.About, component: AboutView },
  { path: Route.Map, component: MapView }
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
