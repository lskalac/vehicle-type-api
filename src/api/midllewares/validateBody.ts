import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {Request, Response, NextFunction} from "express";

const validateBody = (classArg: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const rest = plainToClass(classArg, req.body);
        const errors = await validate(rest);
        if(errors.length > 0)
            return res.status(400).json(errors.map(x => x.constraints));

        res.locals.body = rest;
        next();
    }
};

export default validateBody;