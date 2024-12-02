import { Router } from "express";
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/postController";

const router = Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.put('/posts/:id', updatePost);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', deletePost);
export default router;
