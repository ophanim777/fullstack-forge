import { prisma } from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";
import { ApiError } from "../utils/apiError.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";

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
  throw new ApiError(
    409,
    "Email atau username sudah digunakan."
  );
}

export async function loginUser(data) {

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