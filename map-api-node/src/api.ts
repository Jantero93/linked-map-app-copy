import { doesDatabaseExists, createDatabase } from "./config/database-config";
import fastify from "./fastify/fastify-server-instance";
import registerRoutes from "./routes";
import registerMiddlewares from "./middlewares";

const setupApi = async () => {
  if (!(await doesDatabaseExists())) {
    await createDatabase();
  }
  fastify.log.info("Database connected");

  registerMiddlewares(fastify);
  registerRoutes(fastify);

  return fastify;
};

export default setupApi;
