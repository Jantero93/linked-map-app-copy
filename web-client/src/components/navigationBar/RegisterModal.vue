<template>
  <v-dialog
    v-model="showDialog"
    class="border-b-md mdi-box-shadow"
    persistent
    max-width="400px"
    opacity="50%"
  >
    <v-sheet>
      <v-card class="mx-auto pa-8" title="Register">
        <v-form ref="formRef" v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="username"
            :rules="[
              (v) => v.length >= 3 || 'Username must be at least 3 characters'
            ]"
            label="Username"
            required
            clearable
          />
          <v-text-field
            v-model="password"
            :rules="[
              (v) => v.length >= 3 || 'Password must be at least 3 characters'
            ]"
            label="Password"
            type="password"
            required
            clearable
          />
          <v-text-field
            v-model="confirmPassword"
            :rules="[(v) => v === password || 'Passwords must match']"
            label="Confirm Password"
            type="password"
            required
            clearable
          />
          <v-card-actions>
            <v-btn
              class="bg-green-darken-1"
              type="submit"
              text="Register"
              size="large"
              rounded="sm"
            />
            <v-spacer />
            <v-btn
              class="bg-red-darken-1"
              text="Close"
              size="large"
              rounded="sm"
              @click="showDialog = false"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineModel, onUpdated } from 'vue';

const showDialog = defineModel<boolean>({ required: true });
const valid = ref(false);
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const formRef = ref<HTMLFormElement | null>(null);

const onSubmit = async () => {
  if (formRef.value) {
    formRef.value.validate();
  }

  if (valid.value) {
    // API call logic here
    showDialog.value = false; // Close the dialog on successful registration
  }
};

onUpdated(() => {
  if (!showDialog.value) {
    username.value = '';
    password.value = '';
    confirmPassword.value = '';
  }
});
</script>
