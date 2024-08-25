import { FastifyInstance } from "fastify";

export const registerTestRoutes = (fastify: FastifyInstance) => {
  fastify.get("/ping", async (_request, _reply) => {
    const res = { message: "roger roger" };
    return res;
  });
};
