<template>
  <v-dialog
    v-model="showDialog"
    class="border-b-md mdi-box-shadow"
    persistent
    max-width="400px"
    opacity="50%"
  >
    <v-sheet>
      <v-card class="mx-auto pa-8" title="Login">
        <v-form v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[(v) => !!v || 'Field is required']"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[(v) => !!v || 'Field is required']"
            required
          />
          <v-card-actions>
            <v-btn
              class="bg-green-darken-1"
              type="submit"
              text="Log in"
              size="large"
              rounded="sm"
            />
            <v-spacer />
            <v-btn
              class="bg-red-darken-1"
              text="Close"
              size="large"
              rounded="sm"
              :loading="isLoading"
              @click="showDialog = false"
            />
          </v-card-actions>
        </v-form>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineModel, watch } from 'vue';
import { useUIStore } from '@/store/stores/uiStore';
import { postLogin } from '@/store/actions/authActions';

const { isLoading } = useUIStore();

const showDialog = defineModel<boolean>({ required: true });
const valid = ref(false);
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const formRef = ref<HTMLFormElement | null>(null);

watch(showDialog, (newVal: boolean) => {
  if (!newVal) {
    username.value = '';
    password.value = '';
    confirmPassword.value = '';
  }
});

const onSubmit = async () => {
  if (formRef.value) {
    formRef.value.validate();
  }

  if (valid.value) {
    const message = await postLogin(username.value, password.value);
    if (message === 'Login successful') showDialog.value = false;
    //TODO: Add something to ui if login fails
  }
};
</script>
