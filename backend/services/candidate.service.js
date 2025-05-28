import { Candidate } from "../models/index.js";

export const createCandidate = async (data) => {
  const candidate = await Candidate.create(data);
  return candidate;
};

export const getAllCandidate = async () => {
  return await Candidate.findAll();
};

export const getCandidateBy = async (id) => {
  return await Candidate.findByPk(id);
};

export const updateCandidate = async (id, data) => {
  const candidate = await Candidate.findByPk(id);
  if (!candidate) return null;

  await candidate.update(data);
  return candidate;
};

export const deleteCandidate = async (id) => {
  const candidate = await Candidate.findByPk(id);
  if (!candidate) return null;
  
  await candidate.destroy();
  return true;
}
