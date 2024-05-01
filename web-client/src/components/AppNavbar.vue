<template>
  <v-app-bar fixed app border="lg" density="compact" color="primary">
    <v-toolbar-title>My Vue App</v-toolbar-title>
    <v-btn to="/">Home</v-btn>
    <v-btn to="/about">About</v-btn>
    <v-btn to="/map">Map</v-btn>
    <v-switch
      class="text-capitalize"
      :label="currentTheme"
      inset
      @click="toggleTheme"
    />
  </v-app-bar>
</template>

<script setup lang="ts">
import { ThemeType } from '@/theme';
import {
  getFromLocalStorage,
  setToLocalStorage,
  LocalStorageKeys
} from '@/utilities/localStorageHelpers';
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const currentTheme = ref(getFromLocalStorage<ThemeType>('theme') ?? 'light');

watch(
  currentTheme,
  (newTheme: ThemeType) => {
    currentTheme.value = newTheme;
    theme.global.name.value = newTheme;
    setToLocalStorage(LocalStorageKeys.Theme, newTheme);
  },
  { immediate: true }
);

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
};
</script>
