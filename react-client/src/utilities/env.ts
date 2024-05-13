import { ThemeType } from "@/theme/theme";

const getEnv = (key: string): string => {
  const value = import.meta.env[key];

  if (typeof value !== "string") {
    throw new Error(`Not found value with key: [${key}]`);
  }

  return value;
};

const getEnvThemeType = (key: string): ThemeType => {
  const value = import.meta.env[key];

  if (value === "dark") return "dark";
  if (value === "light") return "light";

  throw new Error(`Not found value with key: [${key}]`);
};

// Separate to app configuration file if this file starts to bloat...
export const API_URL = getEnv("VITE_API_URL");
export const API_LOGIN_URL = getEnv("VITE_API_LOGIN_URL");
export const OPENIDDICT_CLIENT_ID = getEnv("VITE_OPENIDDICT_CLIENT_ID");
export const OPENIDDICT_GRANT_TYPE = getEnv("VITE_OPENIDDICT_GRANT_TYPE");
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
export const FALLBACK_THEME = getEnvThemeType("VITE_FALLBACK_THEME");
