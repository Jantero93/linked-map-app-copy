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
        <v-form ref="formRef" v-model="valid" @submit.prevent="onSubmit">
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[
              (v: string) =>
                (v.length > 0 && v.length < 20) || 'Field is required'
            ]"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[
              (v: string) =>
                (v.length > 0 && v.length < 20) || 'Field is required'
            ]"
            required
          />
          <v-card-actions class="d-flex">
            <v-btn
              class="bg-green-darken-1"
              type="submit"
              text="Log in"
              size="large"
              rounded="sm"
            />
            <v-btn
              class="bg-red-darken-1"
              text="Close"
              size="large"
              rounded="sm"
              :loading="storeIsLoading"
              @click="closeDialog"
            />

            <span v-show="storeError" class="mx-auto text-red font-weight-bold">
              {{ storeError }}
            </span>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineModel, nextTick } from 'vue';
import { VForm } from 'vuetify/lib/components/index.mjs';
import { useUIStore } from '@/store/stores/uiStore';
import { postLogin } from '@/store/actions/authActions';
import { storeToRefs } from 'pinia';

const uiStore = useUIStore();
const { isLoading: storeIsLoading, error: storeError } =
  storeToRefs(useUIStore());

const showDialog = defineModel<boolean>({ required: true });
const valid = ref(false);
const username = ref('');
const password = ref('');
const formRef = ref<InstanceType<typeof VForm> | null>(null);

const clearFormAndErrors = async () => {
  username.value = password.value = '';

  await nextTick();

  if (formRef.value) {
    formRef.value.resetValidation();
  }
  uiStore.clearError();
};

const closeDialog = async () => {
  showDialog.value = false;
  await clearFormAndErrors();
};

const onSubmit = async () => {
  const isInputValid = (await formRef.value?.validate())?.valid;
  if (!isInputValid) return;

  const isSuccess = await postLogin(username.value, password.value);
  if (isSuccess) {
    closeDialog();
  }
};
</script>
