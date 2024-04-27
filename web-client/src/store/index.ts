import { createStore } from "vuex/types/index.js";

export const store = createStore({
  state() {
    return {
      count: 1
    };
  }
});
