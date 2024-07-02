import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import User, {IUser} from '../models/user';
import dotenv from "dotenv";

export const authenticateUser = async(req:Request, res:Response, next:NextFunction):Promise<void>=>{
    try {
        const token = req.cookies?.authToken;
        if(!token){
            res.status(401).json({error:'Unauthorized. Token empty'});
            return;
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {_id:string};
        const user = await User.findById(decoded._id);
        if (!user){
            res.status(401).json({error:'Unauthorized. User not found'});
            return;
        }
        req.user = user; //Attach user object to request
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ error: 'Unauthorized Error in Middleware' });
    }
}
