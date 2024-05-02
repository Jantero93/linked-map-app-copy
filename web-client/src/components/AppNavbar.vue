<template>
  <v-app-bar class="app-bar-custom" app fixed border="sm" color="primary">
    <v-toolbar-title text="LinkedIn Copy" />
    <v-btn text="Home" to="/" />
    <v-btn text="About" to="/about" />
    <v-btn text="Map" to="/map" />
    <v-switch
      class="text-capitalize mx-4"
      :label="currentTheme"
      hide-details
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

<style scoped>
.v-toolbar__content > a {
  margin: 4px;
}
</style>
