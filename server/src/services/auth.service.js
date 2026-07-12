import { prisma } from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";

export async function registerUser(data) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username }
      ],
    },
  });

  if (existingUser) {
    throw new Error("Email atau username sudah digunakan.");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
}