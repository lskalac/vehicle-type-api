import { injectable } from "tsyringe";
import User from "../models/User";
import { IUser } from "../types/IUser";

@injectable()
export default class UserService
{
    GetByUsernameAsync = async (username: string): Promise<IUser | null> =>
    {
        return User.findOne({username: username});
    }

    PostAsync = (user: IUser): Promise<IUser> => 
    {
        return User.create(user);
    }
}