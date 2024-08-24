import { DataSource } from "typeorm";
import { ENV_DB } from "./env";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const { DB_NAME, HOST, PASSWORD, PORT, USERNAME } = ENV_DB;

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
