export const getFromLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item === null) return null;

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    return null;
  }
};

export const setToLocalStorage = (key: string, value: unknown): void => {
  const stringified = JSON.stringify(value);
  try {
    if (stringified === undefined) {
      throw new Error(`Failed to stringify value to local storage: ${value}`);
    }

    localStorage.setItem(key, stringified);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'No specific error message';
    throw new Error(`Failed to set value to local storage, error: ${errorMsg}`);
  }
};

export const LocalStorageKeys = {
  Token: {
    AccessToken: 'access_token',
    ExpiresIn: 'expires_in'
  },
  Theme: 'theme'
} as const;
