import {Request, Response, NextFunction} from "express";
import { injectable } from "tsyringe";
import VehicleService from "../../services/VehicleService";
import { IVehicle } from "../../types/IVehicle";
import { v4 } from "uuid";
import Vehicle from "../../models/Vehicle";
import { VehicleRest } from "../rest-models/VehicleRest";

@injectable()
export class VehicleController
{
    private _vehicleService: VehicleService;

    constructor(vehicleService: VehicleService)
    {
        this._vehicleService = vehicleService;
    }

    FindAsync = async (req: Request, res: Response, next: NextFunction) => {
        const searchTerm = req.query.searchTerm?.toString();
        const page = !req.query.page || !isNaN(+req.query.page) ? 1 : Number(req.query.page);
        const rpp = !req.query.rpp || !isNaN(+req.query.rpp) ? 10 : Number(req.query.rpp);

        const result = await this._vehicleService.FindAsync(searchTerm, page, rpp);
        const count = await this._vehicleService.CountAsync(searchTerm);
        return res.status(200).json({
            total: count,
            items: result
        });
    }

    GetByAsync = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        
        const result = await this._vehicleService.GetAsync(id);
        if(!result)
            return res.status(404).json({message: "Vehicle not found."});

        return res.status(200).json(result);
    }
    
    PostAsync = async (req: Request, res: Response, next: NextFunction) => {
        const body: VehicleRest = res.locals.body;

        const vehicle: IVehicle = new Vehicle({
            id: v4(),
            make: body.make,
            model: body.model,
            year: body.year
        });
    }

    DeleteAsync = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const vehicle = await this._vehicleService.GetAsync(id);
        if(!vehicle)
            return res.status(404).json({message: "Vehicle not found."});

        const result = await this._vehicleService.DeleteAsync(id);
        if(!result)
            return res.status(500).end();

        return res.status(200).end();
    }
}