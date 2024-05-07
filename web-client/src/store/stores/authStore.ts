import { defineStore } from 'pinia';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
  TokenLocalStorage
} from '@/utilities/localStorageHelpers';
import {
  addToCurrentUtcTime,
  isTimeBeforeCurrentUtc,
  convertIsoStringToDate
} from '@/utilities/dateHelpers';

interface AuthState {
  accessToken: string | null;
  expiresIn: Date | null;
  isRegistrationSuccess: boolean;
}

const getInitialState = (): AuthState => {
  try {
    const token = getFromLocalStorage<TokenLocalStorage>('Token');

    if (token === null) {
      return {
        accessToken: null,
        expiresIn: null,
        isRegistrationSuccess: false
      };
    }

    const { accessToken, expiresIn } = token;

    return {
      accessToken,
      expiresIn: expiresIn === null ? null : convertIsoStringToDate(expiresIn),
      isRegistrationSuccess: !!accessToken && !!expiresIn
    };
  } catch (e) {
    return {
      accessToken: null,
      expiresIn: null,
      isRegistrationSuccess: false
    };
  }
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => getInitialState(),
  getters: {
    isLoggedIn: ({ accessToken, expiresIn }: AuthState): boolean => {
      if (!accessToken || !expiresIn) return false;
      if (isTimeBeforeCurrentUtc(expiresIn)) return false;

      return true;
    }
  },
  actions: {
    logOut() {
      this.accessToken = null;
      this.expiresIn = null;
      removeFromLocalStorage('Token');
    },
    setRegistrationSuccess(success: boolean) {
      this.isRegistrationSuccess = success;
    },
    setToken(accessToken: string, expiresIn: number) {
      const expiresInISODateString = addToCurrentUtcTime(expiresIn);

      const localStorageObject: TokenLocalStorage = {
        accessToken,
        expiresIn: expiresInISODateString
      };

      setToLocalStorage('Token', localStorageObject);

      this.accessToken = accessToken;
      this.expiresIn = convertIsoStringToDate(expiresInISODateString);
      this.isRegistrationSuccess = true;
    }
  }
});
