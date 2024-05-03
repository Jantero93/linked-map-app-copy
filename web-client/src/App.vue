<template>
  <v-app id="app" full-height>
    <AppNavigationBar />
    <v-main app>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppNavigationBar from '@/components/navigationBar/AppNavigationBar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style>
#app {
  height: 100vh;
}
</style>
