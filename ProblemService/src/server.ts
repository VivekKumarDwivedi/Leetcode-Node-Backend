import express from 'express';
import  {serverConfig} from "./config/index";
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import {  attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import problemRouter from './routers/v1/problem.router';
const app = express();

app.use(express.json());
/**
 * registering routes and there corresponding route without app server object
 */
app.use(attachCorrelationIdMiddleware);

app.use('/api/v1/problems', problemRouter);

/**
 * registering error middleware
 */
app.use(genericErrorHandler);
app.listen(serverConfig.PORT, () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server`);
});
