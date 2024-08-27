import dotenv from "dotenv";

// Load env file
dotenv.config();

const getEnv = (key: string) => {
  const value = process.env[key];

  if (typeof value !== "string") {
    throw new Error(`Not found value with key from env file, key: ${key}`);
  }

  return value;
};

export const ENV_PORT = Number(getEnv("API_PORT"));
export const ENV_DB = {
  HOST: getEnv("DB_HOST"),
  PORT: Number(getEnv("DB_PORT")),
  DB_NAME: getEnv("DB_NAME"),
  USERNAME: getEnv("DB_USERNAME"),
  PASSWORD: getEnv("DB_PASSWORD"),
};
export const ENV_JWT_SECRET = getEnv("JWT_SECRET");
