import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";

const registerCors = (fastify: FastifyInstance) =>
  fastify.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

export default registerCors;
