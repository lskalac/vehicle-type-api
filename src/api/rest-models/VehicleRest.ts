import { Transform } from "class-transformer";
import { IsDefined, IsInt, IsString } from "class-validator";

export class VehicleRest
{
    @IsDefined()
    @IsString()
    make: string;

    @IsDefined()
    @IsString()
    model: string;
    
    @IsDefined()
    @IsInt()
    year: number;
}