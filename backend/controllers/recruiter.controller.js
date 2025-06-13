import { StatusCodes } from "http-status-codes";
import { BaseController } from "./base.controller.js";
import * as recruiterService from "../services/recruiter.service"

export class RecruiterController extends BaseController {
  // Criar recrutador
  static createRecruiter = BaseController.asyncHandler(async (req, res) => {
    const recruiterData = req.body;

    try {
      const recruiter = await recruiterService.createRecruiter(recruiterData);
      return this.success(
        res,
        recruiter,
        "Recruiter created successfully",
        StatusCodes.CREATED
      );
    } catch (err) {
      return this.handleValidationError(err, res);
    }
  });

  // Buscar todos os recrutadores com paginação e filtro por empresa
  static getAllRecruiters = BaseController.asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, company } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      company,
    };

    const result = await recruiterService.getAllRecruiters(options);
    return this.success(res, result);
  });

  // Buscar recrutador por ID
  static getRecruiterById = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recruiter = await recruiterService.getRecruiterById(id);

    if (!recruiter) {
      return this.error(res, "Recruiter not found", StatusCodes.NOT_FOUND);
    }

    return this.success(res, recruiter);
  });

  // Atualizar recrutador
  static updateRecruiter = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const recruiter = await recruiterService.updateRecruiter(id, updateData);

      if (!recruiter) {
        return this.error(res, "Recruiter not found", StatusCodes.NOT_FOUND);
      }

      return this.success(res, recruiter, "Recruiter updated successfully");
    } catch (err) {
      return this.handleValidationError(err, res);
    }
  });

  // Excluir recrutador
  static deleteRecruiter = BaseController.asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleted = await recruiterService.deleteRecruiter(id);

    if (!deleted) {
      return this.error(res, "Recruiter not found", StatusCodes.NOT_FOUND);
    }

    return this.success(
      res,
      null,
      "Recruiter deleted successfully",
      StatusCodes.NO_CONTENT
    );
  });

  // Buscar vagas do recrutador logado
  static getJobPostings = BaseController.asyncHandler(async (req, res) => {
    const jobs = await recruiterService.getRecruiterJobs(req.user.id);
    return this.success(res, jobs, "Recruiter's job postings loaded");
  });
}
