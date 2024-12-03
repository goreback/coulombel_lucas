import {Request, Response} from "express";
import Post from "../models/Post";
import User from "../models/User";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.status(200).json(posts)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }    
}

export const createPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const {title, content, author} = req.body

        if (!title || !content || !author) {
            res.status(400).json({
                message: 'Title, content and author are required'
            })
            return;
        }

        const userExists = await User.findById(author);
        if (!userExists) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const post = new Post({title, content, author});
        const savedPost = await post.save();
        res.status(201).json({
            message: 'Post created successfully',
            post: savedPost
        });
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id).populate("author");
        res.status(200).json(post)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}   


export const updatePost = async (req: Request, res: Response) => {
    try {
        const updates = req.body
        const {id} = req.params

        const updatedPost = await Post.findByIdAndUpdate(id, updates, {new: true})
        if (!updatedPost) {
            res.status(404).json({
                message: 'Post not found'
            })
        }
        res.status(200).json(updatedPost)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const deletedPost = await Post.findByIdAndDelete(id)
        if (!deletedPost) {
            res.status(404).json({
                message: 'Post not found'
            })
        }
        res.status(200).json(deletedPost)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const searchPosts = async (req: Request, res: Response) => {
    try {
        const { q, startDate, endDate } = req.query

        const filter: Record<string, any> = {};

        if (q) {
            filter.$text = { $search: q };
        }

        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate as string);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate as string);
            }
        }
        const posts = await Post.find(filter).populate("author");
        res.status(200).json(posts)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

