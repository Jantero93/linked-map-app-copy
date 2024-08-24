import { FastifyListenOptions } from "fastify/types/instance";
import { ENV_PORT } from "./config/env";
import fastify from "./fastify/fastify-server-instance";
import "reflect-metadata";
import { AppDataSource } from "./config/database-config";

const SERVER_OPTIONS: FastifyListenOptions = {
  port: ENV_PORT,
};

const startFastify = async () => {
  // Throw error if no port set correctly, fastify will start hosting on random port
  if (!Number.isInteger(SERVER_OPTIONS.port)) {
    throw new Error("Invalid port, not starting server. Check env configuration (PORT=)");
  }

  try {
    await AppDataSource.initialize();
    fastify.log.info("Database connected");

    const path = await fastify.listen(SERVER_OPTIONS);
    return fastify.log.info(`Server started on ${path}`);
  } catch (err) {
    fastify.log.error(err);
    throw new Error("Failed to start server");
  }
};

// eslint-disable-next-line no-warning-comments
// TODO: Create controllers for routes, simple test route atm
fastify.get("/ping", async (_request, _reply) => {
  const res = { message: "roger roger" };
  return res;
});

startFastify();
