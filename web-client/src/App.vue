<template>
  <v-app id="app" full-height class="app">
    <app-navbar />
    <v-main class="fill-height pa-0 ma-0">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>
