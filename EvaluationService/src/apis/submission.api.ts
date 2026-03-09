import axios from "axios";
import { serverConfig } from "../config";
import { InternalServerError} from "../utils/errors/app.error";
import logger from "../config/logger.config";

export async function updateSubmission(submissionId: string,status: string, output: Record<string, string>): Promise<void>{

    try{
        const url = `${serverConfig.SUBMISSION_SERVICE}/submissions/${submissionId}/status`;
        logger.info(`Updating submission ${submissionId} with status ${status} Id ${url}`);

       const response= await axios.patch(url, {
            status: status,
            submissionData: output
        });
      
        if(response.status !==200){
            throw new InternalServerError("Failed to update submission")
        }  
        console.log("Submission updated successfully", response.data);
       return;

    } catch(error){
        logger.error(`Error updating submission ${submissionId}: ${error}`);
        throw new InternalServerError("Failed to update submission");
    }
    
}