import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "@/store/actions/authActions";
import {
  LocalStorageKeys,
  TokenLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utilities/localStorageHelpers";
import { utcTimeWitAddedSeconds } from "@/utilities/dateHelpers";
import { RootState } from "../store";

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

      const { access_token, expires_in } = action.payload;
      const { accessToken, expiresIn } = setAuthInfoToLocalStorage(
        access_token,
        expires_in
      );

      state.accessTokenExpiresDate = expiresIn;
      state.accessToken = accessToken;
      state.error = null;
      state.loading = false;
      state.loggedIn = true;
    });
    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.loggedIn = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.error.message ?? "Error on logging out";
      state.accessToken = null;
      state.accessTokenExpiresDate = null;
      state.loading = false;
      state.accessTokenExpiresDate = null;
      clearAuthInfoLocalStorage();
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.accessToken = null;
      state.accessTokenExpiresDate = null;
      state.error = null;
      state.loading = false;
      state.loggedIn = false;

      clearAuthInfoLocalStorage();
    });
  },
});

export const isUserLoggedIn = (s: RootState) => s.auth.loggedIn;

// Helper
const setAuthInfoToLocalStorage = (
  accessToken: string,
  expiresIn: number
): TokenLocalStorage => {
  const expiresInUtcIsoString = utcTimeWitAddedSeconds(expiresIn);

  const localStorageAuth: TokenLocalStorage = {
    accessToken,
    expiresIn: expiresInUtcIsoString,
  };

  setToLocalStorage(LocalStorageKeys.Token, localStorageAuth);

  return localStorageAuth;
};

function clearAuthInfoLocalStorage(): void {
  removeFromLocalStorage("Token");
}

export default authSlice.reducer;
