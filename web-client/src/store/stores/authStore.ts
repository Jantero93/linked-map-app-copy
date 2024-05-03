import { defineStore } from 'pinia';
import {
  LocalStorageKeys,
  getFromLocalStorage
} from '@/utilities/localStorageHelpers';
import { useUIStore } from '@/store/stores/uiStore';

interface AuthState {
  accessToken: string | null;
  expiresIn: Date | null;
  isRegistrationSuccess: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    ...initialStateFromLocalStorage()
  }),
  actions: {
    setRegistrationSuccess(success: boolean) {
      this.isRegistrationSuccess = success;
    }
  }
});

/**
 * Gets ID token etc from local storage and initials state
 */
const initialStateFromLocalStorage = (): AuthState => {
  const { setError } = useUIStore();

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
      isRegistrationSuccess: !!accessToken && !!expiresIn
    };
  } catch (e) {
    setError('Failed to get token from local storage');
    return {
      accessToken: null,
      expiresIn: null,
      isRegistrationSuccess: false
    };
  }
};
