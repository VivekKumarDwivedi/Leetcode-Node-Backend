import {Job, Worker} from "bullmq";
import {SUBMISSION_QUEUE} from "../utils/constants";
import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";
import { EvaluationJobData, TestCase, EvaluationResult } from "../interfaces/evaluation.interface";
import { runCode } from "../utils/containers/codeRunner.util";
import { LANGUAGE_CONFIG } from "../config/language.config";
import { updateSubmission } from "../apis/submission.api";

function matchTestCasesWithResult(testCases: TestCase[],results: EvaluationResult[]){
    const output: Record<string, string> = {};
         if(results.length !== testCases.length){
                console.log("NA");
                return;
            }
         testCases.map((testCase, index) =>{
            let retval ="";
           if(results[index]?.status === "time_limit_exceeded"){
            retval = "TLE";
           }else if(results[index]?.status === "failed"){
            retval = "Error";
           }else{
            // match
            if(results[index]?.output === testCase.output){
                retval = "AC";
            }else{
              retval = "WA";
            }
           }
           output[testCase._id] = retval;
          });
          return output;
}
async function setupEvaluationWorker(){
    const worker = new Worker(SUBMISSION_QUEUE,async (job:Job)=>{
        logger.info(`Processing job ${job.id}`);
        const data:EvaluationJobData = job.data;
        console.log("Data:",data);

        try {
            const testCasesRunnerPromise = data.problem.testcases.map(testcase =>{
                return runCode({
                    code: data.code,
                    language: data.language,
                    timeout: LANGUAGE_CONFIG[data.language].timeout,
                    imageName: LANGUAGE_CONFIG[data.language].imageName,
                    input: testcase.input || ""
                });
            });        
            const testCasesRunnerResults: EvaluationResult[] = await Promise.all(testCasesRunnerPromise);
            console.log("Test cases runner results:",testCasesRunnerResults);

            const output = matchTestCasesWithResult(data.problem.testcases,testCasesRunnerResults);
            console.log("Output:",output);

            await updateSubmission(data.submissionId,"COMPLETED",output || {});
        } catch (error) {
            logger.error(`Error running code: ${error}`);
            return;
        }
       
    },{
        connection: createNewRedisConnection()
    });
    worker.on("error",(error) =>{
        logger.error(`Evalutaion worker error: ${error}`);
    });
     worker.on("completed",(job) =>{
        logger.error(`Evalutaion job completed: ${job}`);
    });
     worker.on("failed",(job,error) =>{
        logger.error(`Evalutaion job failed: ${job}`,error);
    });

}

export async function startWorkers(){
    await setupEvaluationWorker();
}