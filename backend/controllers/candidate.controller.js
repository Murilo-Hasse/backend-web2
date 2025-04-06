import { StatusCodes } from "http-status-codes";
import { BaseController } from "./base.controller.js";
import * as candidateService from "../services/candidate.service.js";

export class CandidateController extends BaseController {
  // Create candidate
  static createCandidate = BaseController.asyncHandler(async (req, res) => {
    const candidateData = req.body;

    try {
      const candidate = await candidateService.createCandidate(candidateData);
      return this.success(
        res,
        candidate,
        "Candidate created successfully",
        StatusCodes.CREATED
      );
    } catch (err) {
      return this.handleValidationError(err, res);
    }
  });

  // Get all candidates with pagination and filtering
  static getAllCandidates = BaseController.asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, skills } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      skills: skills ? skills.split(",") : undefined,
    };

    const result = await candidateService.getAllCandidates(options);

    return this.success(res, {
      candidates: result.candidates,
      pagination: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalCount: result.totalCount,
        hasNext: result.hasNext,
        hasPrev: result.hasPrev,
      },
    });
  });

  // Get candidate by ID
  static getCandidateById = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;

    const candidate = await candidateService.getCandidateById(id);

    if (!candidate) {
      return this.error(res, "Candidate not found", StatusCodes.NOT_FOUND);
    }

    return this.success(res, candidate);
  });

  // Update candidate
  static updateCandidate = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const candidate = await candidateService.updateCandidate(id, updateData);

      if (!candidate) {
        return this.error(res, "Candidate not found", StatusCodes.NOT_FOUND);
      }

      return this.success(res, candidate, "Candidate updated successfully");
    } catch (err) {
      return this.handleValidationError(err, res);
    }
  });

  // Delete candidate
  static deleteCandidate = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deleted = await candidateService.deleteCandidate(id);

    if (!deleted) {
      return this.error(res, "Candidate not found", StatusCodes.NOT_FOUND);
    }

    return this.success(
      res,
      null,
      "Candidate deleted successfully",
      StatusCodes.NO_CONTENT
    );
  });

  // Candidate profile methods
  static getProfile = BaseController.asyncHandler(async (req, res) => {
    const candidate = await candidateService.getCandidateById(req.user.id);
    res.render("candidate/profile", { candidate });
  });

  static updateProfile = BaseController.asyncHandler(async (req, res) => {
    const updateData = req.body;

    try {
      const candidate = await candidateService.updateCandidate(
        req.user.id,
        updateData
      );
      return this.success(res, candidate, "Profile updated successfully");
    } catch (err) {
      return this.handleValidationError(err, res);
    }
  });

  // Get candidate applications
  static getApplications = BaseController.asyncHandler(async (req, res) => {
    const applications = await candidateService.getCandidateApplications(
      req.user.id
    );
    return this.success(res, applications);
  });
}
