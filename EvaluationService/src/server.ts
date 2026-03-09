import express from 'express';
import  {serverConfig} from "./config/index";
import v1Router from "./routers/v1/index.router";
import v2Router from "./routers/v2/index.router";
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import {  attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { startWorkers } from './workers/evaluation.worker';
import { pullAllImages } from './utils/containers/pullimage.util';
// import { runCode } from './utils/containers/codeRunner.util';
// import { PYTHON_IMAGE,CPP_IMAGE } from './utils/containers/../constants';
const app = express();

app.use(express.json());
/**
 * registering routes and there corresponding route without app server object
 */
app.use(attachCorrelationIdMiddleware);


app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); // just for testing purpose we are using v1 router for v2 also


/**
 * registering error middleware
 */
app.use(genericErrorHandler);
app.listen(serverConfig.PORT, async () => {
  logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Ctrl+C to stop the server`);
  await startWorkers();
  logger.info(`Evaluation worker started`);

  await pullAllImages();
  console.log("Image pulled successfully");

  // await testPyThonCode();
  // await testCppCode();
});

// async function testPyThonCode(){
//   const pythonCode = `print("Hello world")`;
//   // take the python code dump in the file ansd run the pyrhon file in the docker container
//   await runCode({
//     code:pythonCode,
//     language:"python",
//     timeout:5000,
//     imageName:PYTHON_IMAGE,
//     input:"6"
//   });
// }

// async function testCppCode(){
//   const cppCode = `#include <iostream>
//   int main(){
//     int n;
//     std::cin>>n;
//     std::cout<<n*n<<std::endl;
//     return 0;
//   }`;
//   await runCode({
//     code:cppCode,
//     language:"cpp",
//     timeout:5000,
//     imageName:CPP_IMAGE,
//     input:"7"
//   });
// }