import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "@/theme/theme";
import { FALLBACK_THEME } from "@/utilities/env";
import LocalStorageService from "@/services/LocalStorageService";

// INFO: ViewCompany just for testing purposes, not actual component
export type ControlViewComponent = "AddCompany" | "ViewCompany";

interface UiState {
  selectedTheme: ThemeType;
  isLoading: boolean;
  error: string | null;
  openSnackbar: boolean;
  snackbarText: string | null;
  selectedControlViewComponent: ControlViewComponent | null;
}

const initialState: UiState = {
  selectedTheme:
    LocalStorageService.getThemeFromLocalStorage() ?? FALLBACK_THEME,
  isLoading: false,
  error: null,
  openSnackbar: false,
  snackbarText: null,
  selectedControlViewComponent: null,
};

export const generalUiSlice = createSlice({
  name: "ui-slice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.selectedTheme = action.payload;
      LocalStorageService.setThemeToLocalStorage({ theme: action.payload });
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
    setControlViewComponent: (
      state,
      action: PayloadAction<ControlViewComponent>
    ) => {
      state.selectedControlViewComponent = action.payload;
    },
    clearControlViewComponent: (state) => {
      state.selectedControlViewComponent = null;
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
  setControlViewComponent,
  clearControlViewComponent,
} = generalUiSlice.actions;

export default generalUiSlice.reducer;
