import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";

let validateQuery = (filterClass: any) => 
{
    return async (req: Request, res: Response, next: any) => 
    {        
        const filter: any = plainToClass(filterClass, req.query, { excludeExtraneousValues: true });
        let errors = await validate(filter, { skipMissingProperties: true });
        if(errors.length > 0)
            return res.status(400).json(errors.map(x => x.constraints));

        res.locals.filter = filter;        
        next();
    }
}

export default validateQuery;