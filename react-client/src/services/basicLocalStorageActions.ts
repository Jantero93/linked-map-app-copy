import { LocalStorageKeys } from "@/services/LocalStorageService";

type LocalStorageKey = keyof typeof LocalStorageKeys;

/**
 * Retrieves a value from local storage and parses it as JSON.
 * @param key The key corresponding to the item in local storage.
 * @returns The parsed value as type T, or null if not found or parsing fails.
 */
export const getFromLocalStorage = <T>(key: LocalStorageKey): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    console.error(`Error parsing the local storage item "${key}".`);
    return null;
  }
};

/**
 * Saves a non-primitive value to local storage after stringify it.
 * @param key The key under which to store the item.
 * @param value The value to store, must be non-primitive.
 * @throws Will throw an error if JSON.stringify fails.
 */
export const setToLocalStorage = <T>(key: LocalStorageKey, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(
      `Failed to serialize the value for local storage under key "${key}": ${error}`
    );
  }
};

/**
 * Removes one or more items from local storage.
 * @param keys The keys of the items to remove.
 */
export const removeFromLocalStorage = (...keys: LocalStorageKey[]): void =>
  keys.forEach(localStorage.removeItem);
