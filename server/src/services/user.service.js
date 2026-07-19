import { prisma } from "../config/prisma.js";

export async function updateProfile(userId, data) {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data,

    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      bio: true,
      avatar: true,
      role: true,
    },
  });
}