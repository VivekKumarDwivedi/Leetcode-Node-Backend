import axios,{ AxiosResponse } from "axios";
import { serverConfig } from "../config";
import { InternalServerError,NotFoundError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export interface ITestCase{
    input: string;
    output: string;
}
export interface IProblemDetails{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    editorial: string;
    testcases: ITestCase[];
    createdAt: Date;
    updateAt: Date;
}

export interface IProblemResponse {
    data: IProblemDetails;
    message: string;
    success: boolean;
}
export async function getProblemById(problemId: string): Promise<IProblemDetails|null>{

    try {
         const response: AxiosResponse<IProblemResponse> =
            await axios.get(`${serverConfig.PROBLEM_SERVICE}/problems/${problemId}`);

            if (response.data.success) {
                return response.data.data;
            }

            throw new InternalServerError("Failed to get problem detail");
    } catch(error){
   const url = `${serverConfig.PROBLEM_SERVICE}/problems/${problemId}`;
    
    // Type guard to check if error has expected properties
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorResponse = (error as any).response;
    
    logger.error(`Failed to get problem details. URL: ${url}`, {
        error: errorMessage,
        status: errorResponse?.status,
        statusText: errorResponse?.statusText,
        url: url
    });
    
    if (errorResponse?.status === 404) {
        throw new NotFoundError(`Problem not found: ${problemId}`);
    } else if (errorResponse?.status >= 500) {
        throw new InternalServerError(`Problem service unavailable: ${errorMessage}`);
    } else {
        throw new InternalServerError(`Failed to fetch problem: ${errorMessage}`);
    }
    }
    
}