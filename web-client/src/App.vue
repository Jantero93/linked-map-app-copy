<template>
  <v-app class="app" theme="uiStore.theme">
    <!-- Top Navigation Bar -->
    <v-app-bar color="primary" dark>
      <v-toolbar-title>My Vue App</v-toolbar-title>
      <v-switch
        :label="`Theme: ${isDarkSelected ? 'Dark' : 'Light'}`"
        v-model="isDarkSelected"
        inset
      ></v-switch>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless>
      <v-col class="text-center"> © {{ currentYear }} My Company </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import {
  getFromLocalStorage,
  setToLocalStorage
} from './utilities/localStorageHelpers';
import { LocalStorageKeys } from './utilities/constants';

const theme = useTheme();
const localStorageTheme =
  getFromLocalStorage<'dark' | 'light'>(LocalStorageKeys.Theme) ?? 'light';
const isDarkSelected = ref(localStorageTheme === 'dark');

// Directly bind theme change to `isDarkSelected`
watch(
  isDarkSelected,
  (newValue) => {
    const newTheme = newValue ? 'dark' : 'light';
    theme.global.name.value = newTheme;
    setToLocalStorage(LocalStorageKeys.Theme, newTheme);
  },
  { immediate: true }
);

const currentYear = ref(new Date().getFullYear());
</script>

<style>
#app {
  padding: 100;
}
</style>
