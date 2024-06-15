import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "@/theme/theme";
import { FALLBACK_THEME } from "@/utilities/env";
import LocalStorageService from "@/services/LocalStorageService";
import { RootState } from "../store";
import { ControlPanelComponents } from "@/views/mapView/componentMapping";

// INFO: ViewCompany just for testing purposes, not actual component
export type ControlViewComponent = keyof typeof ControlPanelComponents;

interface UiState {
  selectedTheme: ThemeType;
  isLoading: boolean;
  error: string | null;
  openSnackbar: boolean;
  snackbarText: string | null;
  selectedControlViewComponent: ControlViewComponent;
}

const initialState: UiState = {
  selectedTheme:
    LocalStorageService.getThemeFromLocalStorage() ?? FALLBACK_THEME,
  isLoading: false,
  error: null,
  openSnackbar: false,
  snackbarText: null,
  selectedControlViewComponent: "InitialView",
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
      state.selectedControlViewComponent = "InitialView";
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

export const selectedControllerComponent = (state: RootState) =>
  state.ui.selectedControlViewComponent;

export default generalUiSlice.reducer;
