import { Router } from "express";
import {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    searchPosts
} from "../controllers/postController";
import { get } from "http";

const router = Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/search', searchPosts);
router.put('/posts/:id', updatePost);
router.get('/posts/:id', getPostById);
router.delete('/posts/:id', deletePost);    

export default router;
