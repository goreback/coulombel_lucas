import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config(); 
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const generateToken = (userId: string): string => {
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
}