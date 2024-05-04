import { defineStore } from 'pinia';
import { useUIStore } from '@/store/stores/uiStore';
import {
  LocalStorageKeys,
  getFromLocalStorage,
  setToLocalStorage
} from '@/utilities/localStorageHelpers';
import {
  addToCurrentUtcTime,
  convertIsoStringToDate
} from '@/utilities/dateHelpers';

interface AuthState {
  accessToken: string | null;
  expiresIn: Date | null;
  isRegistrationSuccess: boolean;
}

const getInitialState = (): AuthState => {
  const { setError } = useUIStore();
  const { AccessToken, ExpiresIn } = LocalStorageKeys.Token;

  try {
    const accessToken = getFromLocalStorage<string>(AccessToken);
    const expiresIn = getFromLocalStorage<string>(ExpiresIn);

    return {
      accessToken,
      expiresIn: expiresIn === null ? null : convertIsoStringToDate(expiresIn),
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

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => getInitialState(),
  actions: {
    setRegistrationSuccess(success: boolean) {
      this.isRegistrationSuccess = success;
    },
    setToken(accessToken: string, expiresIn: number) {
      const expiresInISODateString = addToCurrentUtcTime(expiresIn);

      const { AccessToken, ExpiresIn } = LocalStorageKeys.Token;
      setToLocalStorage(AccessToken, accessToken);
      setToLocalStorage(ExpiresIn, expiresInISODateString);

      this.accessToken = accessToken;
      this.expiresIn = convertIsoStringToDate(expiresInISODateString);
      this.isRegistrationSuccess = true;
    }
  }
});
