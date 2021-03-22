import {Request, Response, NextFunction} from "express";
import { injectable } from "tsyringe";
import VehicleService from "../../services/VehicleService";
import { VehicleRest } from "../rest-models/VehicleRest";
import VehicleFilter from "../rest-models/VehicleFilter";
import AppLogger from "../../AppLogger";

@injectable()
export class VehicleController
{
    private _vehicleService: VehicleService;

    constructor(vehicleService: VehicleService)
    {
        this._vehicleService = vehicleService;
    }

    FindAsync = async (req: Request, res: Response, next: NextFunction) => {
        const filter: VehicleFilter = res.locals.filter;

        try {
            const result = await this._vehicleService.FindAsync(filter.searchTerm, filter.page, filter.rpp);
            const count = await this._vehicleService.CountAsync(filter.searchTerm);
            return res.status(200).json({
                total: count,
                items: result
            });   
        } catch (error) {
            AppLogger.Error(`Error fetching vehicles`, error);
            return res.status(500).end();
        }
    }

    GetByAsync = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        
        try {
            const result = await this._vehicleService.GetAsync(id);
            if(!result)
                return res.status(404).json({message: "Vehicle not found."});
    
            return res.status(200).json(result);   
        } catch (error) {
            AppLogger.Error(`Error fetching vehicle: ${id}`, error);
            return res.status(500).end();
        }
    }
    
    PostAsync = async (req: Request, res: Response, next: NextFunction) => {
        const body: VehicleRest = res.locals.body;

        try {
            const existingVehicle = await this._vehicleService.GetByName(body.make, body.model, body.year);
            if(existingVehicle)
                return res.status(409).json({message: "Vehicle already exists."});

            const result = await this._vehicleService.PostAsync(body.make, body.model, body.year);
            if(!result)
                return res.status(500).end();
    
            return res.status(200).json(result);
        } catch (error) {
            AppLogger.Error(`Error creating vehicle: ${body.make} ${body.model} ${body.year}`,error);
            return res.status(500).end();
        }

    }

    DeleteAsync = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const vehicle = await this._vehicleService.GetAsync(id);
            if(!vehicle)
                return res.status(404).json({message: "Vehicle not found."});
    
            const result = await this._vehicleService.DeleteAsync(id);
            if(!result)
                return res.status(500).end();
    
            return res.status(200).end();   
        } catch (error) {
            AppLogger.Error(`Error deleting vehicle with id: ${id}`,error);
            return res.status(500).end();
        }
    }
}