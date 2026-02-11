import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.config";
 type AnyZodObject = ZodObject<any>;

/**
 * Middleware to validate request body against a zod schema
 * @param schema - zod schema to validate request body
 * @returns Express middleware function
 */

export const validateRequestBody = (schema: AnyZodObject) =>{

    return async(req:Request, res:Response, next:NextFunction) => {
        try{
              await schema.parseAsync(req.body);
              logger.info("Validation successful");
               next();
        }catch(error){
            // if the validation fails
           res.status(400).json({
                message: "Invalid request body",
                success: false,
                error: error
           });

        }
    }
}

export const validateRequestQuery = (schema: AnyZodObject) =>{
    return async(req:Request, res:Response, next:NextFunction) => {
        try{
              await schema.parseAsync(req.query);
              logger.info("Validation successful");
               next();
        }catch(error){
            // if the validation fails
            res.status(400).json({
                message: "Invalid request query",
                success: false,
                error: error
           });
        }
    }   
}


