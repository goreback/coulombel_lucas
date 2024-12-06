import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(' ').filter(Boolean)[1];

        if (!token) {
            res.status(401).json({
                 message: 'Not authorized, no token'           
            })
            return;
    }

    const decoded: any = jwt.verify(token as string, JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
        res.status(401).json({
            message: 'Unauthorized: user not found'
        })
        return;
    }
    (req as any).user = {
        id: user._id}

    next();




} catch (error: any) {
    res.status(401).json({
        message: 'Not authorized, token failed'
    })
}
}