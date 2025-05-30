import { Applications, Candidate, JobVacancy } from "../models/index.js";

export const createApplication = async (data) => {
  const application = await Applications.create(data);
  return application;
};

export const getAllApplications = async () => {
  return await Applications.findAll({
    include: [
      {
        model: Candidate,
        as: "candidate",
        attributes: ["id", "name", "email"],
      },
      {
        model: JobVacancy,
        as: "jobVacancy",
        attributes: ["id", "title", "seniorityLevel"],
      },
    ],
  });
};

export const getApplicationById = async (id) => {
  return await Applications.findByPk(id, {
    include: [
      {
        model: Candidate,
        as: "candidate",
        attributes: ["id", "name", "email"],
      },
      {
        model: JobVacancy,
        as: "jobVacancy",
        attributes: ["id", "title", "seniorityLevel"],
      },
    ],
  });
};

export const updateApplication = async (id, data) => {
  const application = await Applications.findByPk(id);
  if (!application) return null;

  await application.update(data);
  return application;
};

export const deleteApplication = async (id) => {
  const application = await Applications.findByPk(id);
  if (!application) return null;

  await application.destroy();
  return true;
};

export const getApplicationsByCandidate = async (candidateId) => {
  return await Applications.findAll({
    where: { candidate_id: candidateId },
    include: [
      {
        model: JobVacancy,
        as: "jobVacancy",
        attributes: ["id", "title", "seniorityLevel"],
      },
    ],
  });
};

export const getApplicationsByJobVacancy = async (jobVacancyId) => {
  return await Applications.findAll({
    where: { jobVacancy_id: jobVacancyId },
    include: [
      {
        model: Candidate,
        as: "candidate",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};
