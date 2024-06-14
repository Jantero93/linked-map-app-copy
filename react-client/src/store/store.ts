import { configureStore } from "@reduxjs/toolkit";
// Reducers
import uiReducer from "@/store/slices/generalUiSlice";
import uiMapReducer from "@/store/slices/uiMapSlice";
import authReducer from "@/store/slices/authSlice";
import companyReducer from "@/store/slices/companySlice";

// Middleware
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
    ui: uiReducer,
    uiMap: uiMapReducer,
    auth: authReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showSnackbarRejectedActionMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
