import { doesDatabaseExists, createDatabase } from "./config/database-config";
import fastify from "./fastify/fastify-server-instance";
import declareRoutes from "./routes";
import declareMiddlewares from "./middlewares";

const setupApi = async () => {
  if (!(await doesDatabaseExists())) {
    await createDatabase();
  }
  fastify.log.info("Database connected");

  fastify.register(declareMiddlewares);
  fastify.register(declareRoutes, { prefix: "/api" });

  fastify.log.info("Plugins registered in Fastify");

  return fastify;
};

export default setupApi;
