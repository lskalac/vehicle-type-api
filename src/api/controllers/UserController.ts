import { Request, Response, NextFunction } from "express";
import UserLogin from "../rest-models/UserLogin";
import UserRegister from "../rest-models/UserRegister";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../../config";
import bcrypt from "bcrypt";
import UserService from "../../services/UserService";
import { IUser } from "../../types/IUser";
import User from "../../models/User";
import { injectable } from "tsyringe";
import AppLogger from "../../AppLogger";

@injectable()
export class UserController
{
    private _userService: UserService;

    constructor(userService: UserService)
    {
        this._userService = userService;
    }

    LoginAsync = async (req: Request, res: Response, next: NextFunction) => {
        const body: UserLogin = res.locals.body;

        try {
            const user = await this._userService.GetByUsernameAsync(body.username);
            if(!user)
                return res.status(404).json({message: "User not found."});
            
            const passwordMatch = await bcrypt.compare(body.password, user.passwordHash);
            if(!passwordMatch)
                return res.status(401).json({message: "Incorrect password."});
    
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, JWT_KEY!);
    
            return res.status(200).json({
                token: token
            });
        } catch (error) {
            AppLogger.Error(`Error logging user:`, error);
            return res.status(500).end();
        }
    }

    RegisterAsync = async (req: Request, res: Response, next: NextFunction) => {
        const body: UserRegister = res.locals.body;

        try {
            const existingUsername = await this._userService.GetByUsernameAsync(body.username);
            if(existingUsername != null)
                return res.status(409).json({message: "Username already exists."});
    
            const hPass = await bcrypt.hash(body.password, 10);
    
            const user: IUser = new User({
                username: body.username,
                passwordHash: hPass
            });
    
            const result = await this._userService.PostAsync(user);
            if(!result)
                return res.status(500).json({message: "Register failed."});
    
            return res.status(200).send();   
        } catch (error) {
            AppLogger.Error(`Error registering user:`, error);
            return res.status(500).end();
        }
    }
}