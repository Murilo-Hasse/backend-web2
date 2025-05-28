import {StatusCodes } from 'http-status-code';
import * as jobVacancyService from "../services/jobVacancy.service";


export const createjobVacancy = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificação básica
  if (!name || !id || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Os campos name, email e password são obrigatórios.",
    });
  }

  try {
    const jobVacancy = await jobVacancyService.createjobVacancy({
      name,
      email,
      password,
    });
    return res.status(StatusCodes.CREATED).json(jobVacancy);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(StatusCodes.CONFLICT).json({ error: ""});
    }
    if (err.name === "SequelizeValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: err.errors[0].message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro interno do servidor." });
  }
};

export const getAlljobVacancys = async (req, res) => {
  try {
    const jobVacancys = await jobVacancyService.getAlljobVacancys();
    res.json(jobVacancys);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getjobVacancyById = async (req, res) => {
  try {
    const jobVacancy = await jobVacancyService.getjobVacancyById(req.params.id);
    if (!jobVacancy)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "jobVacancy not found" });
    res.json(jobVacancy);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const updatejobVacancy = async (req, res) => {
  try {
    const jobVacancy = await jobVacancyService.updatejobVacancy(
      req.params.id,
      req.body
    );
    if (!jobVacancy)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "jobVacancy not found" });
    res.json(jobVacancy);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const deletejobVacancy = async (req, res) => {
  try {
    const deleted = await jobVacancyService.deletejobVacancy(req.params.id);
    if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ error: "jobVacancy not found" });
    res.status(204).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
