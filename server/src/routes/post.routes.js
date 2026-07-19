import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost } from "../controllers/post.controller.js";

const router = Router();

router.post("/", authenticate, createPost);

export default router;