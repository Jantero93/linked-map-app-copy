import registerCors from "./cors";
import helmet from "@fastify/helmet";
import registerJwt from "./jwt-plugin";
import { FastifyInstance } from "fastify";

const registerMiddlewares = async (fastify: FastifyInstance) => {
  registerCors(fastify);
  registerJwt(fastify);
  fastify.register(helmet, { global: true });
};

export default registerMiddlewares;
