import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { ThemeType } from "@/theme/theme";

interface UiState {
  selectedTheme: ThemeType;
  isLoading: boolean;
  error: string | null;
}

const initialState: UiState = {
  selectedTheme: "dark",
  isLoading: false,
  error: null,
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
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, actions: PayloadAction<string>) => {
      state.error = actions.payload;
    },
  },
});

export const { clearError, setTheme, setIsLoading, setError } =
  exampleSlice.actions;

export const getSelectedTheme = (s: RootState) => s.ui.selectedTheme;

export default exampleSlice.reducer;
