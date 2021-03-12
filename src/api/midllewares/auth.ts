import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config";

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization;
        if(!token)
            return res.status(400).json({message: "Missing Authorization header."});

        if(Array.isArray(token) || !token.toString().startsWith("Bearer "))
            return res.status(400).json({message: "Wrong format of authorization token."});

        token = token.replace("Bearer ", "");
        
        jwt.verify(token, JWT_KEY!, (err, decoded) => {
            if(err)
                return res.status(401).json({message: "Invalid token."});

            res.locals.user = decoded;
            next();
        });      
    }
};

export default auth;