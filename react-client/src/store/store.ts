import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "@/store/slices/exampleSlice";
import uiReducer from "@/store/slices/uiSlice";
import showSnackbarRejectedActionMiddleware from "@/store/middleware/showSnackBarRejectedActionMiddleware";

/**
 * Utilize RejectedActionPayload for rejecting actions.
 * The errorDescription field will be employed in Redux middleware
 * to relay error messages to a global snackbar,
 * providing feedback from the API to the end user.
 */
export type RejectedActionPayload = {
  errorDescription?: string;
};

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showSnackbarRejectedActionMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
