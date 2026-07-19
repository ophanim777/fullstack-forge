import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost, 
    getPosts,  
    getPost, 
    updatePost, 
    deletePost, } from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", authenticate, createPost);

router.patch("/:id", authenticate, updatePost);

router.delete("/:id", authenticate, deletePost);

export default router;