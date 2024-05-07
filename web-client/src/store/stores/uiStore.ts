import { defineStore } from 'pinia';
import {
  UserPreferences,
  getFromLocalStorage,
  setToLocalStorage
} from '@/utilities/localStorageHelpers';

export type ThemeType = 'dark' | 'light';

const themeFromLocalStorage = (): ThemeType => {
  const userPreferences = getFromLocalStorage<UserPreferences>('Theme');
  return userPreferences?.theme ?? 'light';
};

interface UIState {
  isLoading: boolean;
  error: string | null;
  appTheme: ThemeType;
}

const getInitialState = (): UIState => ({
  isLoading: false,
  error: null,
  appTheme: themeFromLocalStorage()
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
      const preferences: UserPreferences = {
        theme
      };
      setToLocalStorage('Theme', preferences);
      this.appTheme = theme;
    }
  }
});
