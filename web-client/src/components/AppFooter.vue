<template>
  <v-footer app fixed color="primary">
    <v-col class="text-center text-md-end">
      <span class="text-body-1">{{ footerText }}</span>
    </v-col>
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const footerText = ref(`© Jantero93 ${new Date().getFullYear()}`);
</script>
