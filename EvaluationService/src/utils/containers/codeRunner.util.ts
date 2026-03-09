import {createNewDockerContainer} from "./createContainer.util";
import { commands } from "./commands.util";
import { InternalServerError } from "../errors/app.error";

const allowedLanguages = ["python","cpp"];
export interface CodeRunnerOptions {
    code:string;
    language: "python" | "cpp";
    timeout:number;
    imageName:string;
    input:string;
}
export async function runCode(options:CodeRunnerOptions){
    const {code,language,timeout,imageName,input} = options;
   
    if(!allowedLanguages.includes(language)){
        throw new InternalServerError(`invaild language ${language}`);
    }
    const container = await createNewDockerContainer({
    imageName:imageName,
    cmdExecutable:commands[language](code,input),
    memoryLimit:1024*1024*1024, // 1GB
    });

    let isTimeLimitExceeded = false;
    const timeLimitExceededTimeout = setTimeout(() => {
        console.log("Time limit exceeded");
        isTimeLimitExceeded = true;
        container?.kill();
    }, timeout);

    console.log("Container created successfully",container?.id);

    await container?.start();
    console.log("Container started successfully");
 
    const status  = await container?.wait();

     if(isTimeLimitExceeded){
        await container?.remove();
        return {
            status: "time_limit_exceeded",
            output: "Time limit exceeded"
        }
    }
    console.log("Container status",status);

    const logs = await container?.logs({
    stdout:true,
    stderr:true
    });

    console.log("Container logs",logs?.toString().trim());
    
    const containerLogs = processLogs(logs);
    console.log("container logs",containerLogs);

    await container?.remove();

    clearTimeout(timeLimitExceededTimeout);
    if(status.StatusCode === 0){
        //success   
        return {
            status: "success",
            output: containerLogs
        }
    } else {
        return {
            status: "failed",
            output: containerLogs
        }
    }
}

function processLogs(logs: Buffer | undefined){
    return logs?.toString("utf8")
    .replace(/\x00/g, '') // remove null bytes
    .replace(/[\x00-\x09\x0B-\x1F\x7F-\x9F]/g, '') // remove other control characters
    .trim();
}