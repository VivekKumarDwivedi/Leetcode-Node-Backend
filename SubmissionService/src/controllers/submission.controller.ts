import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.config";
import { BadRequestError } from "../utils/errors/app.error";
import { SubmissionService } from "../services/submissions.service";
import { SubmissionRepository } from "../repositories/submission.repositoriy";

const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository);

export const SubmissionController = {
  createSubmission: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Creating new submission", { body: req.body });
      const submission = await submissionService.createSubmission(req.body);

      logger.info("Submission created successfully", { submissionId: submission._id });

      res.status(201).json({
        success: true,
        message: "Submission created successfully",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  },

  getSubmissionById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        throw new BadRequestError("Submission ID is required");
      }
      
      logger.info("Getting submission by id", { submissionId: id });

      const submission = await submissionService.getSubmissionById(id);

      logger.info("Submission found successfully", { submissionId: id });

      res.status(200).json({
        success: true,
        message: "Submission found successfully",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  },

  getSubmissionByProblemId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { problemId } = req.params;
        
    if (!problemId) {
      throw new BadRequestError("Problem ID is required");
    }
    
      logger.info("Getting submission by problem id", { problemId });

      const submission = await submissionService.getSubmissionsByProblemId(problemId);

      logger.info("Submission found successfully", {
        submissionId: submission[0]?._id,
        problemId,
      });

      res.status(200).json({
        success: true,
        message: "Submission found successfully",
        data: submission,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteSubmissionById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        throw new BadRequestError("Submission ID is required");
      }

      logger.info("Deleting submission by id", { submissionId: id });

      const result = await submissionService.deleteSubmissionById(id);

      res.status(200).json({
        success: true,
        message: "Submission deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  updateSubmissionStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id || !status) throw new BadRequestError("Submission id and status are required");

      logger.info("Updating submission status", { submissionId: id, status });

      const result = await submissionService.updateSubmissionStatus(id, status);

      res.status(200).json({
        success: true,
        message: "Submission status updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
