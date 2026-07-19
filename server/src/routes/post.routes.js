import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost, 
    getPosts,  
    getPost,} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", authenticate, createPost);

export default router;