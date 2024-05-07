<template>
  <v-app-bar app fixed color="primary" border="sm">
    <v-toolbar-title text="LinkedIn Copy" />
    <!-- Login, register, logout buttons  -->
    <v-btn
      v-if="!isLoggedIn"
      text="Register"
      @click="showRegisterDialog = true"
    />
    <v-btn v-if="!isLoggedIn" text="Login" @click="showLoginDialog = true" />
    <v-btn v-else text="Logout" @click="postLogout" />
    <!-- Navigation buttons -->
    <v-btn text="Home" to="/" />
    <v-btn text="Map" to="/map" />
    <v-switch
      v-model="selectedThemeSwitch"
      class="text-capitalize mx-4"
      false-value="light"
      true-value="dark"
      :label="selectedThemeSwitch"
      hide-details
    />
    <RegisterModal v-model="showRegisterDialog" />
    <LoginModal v-model="showLoginDialog" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import RegisterModal from '@/components/navigationBar/RegisterModal.vue';
import LoginModal from '@/components/navigationBar/LoginModal.vue';
import { storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';
import { ThemeType } from '@/theme';
import { useUIStore } from '@/store/stores/uiStore';
import { useAuthStore } from '@/store/stores/authStore';
import { postLogout } from '@/store/actions/authActions';

const vuetify = useTheme();
const { appTheme, setAppTheme } = useUIStore();
const { isLoggedIn } = storeToRefs(useAuthStore());

const selectedThemeSwitch = ref<ThemeType>('light');
const showRegisterDialog = ref(false);
const showLoginDialog = ref(false);

onBeforeMount(() => {
  selectedThemeSwitch.value = appTheme;
});

watch(selectedThemeSwitch, (newTheme) => {
  vuetify.global.name.value = newTheme;
  setAppTheme(newTheme);
});
</script>
