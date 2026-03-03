import {createNewDockerContainer} from "./createContainer.util";
import { commands } from "./commands.util";
import { InternalServerError } from "../errors/app.error";

const allowedLanguages = ["python","cpp"];
export interface CodeRunnerOptions {
    code:string;
    language: "python" | "cpp";
    timeout:number;
    imageName:string;
}
export async function runCode(options:CodeRunnerOptions){
    const {code,language,timeout,imageName} = options;
   
    if(!allowedLanguages.includes(language)){
        throw new InternalServerError(`invaild language ${language}`);
    }
    const container = await createNewDockerContainer({
    imageName:imageName,
    cmdExecutable:commands[language](code),
    memoryLimit:1024*1024*1024, // 1GB
    });

    const timeLimitExceededTimeout = setTimeout(() => {
        console.log("Time limit exceeded");
        container?.kill();
    }, timeout);
    console.log("Container created successfully",container?.id);

    await container?.start();
    console.log("Container started successfully");
 
    const status  = await container?.wait();
    console.log("Container status",status);

    const logs = await container?.logs({
    stdout:true,
    stderr:true
    });

    console.log("Container logs",logs?.toString().trim());

    await container?.remove();

    clearTimeout(timeLimitExceededTimeout);
    if(status.StatusCode === 0){
        //success   
        console.log("Container executed successfully");
    } else {
        console.log("Container exited with error")
    }
}