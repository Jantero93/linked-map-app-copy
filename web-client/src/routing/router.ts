import { createRouter, createWebHistory } from 'vue-router';
import Route from '@/routing/routes';

// Views
import TestView from '@/views/TestView.vue';
import AboutView from '@/views/AboutView.vue';
import MapView from '@/views/MapView.vue';

const routes = [
  { path: Route.Root, component: TestView },
  { path: Route.About, component: AboutView },
  { path: Route.Map, component: MapView }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
