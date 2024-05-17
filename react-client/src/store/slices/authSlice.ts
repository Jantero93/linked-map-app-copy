import { createSlice } from "@reduxjs/toolkit";
import {
  forceLogoutUser,
  loginUser,
  logoutUser,
  registerUser,
  setUserLoggedIn,
} from "@/store/actions/authActions";
import { RootState } from "@/store/store";
import LocalStorageService from "@/services/LocalStorageService";

type AuthState = {
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
  accessTokenExpiresDate: string | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  loading: false,
  error: null,
  loggedIn: false,
  accessTokenExpiresDate: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "registered",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, _action) => {
      state.error = null;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message ?? "Error on registration";
      state.loading = false;
    });
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.loggedIn = false;
      state.accessTokenExpiresDate = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message ?? "Error on login";
      state.loading = false;
      state.loggedIn = false;
      state.accessTokenExpiresDate = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (!action.payload) return;

      const { accessToken, expiresIn } =
        LocalStorageService.setAuthInfoToLocalStorage(
          action.payload.access_token,
          action.payload.expires_in
        );

      state.accessTokenExpiresDate = expiresIn;
      state.accessToken = accessToken;
      state.error = null;
      state.loading = false;
      state.loggedIn = true;
    });
    builder.addCase(setUserLoggedIn, (state) => {
      state.loggedIn = true;
    });
    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      setCommonLogoutState(
        state,
        action.error.message ?? "Error on logging out"
      );
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      setCommonLogoutState(state);
    });
    builder.addCase(forceLogoutUser.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(forceLogoutUser.rejected, (state, action) => {
      setCommonLogoutState(
        state,
        action.error.message ?? "Error on logging out"
      );
    });
    builder.addCase(forceLogoutUser.fulfilled, (state) => {
      setCommonLogoutState(state);
    });
  },
});

export const isUserLoggedIn = (s: RootState) => s.auth.loggedIn;

// Helper
const setCommonLogoutState = (state: AuthState, error?: string) => {
  state.accessToken = null;
  state.accessTokenExpiresDate = null;
  state.error ? error : null;
  state.loading = false;
  state.loggedIn = false;

  LocalStorageService.clearAuthInfoLocalStorage();
};

export default authSlice.reducer;
