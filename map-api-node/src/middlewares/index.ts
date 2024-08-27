import registerCors from "./cors";
import helmet from "@fastify/helmet";
import registerJwt from "./jwt-plugin";
import { FastifyInstance } from "fastify";
import registerErrorHandles from "./error-handlers";

const registerMiddlewares = async (fastify: FastifyInstance) => {
  registerErrorHandles(fastify);
  registerCors(fastify);
  registerJwt(fastify);
  fastify.register(helmet, { global: true });
};

export default registerMiddlewares;
