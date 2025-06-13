// import { StatusCodes } from "http-status-codes";
// import * as jobVacancyService from "../services/jobVacancy.service.js";

// export const createJobVacancy = async (req, res) => {
//   const { title, description, seniorityLevel, recruiter_id } = req.body;

//   if (!title || !description || !seniorityLevel || !recruiter_id) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       error:
//         "Os campos title, description, seniorityLevel e recruiter_id são obrigatórios.",
//     });
//   }

//   try {
//     const jobVacancy = await jobVacancyService.createJobVacancy({
//       title,
//       description,
//       seniorityLevel,
//       recruiter_id,
//     });
//     return res.status(StatusCodes.CREATED).json(jobVacancy);
//   } catch (err) {
//     if (err.name === "SequelizeValidationError") {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ error: err.errors[0].message });
//     }
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "Erro interno do servidor." });
//   }
// };

// export const getAllJobVacancies = async (req, res) => {
//   try {
//     const jobVacancies = await jobVacancyService.getAllJobVacancies();
//     res.json(jobVacancies);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const getJobVacancyById = async (req, res) => {
//   try {
//     const jobVacancy = await jobVacancyService.getJobVacancyById(req.params.id);
//     if (!jobVacancy)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Job vacancy not found" });
//     res.json(jobVacancy);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const updateJobVacancy = async (req, res) => {
//   try {
//     const jobVacancy = await jobVacancyService.updateJobVacancy(
//       req.params.id,
//       req.body
//     );
//     if (!jobVacancy)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Job vacancy not found" });
//     res.json(jobVacancy);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const deleteJobVacancy = async (req, res) => {
//   try {
//     const deleted = await jobVacancyService.deleteJobVacancy(req.params.id);
//     if (!deleted)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Job vacancy not found" });
//     res.status(204).send();
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const getJobVacanciesByRecruiter = async (req, res) => {
//   try {
//     const jobVacancies = await jobVacancyService.getJobVacanciesByRecruiter(
//       req.params.recruiterId
//     );
//     res.json(jobVacancies);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };
