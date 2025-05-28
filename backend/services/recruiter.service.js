import { Recruiter } from "../models/index.js";

export const createRecruiter = async (data) => {
  const recruiter = await Recruiter.create(data);
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

  await recruiter.update(data);
  return recruiter;
};

export const deleteRecruiter = async (id) => {
  const recruiter = await Recruiter.findByPk(id);
  if (!recruiter) return null;

  await recruiter.destroy();
  return true;
};
