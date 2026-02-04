import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/app.error";

export const genericErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
      
    console.log(err);
    res.status(err.statusCode).json({
        message: err.message,
        success: false
    });
}