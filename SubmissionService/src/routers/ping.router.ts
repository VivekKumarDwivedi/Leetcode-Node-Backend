import express from "express";
import  { pingHandler } from "../controllers/ping.controller";
import  { pingSchema } from "../validators/ping.validator";
import { validateRequestBody } from "../validators/index";
const pingRouter = express.Router();

pingRouter.post('/', validateRequestBody(pingSchema), pingHandler);


export default pingRouter;