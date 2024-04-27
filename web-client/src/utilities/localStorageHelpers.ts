export const getFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    return null;
  }
};

export const setToLocalStorage = (key: string, value: unknown) => {
  const stringified = JSON.stringify(value);
  try {
    if (stringified === undefined) {
      throw new Error(`Failed to stringy value to local storage: ${value}`);
    }

    localStorage.setItem(key, stringified);
  } catch (error) {
    const originalErrorMsg =
      error instanceof Error ? error.message : 'No specific error message';
    throw new Error(
      `Failed to set value to local storage, error: ${originalErrorMsg}`
    );
  }
};

export type LocalStorageTheme = 'dark' | 'light';
