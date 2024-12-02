import {Request, Response} from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {   
    const {name, email, age} = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            message: 'Name, email and age are required'
        })
    }
    const newUser = new User({name, email, age});
    const savedUser = await newUser.save();
    res.status(201).json({
        message: 'User created successfully',
        user: savedUser})
}
    catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({
                message : 'Cette adresse email existe deja'
            })
        }
        console.log(error)
        return res.status(500).json({
            message: 'Error creating user',
            error: error.message
        })
}}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const updates = req.body
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, updates, {new: true});

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        res.status(200).json({message: 'User updated successfully', user: user})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
        
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        res.status(200).json({message: 'User deleted successfully', user: user})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
    }