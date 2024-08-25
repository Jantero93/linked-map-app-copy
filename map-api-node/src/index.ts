import { FastifyListenOptions } from "fastify/types/instance";
import { ENV_PORT } from "./config/env";
import setupApi from "./api";
import fastify from "./fastify/fastify-server-instance";

const SERVER_OPTIONS: FastifyListenOptions = {
  port: ENV_PORT,
};

const start = async () => {
  // Throw error if no port set correctly, fastify will start hosting on random port
  if (!Number.isInteger(SERVER_OPTIONS.port)) {
    throw new Error(
      "Invalid API port value, not starting server. Check env configuration (API_PORT=)",
    );
  }

  try {
    const fastify = await setupApi();
    const path = await fastify.listen(SERVER_OPTIONS);
    fastify.log.info(`Server started on ${path}`);
  } catch (err) {
    fastify.log.error(`Exception in starting fastify: ${err}`);
    throw new Error("Failed to start server");
  }
};

start();
