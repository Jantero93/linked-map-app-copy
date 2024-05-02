<template>
  <v-app id="app" full-height>
    <AppNavbar />
    <v-main app>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style>
#app {
  height: 100vh;
}
</style>
