import { Submission, SubmissionStatus, ISubmissionData} from "../models/submission.model";

export interface ISubmissionRepository {
    create(submissionData: Partial<ISubmissionData>): Promise<ISubmissionData>;
    findById(id: string ): Promise<ISubmissionData | null>;
    findByProblemId(problemId: string): Promise<ISubmissionData[]>;
    deleteById(id: string): Promise<boolean>;
    updateStatus(id: string, status: SubmissionStatus, submissionData?: ISubmissionData  ): Promise<ISubmissionData | null>;
}

export class SubmissionRepository implements ISubmissionRepository {

    async create(submissionData: Partial<ISubmissionData>): Promise<ISubmissionData> {
        const newSubmission = await Submission.create(submissionData);
        return newSubmission;
    }
    
    async findById(id: string): Promise<ISubmissionData | null> {
        const submission = await Submission.findById(id);
        return submission;
    }

    async findByProblemId(problemId: string): Promise<ISubmissionData[]> {
        const submissions = await Submission.find({problemId});
        return submissions;
    }

    async deleteById(id: string): Promise<boolean> {
        const deletedSubmission = await Submission.findByIdAndDelete(id);
        return !!deletedSubmission;
    }

    async updateStatus(id: string, status: SubmissionStatus, submissionData?: ISubmissionData): Promise<ISubmissionData | null> {
        const updatedSubmission = await Submission.findByIdAndUpdate(id, {status, submissionData}, {new: true});
        return updatedSubmission;
    }
}