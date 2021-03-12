import { IsDefined } from "class-validator";

export default class UserLogin
{
    @IsDefined()
    username: string;

    @IsDefined()
    password: string;
}