const getEnv = (key: string) => {
  const value = import.meta.env[key];

  if (typeof value !== "string") {
    throw new Error(`Not found value with key: [${key}]`);
  }

  return value;
};

export const API_URL = getEnv("VITE_API_URL");
export const API_LOGIN_URL = getEnv("VITE_API_LOGIN_URL");
export const OPENIDDICT_CLIENT_ID = getEnv("VITE_OPENIDDICT_CLIENT_ID");
export const OPENIDDICT_GRANT_TYPE = getEnv("VITE_OPENIDDICT_GRANT_TYPE");
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
