import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByUsername = async (username: string) =>
  await prisma.user.findUnique({ where: { username } });

export const createNewUser = async (username: string, hashedPassword: string) =>
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
