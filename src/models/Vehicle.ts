import { model, Schema } from "mongoose";
import { IVehicle } from "../types/IVehicle";

const vehicleSchema = new Schema(
    {
        make: {
            type: String,
            required: true
        },
        vmodel: {
            type: String, 
            required: true
        },
        year: {
            type: String,
            required: true
        }
    }
);

export default model<IVehicle>("Vehicle", vehicleSchema, "Vehicle");