import { prisma } from "../config/prisma.js";

export async function createPost(userId, data) {
  return await prisma.post.create({
    data: {
      content: data.content,
      authorId: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
}

export async function getAllPosts() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
}