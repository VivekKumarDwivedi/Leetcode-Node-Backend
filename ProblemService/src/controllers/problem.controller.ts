import { Request, Response} from "express";
import {  ProblemService } from "../services/problem.service";
import { ProblemRepository } from "../repositories/problem.repository";

const problemRepository = new ProblemRepository() // this is just for testing purpose, we will use dependency injection in router level
const problemService = new ProblemService(problemRepository) // this is just for testing purpose, we will use dependency injection in router level
export const  ProblemController = {
    
    async createProblem(req: Request, res: Response): Promise<void> {
            
          const problem = await problemService.createProblem(req.body);

          res.status(201).json({
            message: "Problem created successfully",
            data: problem,
            success: true
          });
    },

    async getProblemById(req: Request, res: Response): Promise<void> {
        const { id } = req.params; 
        if (!id) { 
            res.status(400).json({
                 message: "Problem ID is required", 
                 success: false 
                }); 
                return; 
            } 
        const problem = await problemService.getProblemById(id);
        res.status(200).json({
            message: "Problem fetched successfully",
            data: problem,
            success: true
        });
    },

    async getAllProblems(req: Request, res: Response): Promise<void> {
        const {problems,total} = await problemService.getAllProblems();
        res.status(200).json({
            message: "Problems fetched successfully",
            data: problems,
            total,
            success: true
        });
    },

    async updateProblem(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "Problem ID is required",
                success: false
            });
            return;
        }
        const problem = await problemService.updateProblem(id, req.body);
        res.status(200).json({
            message: "Problem updated successfully",
            data: problem,
            success: true
        });
    },

    async deleteProblem(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    message: "Problem ID is required",
                    success: false
                });
                return;
            }
        await problemService.deleteProblem(id);
        res.status(200).json({
            message: "Problem deleted successfully",
            success: true
        });
    },

    async findByDifficulty(req: Request, res: Response): Promise<void> {   

        const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
        const problems = await problemService.findByDifficulty(difficulty);
        res.status(200).json({
            message: "Problems fetched successfully",
            data: problems,
            success: true
        });
    },

    async searchProblems(req: Request, res: Response): Promise<void> {
        const query = req.query.q as string;
        const problems = await problemService.searchProblems(query);
        res.status(200).json({
            message: "Problems fetched successfully",
            data: problems,
            success: true
        });
  }
}