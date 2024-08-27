import * as UserStore from "../stores/user-store";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const registerUser = async (username: string, password: string) => {
  const dbUser = await UserStore.getUserByUsername(username);

  if (!dbUser) {
    throw new Error("User exists already");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await UserStore.createNewUser(username, hashedPassword);

  if (newUser) return true;

  throw new Error("User creation failed");
};
