import { ThemeType } from '@/theme';

type Primitive = null | undefined | boolean | number | bigint | string | symbol;
/**
 * Non-primitive values. Easier to work with JSON.parse (e.g. strings got extra quotes).
 * Exclude null, undefined, boolean, number, bigint, string, symbol
 */
type LocalStorageValue<T> = Exclude<T, Primitive>;

export type TokenLocalStorage = {
  /**
   * Access token used for authentication
   */
  accessToken: string;
  /**
   * String in ISO format
   */
  expiresIn: string;
};

export type UserPreferences = {
  theme: ThemeType;
};

export const LocalStorageKeys = {
  Token: 'token',
  Theme: 'theme'
} as const;

export const getFromLocalStorage = <T>(
  key: keyof typeof LocalStorageKeys
): T | null => {
  const item = localStorage.getItem(key);
  if (item === null) return null;

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    return null;
  }
};

export const setToLocalStorage = <T>(
  key: keyof typeof LocalStorageKeys,
  value: LocalStorageValue<T>
) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    error instanceof Error ? error.message : 'No specific error message';
    throw new Error(
      `Failed to set value to local storage, error:
      ${error instanceof Error ? error.message : 'No specific error message'}`
    );
  }
};

export const removeFromLocalStorage = (
  ...keys: (keyof typeof LocalStorageKeys)[]
) => keys.forEach((key) => localStorage.removeItem(LocalStorageKeys[key]));
