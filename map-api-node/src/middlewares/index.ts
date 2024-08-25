import { FastifyInstance } from "fastify";
import registerCors from "./cors";
import helmet from "@fastify/helmet";

const registerMiddlewares = (fastify: FastifyInstance) => {
  registerCors(fastify);
  fastify.register(helmet, { global: true });
};

export default registerMiddlewares;
