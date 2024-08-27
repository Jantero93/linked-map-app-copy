import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { registerUser } from "../services/auth-handlers";

export const registerAuthRoutes = (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/register",
    handler: async (
      request: FastifyRequest<{ Body: { username: string; password: string } }>,
      reply: FastifyReply,
    ) => {
      const { username, password } = request.body;
      if (!username || !password) {
        reply.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid email or password" });
      }

      const serviceRes = await registerUser(username, password);

      if (serviceRes) {
        reply.status(StatusCodes.OK).send({ message: "User registered successfully" });
      }

      reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "User registration failed" });
    },
  });
};
