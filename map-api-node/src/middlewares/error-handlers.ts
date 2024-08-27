import { FastifyInstance } from "fastify";
import { StatusCodes } from "http-status-codes";

const registerErrorHandles = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error, _request, reply) => {
    fastify.log.error(error);
    reply.status(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  });
};

export default registerErrorHandles;
