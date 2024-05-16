import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { setTheme, getSelectedTheme } from "@/store/slices/uiSlice";
import { ThemeType } from "@/theme/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import LocalStorageService from "@/services/LocalStorageService";

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
    const storageTheme = LocalStorageService.getThemeFromLocalStorage();
    const effectiveTheme = storageTheme ?? (prefersDarkMode ? "dark" : "light");

    dispatch(setTheme(effectiveTheme));
  }, [dispatch, prefersDarkMode]);

  return currentTheme;
};
