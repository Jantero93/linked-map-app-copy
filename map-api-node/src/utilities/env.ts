import dotenv from "dotenv";

// Load env file
dotenv.config();

const getEnv = (key: string) => {
  const value = process.env[key];

  if (typeof value !== "string") {
    throw new Error(`Not found value with key from env file, key: { ${key} }`);
  }

  return value;
};

const getPort = () => {
  try {
    const portString = getEnv("PORT");
    const portNumber = Number(portString);

    if (Number.isNaN(portNumber)) {
      throw new Error(`Invalid port (PORT=) number in env variables, value: ${portNumber}`);
    }

    return portNumber;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Port what server is listening on
 */
export const PORT = getPort();
