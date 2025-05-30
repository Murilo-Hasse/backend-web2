import { JobVacancy, Recruiter } from "../models/index.js";

export const createJobVacancy = async (data) => {
  const jobVacancy = await JobVacancy.create(data);
  return jobVacancy;
};

export const getAllJobVacancies = async () => {
  return await JobVacancy.findAll({
    include: [
      {
        model: Recruiter,
        as: "recruiter",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

export const getJobVacancyById = async (id) => {
  return await JobVacancy.findByPk(id, {
    include: [
      {
        model: Recruiter,
        as: "recruiter",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

export const updateJobVacancy = async (id, data) => {
  const jobVacancy = await JobVacancy.findByPk(id);
  if (!jobVacancy) return null;

  await jobVacancy.update(data);
  return jobVacancy;
};

export const deleteJobVacancy = async (id) => {
  const jobVacancy = await JobVacancy.findByPk(id);
  if (!jobVacancy) return null;

  await jobVacancy.destroy();
  return true;
};

export const getJobVacanciesByRecruiter = async (recruiterId) => {
  return await JobVacancy.findAll({
    where: { recruiter_id: recruiterId },
    include: [
      {
        model: Recruiter,
        as: "recruiter",
        attributes: ["id", "name", "email"],
      },
    ],
  });
};
