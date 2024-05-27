import { utcTimeWitAddedSeconds } from "@/utilities/dateHelpers";
import {
  removeFromLocalStorage,
  setToLocalStorage,
  getFromLocalStorage,
} from "@/services/basicLocalStorageActions";
import { ThemeType } from "@/theme/theme";

/**
 * Interface to save authentication information in local storage
 * @property {accessToken} Access token
 * @property {expiresIn} Expires time in utc string
 */
export interface TokenLocalStorage {
  /**
   * Access token used for authentication
   */
  accessToken: string;
  /**
   * String in ISO format
   */
  expiresIn: string;
}

/**
 * Object to store theme in local storage
 * @property {ThemeType} Theme type ("light" | "dark")
 */
export type LocalStorageTheme = { theme: ThemeType };

/**
 * String literals for local storage keys to ensure consistency.
 */
export const LocalStorageKeys = {
  Token: "Token",
  Theme: "Theme",
} as const;

/**
 * Gets authentication token from local storage.
 * @returns TokenLocalStorage | null
 */
const getTokenFromLocalStorage = (): TokenLocalStorage | null =>
  getFromLocalStorage<TokenLocalStorage>(LocalStorageKeys.Token);

/**
 * Gets theme type from local storage.
 * @returns ThemeType | null
 */
const getThemeFromLocalStorage = () =>
  getFromLocalStorage<LocalStorageTheme>(LocalStorageKeys.Theme)?.theme;

/**
 * Saves authentication information to local storage.
 * @param accessToken Access token
 * @param expiresIn Expires time in seconds
 * @returns TokenLocalStorage
 */
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

/**
 * Saves theme to local storage.
 * @param theme LocalStorageTheme
 */
const setThemeToLocalStorage = (theme: LocalStorageTheme): void =>
  setToLocalStorage(LocalStorageKeys.Theme, theme);

/**
 * Clears authentication information from local storage.
 */
const clearAuthInfoLocalStorage = (): void =>
  removeFromLocalStorage(LocalStorageKeys.Token);

const LocalStorageService = {
  clearAuthInfoLocalStorage,
  getTokenFromLocalStorage,
  getThemeFromLocalStorage,
  setAuthInfoToLocalStorage,
  setThemeToLocalStorage,
};

export default LocalStorageService;
