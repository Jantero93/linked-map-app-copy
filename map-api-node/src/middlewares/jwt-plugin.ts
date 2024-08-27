import jwt from "@fastify/jwt";
import { ENV_JWT_SECRET } from "../config/env";
import { FastifyInstance } from "fastify";

const registerJwt = (fastify: FastifyInstance) => fastify.register(jwt, { secret: ENV_JWT_SECRET });

export default registerJwt;
