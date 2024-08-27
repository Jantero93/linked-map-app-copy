import { FastifyInstance } from "fastify";
import { registerTestRoutes } from "./test-route";

const registerRoutes = async (fastify: FastifyInstance) => {
  registerTestRoutes(fastify);
};

export default registerRoutes;
