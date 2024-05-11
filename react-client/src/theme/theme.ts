import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export type ThemeType = PaletteMode;

export const createModeTheme = (mode: ThemeType) =>
  createTheme({
    palette: {
      mode,
    },
  });
