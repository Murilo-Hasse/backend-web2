import {StatusCodes } from 'http-status-codes';
import * as candidateService from "../services/application.service.js";


export const createCandidate = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificação básica
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Os campos name, email e password são obrigatórios.",
    });
  }

  try {
    const candidate = await candidateService.createCandidate({
      name,
      email,
      password,
    });
    return res.status(StatusCodes.CREATED).json(candidate);
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

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await candidateService.getAllcandidates();
    res.json(candidates);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getcandidateById = async (req, res) => {
  try {
    const candidate = await candidateService.getcandidateById(req.params.id);
    if (!candidate)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const updatecandidate = async (req, res) => {
  try {
    const candidate = await candidateService.updatecandidate(
      req.params.id,
      req.body
    );
    if (!candidate)
      return res.status(StatusCodes.NOT_FOUND).json({ error: "candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const deletecandidate = async (req, res) => {
  try {
    const deleted = await candidateService.deletecandidate(req.params.id);
    if (!deleted) return res.status(StatusCodes.NOT_FOUND).json({ error: "candidate not found" });
    res.status(204).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
