import { StatusCodes } from "http-status-codes";
import * as applicationsService from "../services/application.service.js";

export const createApplication = async (req, res) => {
  const { candidate_id, jobVacancy_id } = req.body;

  if (!candidate_id || !jobVacancy_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Os campos candidate_id e jobVacancy_id são obrigatórios.",
    });
  }

  try {
    const application = await applicationsService.createApplication({
      candidate_id,
      jobVacancy_id,
      status: "EM_ANALISE", // Default status
    });
    return res.status(StatusCodes.CREATED).json(application);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Candidato já aplicou para esta vaga." });
    }
    if (err.name === "SequelizeValidationError") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: err.errors[0].message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Erro interno do servidor." });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await applicationsService.getAllApplications();
    res.json(applications);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const application = await applicationsService.getApplicationById(
      req.params.id
    );
    if (!application)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Application not found" });
    res.json(application);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await applicationsService.updateApplication(
      req.params.id,
      req.body
    );
    if (!application)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Application not found" });
    res.json(application);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const deleted = await applicationsService.deleteApplication(req.params.id);
    if (!deleted)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Application not found" });
    res.status(204).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getApplicationsByCandidate = async (req, res) => {
  try {
    const applications = await applicationsService.getApplicationsByCandidate(
      req.params.candidateId
    );
    res.json(applications);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getApplicationsByJobVacancy = async (req, res) => {
  try {
    const applications = await applicationsService.getApplicationsByJobVacancy(
      req.params.jobVacancyId
    );
    res.json(applications);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
