import { Candidate, Applications, JobVacancy } from "../models/index.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const createCandidate = async (candidateData) => {
  const { name, email, password, phone, skills, experience } = candidateData;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  const candidate = await Candidate.create({
    name,
    email,
    password: hashedPassword,
    phone,
    skills: Array.isArray(skills) ? skills : [],
    experience: experience || 0,
  });

  // Remove password from response
  const { password: _, ...candidateWithoutPassword } = candidate.toJSON();
  return candidateWithoutPassword;
};

export const getAllCandidates = async (options = {}) => {
  const { page = 1, limit = 10, search, skills } = options;
  const offset = (page - 1) * limit;

  let whereClause = {};

  // Search functionality
  if (search) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }

  // Skills filter
  if (skills && skills.length > 0) {
    whereClause.skills = {
      [Op.overlap]: skills,
    };
  }

  const { rows: candidates, count } = await Candidate.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    attributes: { exclude: ["password"] },
    order: [["createdAt", "DESC"]],
  });

  const totalPages = Math.ceil(count / limit);

  return {
    candidates,
    currentPage: page,
    totalPages,
    totalCount: count,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

export const getCandidateById = async (id) => {
  const candidate = await Candidate.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Applications,
        include: [{ model: JobVacancy }],
      },
    ],
  });

  return candidate;
};

export const updateCandidate = async (id, updateData) => {
  const candidate = await Candidate.findByPk(id);

  if (!candidate) {
    return null;
  }

  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 12);
  }

  await candidate.update(updateData);

  // Return updated candidate without password
  const { password: _, ...candidateWithoutPassword } = candidate.toJSON();
  return candidateWithoutPassword;
};

export const deleteCandidate = async (id) => {
  const candidate = await Candidate.findByPk(id);

  if (!candidate) {
    return false;
  }

  await candidate.destroy();
  return true;
};

export const getCandidateApplications = async (candidateId) => {
  const applications = await Applications.findAll({
    where: { candidateId },
    include: [
      {
        model: JobVacancy,
        attributes: ["id", "title", "company", "location", "salary"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return applications;
};