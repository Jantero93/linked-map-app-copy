<template>
  <v-app id="app" full-height class="app">
    <!-- Navigation bar -->
    <v-app-bar border="lg" density="compact" color="primary">
      <v-toolbar-title>My Vue App</v-toolbar-title>
      <v-switch
        class="text-capitalize"
        :label="currentTheme"
        inset
        @click="toggleTheme"
      />
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-col class="text-center text-md-end">
        <span class="text-body-1">{{ footerText }}</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import {
  getFromLocalStorage,
  setToLocalStorage,
  LocalStorageKeys
} from './utilities/localStorageHelpers';
import { ThemeType } from './theme';

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

const footerText = ref(`© Jantero93 ${new Date().getFullYear()}`);
</script>
