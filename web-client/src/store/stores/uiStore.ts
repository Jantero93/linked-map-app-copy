import { defineStore } from 'pinia';
import {
  LocalStorageKeys,
  getFromLocalStorage,
  setToLocalStorage
} from '@/utilities/localStorageHelpers';

const themeFromLocalStorage =
  getFromLocalStorage<ThemeType>(LocalStorageKeys.Theme) ?? 'light';

export type ThemeType = 'dark' | 'light';

interface UIState {
  isLoading: boolean;
  error: string | null;
  appTheme: ThemeType;
}

const getInitialState = (): UIState => ({
  isLoading: false,
  error: null,
  appTheme: themeFromLocalStorage
});

export const useUIStore = defineStore('ui', {
  state: (): UIState => getInitialState(),
  actions: {
    setIsLoading(loading: boolean) {
      this.isLoading = loading;
    },
    setError(msg: string) {
      this.error = msg;
    },
    clearError() {
      this.error = null;
    },
    setAppTheme(theme: ThemeType) {
      setToLocalStorage(LocalStorageKeys.Theme, theme);
      this.appTheme = theme;
    }
  }
});
