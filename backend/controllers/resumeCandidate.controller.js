// import { StatusCodes } from "http-status-codes";
// import * as resumeCandidateService from "../services/resumeCandidate.service.js";

// export const createResumeCandidate = async (req, res) => {
//   const { candidate_id, profissional_title, seniority_level, archive_path } =
//     req.body;

//   if (!candidate_id || !profissional_title || !seniority_level) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       error:
//         "Os campos candidate_id, profissional_title e seniority_level são obrigatórios.",
//     });
//   }

//   try {
//     const resume = await resumeCandidateService.createResumeCandidate({
//       candidate_id,
//       profissional_title,
//       seniority_level,
//       archive_path,
//     });
//     return res.status(StatusCodes.CREATED).json(resume);
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

// export const getAllResumeCandidates = async (req, res) => {
//   try {
//     const resumes = await resumeCandidateService.getAllResumeCandidates();
//     res.json(resumes);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const getResumeCandidateById = async (req, res) => {
//   try {
//     const resume = await resumeCandidateService.getResumeCandidateById(
//       req.params.id
//     );
//     if (!resume)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Resume not found" });
//     res.json(resume);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const updateResumeCandidate = async (req, res) => {
//   try {
//     const resume = await resumeCandidateService.updateResumeCandidate(
//       req.params.id,
//       req.body
//     );
//     if (!resume)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Resume not found" });
//     res.json(resume);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const deleteResumeCandidate = async (req, res) => {
//   try {
//     const deleted = await resumeCandidateService.deleteResumeCandidate(
//       req.params.id
//     );
//     if (!deleted)
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Resume not found" });
//     res.status(204).send();
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };

// export const getResumesByCandidate = async (req, res) => {
//   try {
//     const resumes = await resumeCandidateService.getResumesByCandidate(
//       req.params.candidateId
//     );
//     res.json(resumes);
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//   }
// };
