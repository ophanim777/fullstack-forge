import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost, 
    getPosts,  
    getPost, 
    updatePost, } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", authenticate, createPost);

router.patch("/:id", authenticate, updatePost);

export default router;