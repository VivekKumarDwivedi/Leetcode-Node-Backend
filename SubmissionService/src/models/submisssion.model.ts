import { Document ,Schema, model} from "mongoose";

export enum SubmissionStatus {
    PENDING = "pending",
    COMPILING = "compiling",
    RUNNING = "running",
    ACCEPTED = "accepted",
    WRONG_ANSWER = "wrong_answer"
}

export enum SubmissionLanguage {
    CPP = "cpp",
    PYTHON = "python",
    JAVA = "java",
    JAVASCRIPT = "javascript"    
}
export interface ISubmission extends Document {
    problemId: string;
    code: string;
    language: SubmissionLanguage;
    status:SubmissionStatus;
    createdAt: Date;
    updatedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
    problemId: {
         type: String, 
         required: [true, "Problem Id required for the submission"]
         },
    code: { 
        type: String, 
        required: [true,"Code is required for the evaluation"]
     },
    language: {
        type: String, // ✅ must be String
        required: [true, "Language is required"],
        enum: Object.values(SubmissionLanguage) // ✅ correct
    },
    status: { 
        type: String, 
        required: true,
        default: SubmissionStatus.PENDING,
        enum:Object.values(SubmissionStatus)
     },
   },{
    timestamps:true,
});

submissionSchema.index({status:1, createdAt:-1})
export const Submission = model<ISubmission>("Submission",submissionSchema);