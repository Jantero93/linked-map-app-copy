import { createRouter, createWebHistory } from 'vue-router';
import Route from '@/routing/routes';

// Views
import LandingPage from '@/views/LandingPage.vue';
import MapView from '@/views/MapView.vue';

const routes = [
  { path: Route.Root, component: LandingPage },
  { path: Route.Map, component: MapView }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
