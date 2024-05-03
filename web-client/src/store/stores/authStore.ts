import { defineStore } from 'pinia';
import {
  LocalStorageKeys,
  getFromLocalStorage
} from '@/utilities/localStorageHelpers';

interface AuthState {
  accessToken: string | null;
  expiresIn: Date | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => initialStateFromLocalStorage(),
  actions: {},
  getters: {
    userToken: ({ accessToken, expiresIn }: AuthState) => ({
      accessToken,
      expiresIn
    })
  }
});

/**
 * Gets ID token etc from local storage and initials state
 */
const initialStateFromLocalStorage = (): AuthState => {
  try {
    const accessToken = getFromLocalStorage<string>(
      LocalStorageKeys.Token.AccessToken
    );
    const expiresIn = getFromLocalStorage<Date>(
      LocalStorageKeys.Token.ExpiresIn
    );

    return {
      accessToken,
      expiresIn,
      isLoading: false,
      error: null
    };
  } catch (e) {
    return {
      accessToken: null,
      isLoading: false,
      expiresIn: null,
      error:
        e instanceof Error
          ? e.message
          : 'Error on getting token from local storage'
    };
  }
};
