import * as recruiterService from "../services/recruiter.service.js";

export const createRecruiter = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificação básica
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Os campos name, email e password são obrigatórios.",
    });
  }

  try {
    const recruiter = await recruiterService.createRecruiter({
      name,
      email,
      password,
    });
    return res.status(201).json(recruiter);
  } catch (err) {
    // Verifica erro de e-mail duplicado ou validação do Sequelize
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "E-mail já está em uso." });
    }
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors[0].message });
    }

    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await recruiterService.getAllRecruiters();
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await recruiterService.getRecruiterById(req.params.id);
    if (!recruiter)
      return res.status(404).json({ error: "Recruiter not found" });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRecruiter = async (req, res) => {
  try {
    const recruiter = await recruiterService.updateRecruiter(
      req.params.id,
      req.body
    );
    if (!recruiter)
      return res.status(404).json({ error: "Recruiter not found" });
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRecruiter = async (req, res) => {
  try {
    const deleted = await recruiterService.deleteRecruiter(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Recruiter not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
