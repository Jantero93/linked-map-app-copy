import { Client } from "pg";
import fastify from "../fastify/fastify-server-instance";
import { ENV_DB } from "./env";

const { DB_NAME, HOST, PASSWORD, PORT, USERNAME } = ENV_DB;

// Pg driver
const createPgClient = () =>
  new Client({
    user: USERNAME,
    host: HOST,
    password: PASSWORD,
    port: PORT,
    database: "postgres",
  });

export const doesDatabaseExists = async () => {
  const client = createPgClient();

  try {
    await client.connect();

    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]);

    if (result.rows.length === 0) {
      fastify.log.warn(`Database ${DB_NAME} does not exist`);
      return false;
    }

    return true;
  } catch (err) {
    fastify.log.error(`Exception in checking does database exists: ${err}`);
    throw err;
  } finally {
    await client.end();
  }
};

export const createDatabase = async () => {
  const client = createPgClient();

  try {
    await client.connect();
    await client.query(`CREATE DATABASE "${DB_NAME}"`);

    fastify.log.info("Initialized new database");
  } catch (err) {
    fastify.log.error(`Exception on creating database: ${err}`);
  } finally {
    await client.end();
  }
};
