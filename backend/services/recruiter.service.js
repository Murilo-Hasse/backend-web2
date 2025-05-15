import { Recruiter } from "../models/index.js";

export const createRecruiter = async (data) => {
  const { companyIds, ...recruiterData } = data;
  const recruiter = await Recruiter.create(recruiterData);

  if (companyIds && companyIds.length) {
    await recruiter.setRepresentedCompanies(companyIds);
  }

  return recruiter;
};

export const getAllRecruiters = async () => {
  return await Recruiter.findAll({ include: "representedCompanies" });
};

export const getRecruiterById = async (id) => {
  return await Recruiter.findByPk(id, { include: "representedCompanies" });
};

export const updateRecruiter = async (id, data) => {
  const recruiter = await Recruiter.findByPk(id);
  if (!recruiter) return null;

  const { companyIds, ...recruiterData } = data;
  await recruiter.update(recruiterData);

  if (companyIds) {
    await recruiter.setRepresentedCompanies(companyIds);
  }

  return recruiter;
};

export const deleteRecruiter = async (id) => {
  const recruiter = await Recruiter.findByPk(id);
  if (!recruiter) return null;

  await recruiter.destroy();
  return true;
};
