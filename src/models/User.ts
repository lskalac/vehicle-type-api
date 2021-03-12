import { model, Schema } from "mongoose";
import { IUser } from "../types/IUser";

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        }
    }
);

export default model<IUser>("User", userSchema, "User");