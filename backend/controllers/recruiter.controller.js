import { StatusCodes } from 'http-status-codes';
import * as recruiterService from "../services/recruiter.service.js";

export const createRecruiter = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificação básica
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Os campos name, email e password são obrigatórios.",
    });
  }

  try {
    const recruiter = await recruiterService.createRecruiter({
      name,
      email,
      password,
    });
    return res.status(StatusCodes.CREATED).json(recruiter);
  } catch (err) {
    // Verifica erro de e-mail duplicado ou validação do Sequelize
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(StatusCodes.CONFLICT).json({ error: "E-mail já está em uso." });
    }
    if (err.name === "SequelizeValidationError") {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: err.errors[0].message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro interno do servidor." });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await recruiterService.getAllRecruiters();
    res.json(recruiters);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await recruiterService.getRecruiterById(req.params.id);
    if (!recruiter)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Recruiter not found" });
    res.json(recruiter);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const updateRecruiter = async (req, res) => {
  try {
    const recruiter = await recruiterService.updateRecruiter(
      req.params.id,
      req.body
    );
    if (!recruiter)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Recruiter not found" });
    res.json(recruiter);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const deleteRecruiter = async (req, res) => {
  try {
    const deleted = await recruiterService.deleteRecruiter(req.params.id);
    if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ error: "Recruiter not found" });
    res.status(204).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
