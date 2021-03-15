import { Types } from "mongoose";
import { injectable } from "tsyringe";
import Vehicle from "../models/Vehicle";
import { IVehicle } from "../types/IVehicle";

@injectable()
export default class VehicleService
{
    FindAsync = async (searchTerm: string = '', page: number = 1, rpp = 10): Promise<IVehicle[]>=> 
    {
        return Vehicle.find({
            $or:[
               {make:  {$regex: searchTerm, $options: "i"}},
               {model:  {$regex: searchTerm, $options: "i"}}
            ]
        })
        .sort({make: 1, model: 1, year: 1})
        .skip((page-1)*page)
        .limit(rpp);
    }

    CountAsync = async (searchTerm: string = ''): Promise<number>=> 
    {
        return Vehicle.count({
            $or:[
               {make:  {$regex: searchTerm, $options: "i"}},
               {model:  {$regex: searchTerm, $options: "i"}}
            ]
        })
    }
    GetAsync = async (id: string): Promise<IVehicle | null> => 
    {
        return Vehicle.findById(Types.ObjectId(id));
    }

    GetByName = async (make: string, model: string, year: number): Promise<IVehicle | null> => 
    {
        return Vehicle.findOne({make: make, model: model, year: year});
    }

    PostAsync = (make: string, model: string, year: number): Promise<IVehicle> => 
    {
        const schema: IVehicle = new Vehicle({
            make: make,
            vmodel: model, 
            year: year
        });
        
        return Vehicle.create(schema);
    }

    DeleteAsync = async (id: string): Promise<boolean> => 
    {
        const result = await Vehicle.deleteOne({_id: Types.ObjectId(id)});
        return result.deletedCount! > 0;
    }
}