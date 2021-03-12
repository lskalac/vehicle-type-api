import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export default class VehicleFilter
{
    @IsOptional()
    @Transform(value => value ? Number(value) : value)
    @IsInt()
    @Min(1)
    page: number;

    @IsOptional()
    @Transform(value => value ? Number(value) : value)
    @IsInt()
    @Min(1)
    rpp: number;

    @IsOptional()
    searchTerm: string;
}