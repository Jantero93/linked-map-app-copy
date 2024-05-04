<template>
  <v-app-bar class="app-bar-custom" app fixed color="primary" border="sm">
    <v-toolbar-title text="LinkedIn Copy" />
    <v-btn text="Login" @click="showLoginDialog = true" />
    <v-btn text="Register" @click="showRegisterDialog = true" />
    <v-btn text="Home" to="/" />
    <v-btn text="About" to="/about" />
    <v-btn text="Map" to="/map" />
    <v-switch
      class="text-capitalize mx-4"
      :label="currentTheme"
      hide-details
      @click="toggleTheme"
    />
    <RegisterModal v-model="showRegisterDialog" />
    <LoginModal v-model="showLoginDialog" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { ThemeType } from '@/theme';
import {
  getFromLocalStorage,
  setToLocalStorage,
  LocalStorageKeys
} from '@/utilities/localStorageHelpers';
import RegisterModal from '@/components/navigationBar/RegisterModal.vue';
import LoginModal from '@/components/navigationBar/LoginModal.vue';

const showRegisterDialog = ref(false);
const showLoginDialog = ref(false);
const theme = useTheme();
const currentTheme = ref(getFromLocalStorage<ThemeType>('theme') ?? 'light');

watch(
  currentTheme,
  (newTheme) => {
    theme.global.name.value = newTheme;
    setToLocalStorage(LocalStorageKeys.Theme, newTheme);
  },
  { immediate: true }
);

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
};
</script>
