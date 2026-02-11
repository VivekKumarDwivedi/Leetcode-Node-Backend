import { v4 as uuidV4 } from 'uuid';
import { NextFunction, Request, Response} from 'express';
import { asyncLocalStorage } from '../utils/helpers/request.helper';
// Middleware to attach a correlation ID to each request and response
export const attachCorrelationIdMiddleware = (req:Request, res:Response, next:NextFunction) => {
    // Generate a new UUID for the correlation ID
     const correlationId = uuidV4();
        
     req.headers['x-correlation-id'] = correlationId;
    // Call the next middleware or route handler
      
      asyncLocalStorage.run( { correlationId: correlationId},()=>{
       next();
      });
        
      

    
}