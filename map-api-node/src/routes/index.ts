import { FastifyInstance } from "fastify";
import { registerTestRoutes } from "./test-route";

const registerRoutes = (fastify: FastifyInstance) => {
  registerTestRoutes(fastify);
};

export default registerRoutes;
