import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const registerTestRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/ping",
    handler: (_request: FastifyRequest, reply: FastifyReply) =>
      reply.status(200).send({ message: "Roger!" }),
  });
};
