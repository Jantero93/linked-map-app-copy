import { createTheme } from "@mui/material/styles";

export type ThemeType = "light" | "dark";

export const createModeTheme = (mode: ThemeType) =>
  createTheme({
    palette: {
      mode,
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
      },
    },
  });
