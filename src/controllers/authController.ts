import {Request, Response} from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const {name, email, password, age} = req.body;

        if (!name || !email || !password || !age) {
            return res.status(400).json({
                message: 'Name, email, password and age are required'
    })}

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400).json({
          message: 'Email already used'  
        })
    }

    const newUser = new User({name, email, password, age});
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id as string);

    res.status(201).json({ message: 'User created successfully', token });

} catch (error: any) {
    res.status(500).json({message: error.message})
 
    }
}


export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid credentials'
            })
        }

        const token = generateToken(user._id as string);

        res.status(200).json({ message: 'Login successful', token });
} catch (error: any) {
    res.status(500).json({message: error.message})
}
}
