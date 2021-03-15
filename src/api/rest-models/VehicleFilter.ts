import { Expose, Transform } from "class-transformer";
import { IsNumberString, IsOptional } from "class-validator";

export default class VehicleFilter
{
    @Expose()
    @IsOptional()
    @IsNumberString()
    page: number;

    @Expose()
    @IsOptional()
    @IsNumberString()
    rpp: number;

    @Expose()
    @IsOptional()
    searchTerm: string;
}