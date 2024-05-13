import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { ThemeType } from "@/theme/theme";
import {
  LocalStorageTheme,
  getFromLocalStorage,
  setToLocalStorage,
} from "@/utilities/localStorageHelpers";
import { FALLBACK_THEME } from "@/utilities/env";

interface UiState {
  selectedTheme: ThemeType;
  isLoading: boolean;
  error: string | null;
  openSnackbar: boolean;
  snackbarText: string | null;
}

const initialState: UiState = {
  selectedTheme: getThemeFromLocalStorage() ?? FALLBACK_THEME,
  isLoading: false,
  error: null,
  openSnackbar: false,
  snackbarText: null,
};

export const exampleSlice = createSlice({
  name: "ui-slice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.selectedTheme = action.payload;
      // Save to local storage
      saveThemeLocalStorage(action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, actions: PayloadAction<{ message: string }>) => {
      state.error = actions.payload.message;
    },
    setSnackbarText: (state, actions: PayloadAction<string>) => {
      state.snackbarText = actions.payload;
      state.openSnackbar = true;
    },
    clearSnackbar: (state) => {
      state.snackbarText = null;
      state.openSnackbar = false;
    },
  },
});

export const {
  clearError,
  setTheme,
  setIsLoading,
  setError,
  setSnackbarText,
  clearSnackbar,
} = exampleSlice.actions;

export const getSelectedTheme = (s: RootState) => s.ui.selectedTheme;

// Create object typesSelector for snackbar
const snackbarOpen = (s: RootState) => s.ui.openSnackbar;
const snackbarMessage = (s: RootState) => s.ui.snackbarText;
export const getSnackbarState = createSelector(
  [snackbarOpen, snackbarMessage],
  (snackbarOpen, snackbarMessage) => ({
    snackbarOpen,
    snackbarMessage,
  })
);

// Helpers
function getThemeFromLocalStorage(): ThemeType | null {
  const storageTheme = getFromLocalStorage<LocalStorageTheme>("Theme");
  return storageTheme?.theme ?? null;
}

function saveThemeLocalStorage(theme: ThemeType): void {
  const themeObject: LocalStorageTheme = {
    theme,
  };

  setToLocalStorage("Theme", themeObject);
}

export default exampleSlice.reducer;
