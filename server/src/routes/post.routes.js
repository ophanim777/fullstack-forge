import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost, getPosts, } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);

router.post("/", authenticate, createPost);

export default router;