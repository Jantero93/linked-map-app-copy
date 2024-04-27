// src/stores/countStore.ts
import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  state: () => ({
    count: 0
  }),
  getters: {
    getCount: (state) => state.count
  },
  actions: {
    increment() {
      this.count += 1;
    }
  }
});
