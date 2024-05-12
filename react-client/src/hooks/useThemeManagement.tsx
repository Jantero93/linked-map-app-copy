import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTheme, getSelectedTheme } from "@/store/slices/uiSlice";
import {
  LocalStorageTheme,
  getFromLocalStorage,
} from "@/utilities/localStorageHelpers";
import { ThemeType } from "@/theme/theme";

/**
 * General hook to initialize theme from saved preferences or user's os preferences
 * @returns Current theme from different sources.
 * Local storage -> user's os preference (if dark active --> dark, otherwise light theme)
 */
export const useThemeManagement = (): ThemeType => {
  const dispatch = useAppDispatch();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const currentTheme = useAppSelector(getSelectedTheme);

  useEffect(() => {
    const storageTheme = getFromLocalStorage<LocalStorageTheme>("Theme");

    const effectiveTheme =
      storageTheme?.theme ?? (prefersDarkMode ? "dark" : "light");

    dispatch(setTheme(effectiveTheme));
  }, [dispatch, prefersDarkMode]);

  return currentTheme;
};
