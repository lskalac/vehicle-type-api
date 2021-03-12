import { IsDefined } from "class-validator";

export default class UserRegister
{
    @IsDefined()
    username: string;

    @IsDefined()
    password: string;
}