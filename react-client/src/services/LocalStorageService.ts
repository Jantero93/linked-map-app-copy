import { utcTimeWitAddedSeconds } from "@/utilities/dateHelpers";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/services/basicLocalStorageActions";
import { ThemeType } from "@/theme/theme";

/**
 * Interface to save authentication information in local storage
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

export type LocalStorageTheme = { theme: ThemeType };

/**
 * Enum for local storage keys to prevent accidental overriding and ensure consistency.
 */
export const LocalStorageKeys = {
  Token: "Token",
  Theme: "Theme",
} as const;

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

const clearAuthInfoLocalStorage = () => removeFromLocalStorage("Token");

const LocalStorageService = {
  clearAuthInfoLocalStorage,
  setAuthInfoToLocalStorage,
};

export default LocalStorageService;
