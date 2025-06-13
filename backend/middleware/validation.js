import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

// Generic validation error handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Validation failed",
      details: errors.array(),
    });
  }
  next();
};

// UUID validation
export const validateUUID = (field) => {
  return param(field).isUUID().withMessage(`${field} deve ser um UUID válido`);
};

// Candidate validations
export const validateCandidateCreation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Nome deve ter entre 2 e 100 caracteres"),
  body("email").isEmail().normalizeEmail().withMessage("Email deve ser válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Telefone deve ter entre 10 e 15 caracteres"),
  body("birthDay")
    .isISO8601()
    .withMessage("Data de nascimento deve ser uma data válida"),
  handleValidationErrors,
];

// Recruiter validations
export const validateRecruiterCreation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Nome deve ter entre 2 e 100 caracteres"),
  body("email").isEmail().normalizeEmail().withMessage("Email deve ser válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
  handleValidationErrors,
];

// Company validations
export const validateCompanyCreation = [
  body("cnpj")
    .trim()
    .isLength({ min: 14, max: 18 })
    .withMessage("CNPJ deve ter formato válido"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Nome deve ter entre 2 e 100 caracteres"),
  body("phone")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Telefone deve ter entre 10 e 15 caracteres"),
  body("email").isEmail().normalizeEmail().withMessage("Email deve ser válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
  body("address")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Endereço deve ter entre 5 e 200 caracteres"),
  handleValidationErrors,
];

// Job Vacancy validations
export const validateJobVacancyCreation = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Título deve ter entre 2 e 100 caracteres"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Descrição deve ter entre 10 e 1000 caracteres"),
  body("seniorityLevel")
    .isIn(["INTERN", "JUNIOR", "MID", "SENIOR", "LEAD"])
    .withMessage("Nível de senioridade inválido"),
  body("recruiter_id")
    .isUUID()
    .withMessage("recruiter_id deve ser um UUID válido"),
  handleValidationErrors,
];

// Application validations
export const validateApplicationCreation = [
  body("candidate_id")
    .isUUID()
    .withMessage("candidate_id deve ser um UUID válido"),
  body("jobVacancy_id")
    .isUUID()
    .withMessage("jobVacancy_id deve ser um UUID válido"),
  body("status")
    .optional()
    .isIn(["EM_ANALISE", "APROVADA", "REPROVADA"])
    .withMessage("Status inválido"),
  handleValidationErrors,
];

// Resume validations
export const validateResumeCandidateCreation = [
  body("candidate_id")
    .isUUID()
    .withMessage("candidate_id deve ser um UUID válido"),
  body("profissional_title")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Título profissional deve ter entre 2 e 100 caracteres"),
  body("seniority_level")
    .isIn(["INTERN", "JUNIOR", "MID", "SENIOR", "LEAD"])
    .withMessage("Nível de senioridade inválido"),
  body("archive_path")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Caminho do arquivo muito longo"),
  handleValidationErrors,
];
