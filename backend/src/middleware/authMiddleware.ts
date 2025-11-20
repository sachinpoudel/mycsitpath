import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { unAuthorized } from '../utils/appError.js';


export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {

const headers = req.headers.authorization;

if(!headers) {
    throw new unAuthorized("No token provided");
}
const token = headers.split(' ')[1];
if(!token){
    throw new unAuthorized("No token provided");
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if(!decoded){
        throw new unAuthorized("Invalid token");
    }
(req as any).user = decoded;
next()
} catch (error) {
    next(new unAuthorized("Invalid or expired token"));
}
}