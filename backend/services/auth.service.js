import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Candidate, Recruiter } from "../models/index.js";

const generateToken = (user, userType) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: userType,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
  );
};

export const loginCandidate = async (email, password) => {
  const candidate = await Candidate.findOne({ where: { email } });

  if (!candidate) {
    return { success: false, message: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, candidate.password);

  if (!isPasswordValid) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = generateToken(candidate, "candidate");

  // Remove password from response
  const { password: _, ...userWithoutPassword } = candidate.toJSON();

  return {
    success: true,
    user: userWithoutPassword,
    token,
  };
};

export const registerCandidate = async (candidateData) => {
  try {
    const candidate = await createCandidate(candidateData);
    const token = generateToken(candidate, "candidate");

    return {
      success: true,
      user: candidate,
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const loginRecruiter = async (email, password) => {
  const recruiter = await Recruiter.findOne({ where: { email } });

  if (!recruiter) {
    return { success: false, message: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, recruiter.password);

  if (!isPasswordValid) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = generateToken(recruiter, "recruiter");

  const { password: _, ...userWithoutPassword } = recruiter.toJSON();

  return {
    success: true,
    user: userWithoutPassword,
    token,
  };
};

export const getCandidateDashboardData = async (candidateId) => {
  const candidate = await Candidate.findByPk(candidateId, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Application,
        include: [{ model: Job, attributes: ["title", "company"] }],
        limit: 5,
        order: [["createdAt", "DESC"]],
      },
    ],
  });

  const applicationStats = await Application.findAll({
    where: { candidateId },
    attributes: [
      "status",
      [sequelize.fn("COUNT", sequelize.col("status")), "count"],
    ],
    group: ["status"],
    raw: true,
  });

  return {
    candidate,
    applicationStats,
    recentApplications: candidate.Applications,
  };
};
