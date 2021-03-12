import { Document } from "mongoose";

export interface IVehicle extends Document
{
    make: string;
    vmodel: string;
    year: number;
}