export interface TestCase {
    _id: string;
    input: string;
    output: string;
}
export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    editorials: string;
    testcases: TestCase[];
    createdAt: Date;
    updatedAt: Date;
}
export interface EvaluationJobData {
    submissionId: string;
    code: string;
    language: "python" | "cpp";
    problem: Problem;
}
export interface EvaluationResult{
    status: string;
    output:string | undefined;
}
