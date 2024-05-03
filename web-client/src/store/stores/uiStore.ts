import { defineStore } from 'pinia';

interface UIState {
  isLoading: boolean;
  error: string | null;
}

const initialState: UIState = { isLoading: false, error: null };

export const useUIStore = defineStore('ui', {
  state: (): UIState => initialState,
  getters: {},
  actions: {
    setIsLoading(loading: boolean) {
      this.isLoading = loading;
    },
    setError(msg: string) {
      this.error = msg;
    }
  }
});
