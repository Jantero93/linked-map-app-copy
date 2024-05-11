import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "@/store/slices/exampleSlice";
import uiReducer from "@/store/slices/uiSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
