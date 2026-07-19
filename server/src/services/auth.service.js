import { prisma } from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";
import { ApiError } from "../utils/apiError.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";
import { verifyRefreshToken } from "../utils/jwt.js";

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


export async function loginUser(data) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Email atau password salah.");
  }

  const isPasswordMatch = await comparePassword(
    data.password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(401, "Email atau password salah.");
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user,
    accessToken,
    refreshToken,
  };

}

export async function refreshAccessToken(refreshToken) {
  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Refresh token tidak valid.");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    throw new ApiError(401, "User tidak ditemukan.");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return accessToken;
}