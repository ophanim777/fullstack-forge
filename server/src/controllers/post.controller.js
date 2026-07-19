import { createPostSchema } from "../validators/post.validator.js";
import { createPost as createPostService, 
  getAllPosts, 
  getPostById, } from "../services/post.service.js";

export async function createPost(req, res, next) {
  try {
    const body = createPostSchema.parse(req.body);

    const post = await createPostService(req.user.id, body);

    res.status(201).json({
      success: true,
      message: "Post berhasil dibuat.",
      post,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPosts(req, res, next) {
  try {
    const posts = await getAllPosts();

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPost(req, res, next) {
  try {
    const post = await getPostById(req.params.id);

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
}