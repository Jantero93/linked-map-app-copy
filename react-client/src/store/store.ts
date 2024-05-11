import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "@/store/slices/exampleSlice";
import uiReducer from "@/store/slices/uiSlice";
import errorHandlingMiddleware from "@/store/middleware/errorHandlingMiddleware";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorHandlingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
