import { Client } from "pg";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import fastify from "../fastify/fastify-server-instance";
import { ENV_DB } from "./env";

const { DB_NAME, HOST, PASSWORD, PORT, USERNAME } = ENV_DB;

// TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: PORT,
  database: DB_NAME,
  username: USERNAME,
  password: PASSWORD,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["src/data/models/*{.ts,.js}"],
});

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
