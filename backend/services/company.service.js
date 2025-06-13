import { Company } from "../models/index.js";

export const createCompany = async (data) => {
  const { recruiterIds, ...companyData } = data;
  const company = await Company.create(companyData);

  if (recruiterIds && recruiterIds.length) {
    await company.setRecruiters(recruiterIds);
  }

  return company;
};

export const getAllCompanies = async () => {
  return await Company.findAll({ include: "recruiters" });
};

export const getCompanyById = async (id) => {
  return await Company.findByPk(id, { include: "recruiters" });
};

export const updateCompany = async (id, data) => {
  const company = await Company.findByPk(id);
  if (!company) return null;

  const { recruiterIds, ...companyData } = data;
  await company.update(companyData);

  if (recruiterIds) {
    await company.setRecruiters(recruiterIds);
  }

  return company;
};

export const deleteCompany = async (id) => {
  const company = await Company.findByPk(id);
  if (!company) return null;

  await company.destroy();
  return true;
};

