import { NextFunction, Request, Response } from "express";
import AppError from "../errors/BaseError";
import { InternalServerError } from "../errors/InternalServerError";

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: err.success,
            data: (err as any).data || null
        });
    } else {
        console.log("Unexpected error: ", err)
        return res.status(500).json({ 
            message: new InternalServerError().message, 
            success: false 
        });
    }
}


export default errorHandler;