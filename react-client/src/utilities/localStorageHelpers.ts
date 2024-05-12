import { ThemeType } from "@/theme/theme";
// Common types related to local storage

type Primitive = null | undefined | boolean | number | bigint | string | symbol;

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

/**
 * Retrieves a value from local storage and parses it as JSON.
 * @param key The key corresponding to the item in local storage.
 * @returns The parsed value as type T, or null if not found or parsing fails.
 */
export function getFromLocalStorage<T>(
  key: keyof typeof LocalStorageKeys
): T | null {
  const item = localStorage.getItem(key);

  try {
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    console.error(`Error parsing the local storage item "${key}".`);
    return null;
  }
}

/**
 * Saves a non-primitive value to local storage after stringifying it.
 * @param key The key under which to store the item.
 * @param value The value to store, must be non-primitive.
 * @throws Will throw an error if JSON.stringify fails.
 */
export function setToLocalStorage<T>(
  key: keyof typeof LocalStorageKeys,
  value: Exclude<T, Primitive>
): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(
      `Failed to serialize the value for local storage under key "${key}": ${error}`
    );
  }
}

/**
 * Removes one or more items from local storage.
 * @param keys The keys of the items to remove.
 */ export function removeFromLocalStorage(
  ...keys: (keyof typeof LocalStorageKeys)[]
): void {
  keys.forEach((key) => localStorage.removeItem(key));
}
