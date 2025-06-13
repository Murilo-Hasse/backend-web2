// import { ResumeCandidate, Candidate } from "../models/index.js";

// export const createResumeCandidate = async (data) => {
//   const resume = await ResumeCandidate.create(data);
//   return resume;
// };

// export const getAllResumeCandidates = async () => {
//   return await ResumeCandidate.findAll({
//     include: [
//       {
//         model: Candidate,
//         as: "candidate",
//         attributes: ["id", "name", "email"],
//       },
//     ],
//   });
// };

// export const getResumeCandidateById = async (id) => {
//   return await ResumeCandidate.findByPk(id, {
//     include: [
//       {
//         model: Candidate,
//         as: "candidate",
//         attributes: ["id", "name", "email"],
//       },
//     ],
//   });
// };

// export const updateResumeCandidate = async (id, data) => {
//   const resume = await ResumeCandidate.findByPk(id);
//   if (!resume) return null;

//   await resume.update(data);
//   return resume;
// };

// export const deleteResumeCandidate = async (id) => {
//   const resume = await ResumeCandidate.findByPk(id);
//   if (!resume) return null;

//   await resume.destroy();
//   return true;
// };

// export const getResumesByCandidate = async (candidateId) => {
//   return await ResumeCandidate.findAll({
//     where: { candidate_id: candidateId },
//   });
// };
