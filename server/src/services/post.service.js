import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

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

export async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: {
      id,
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

  if (!post) {
    throw new ApiError(404, "Post tidak ditemukan.");
  }

  return post;
}


export async function updatePost(postId, userId, data) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new ApiError(404, "Post tidak ditemukan.");
  }

  if (post.authorId !== userId) {
    throw new ApiError(403, "Kamu tidak memiliki akses.");
  }

  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      content: data.content,
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