import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Candidate, Recruiter, Company } from "../models/index.js";

const generateToken = (user, userType) => {
  return jwt.sign(
    {
      id: user.id || user.company_id,
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

export const registerRecruiter = async (recruiterData) => {
  try {
    const recruiter = await Recruiter.create(recruiterData);
    const token = generateToken(recruiter, "recruiter");
    // Remove password from response
    const { password: _, ...userWithoutPassword } = recruiter.toJSON();
    return {
      success: true,
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const loginCompany = async (email, password) => {
  const company = await Company.findOne({ where: { email } });
  if (!company) {
    return { success: false, message: "Invalid credentials" };
  }
  const isPasswordValid = await company.checkPassword(password);
  if (!isPasswordValid) {
    return { success: false, message: "Invalid credentials" };
  }
  const token = generateToken(company, "company");
  // Remove password from response
  const { password: _, ...userWithoutPassword } = company.toJSON();
  return {
    success: true,
    user: userWithoutPassword,
    token,
  };
};

export const registerCompany = async (companyData) => {
  try {
    const company = await Company.create(companyData);
    const token = generateToken(company, "company");
    // Remove password from response
    const { password: _, ...userWithoutPassword } = company.toJSON();
    return {
      success: true,
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
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

export const getRecruiterDashboardData = async (recruiterId) => {
  const recruiter = await Recruiter.findByPk(recruiterId, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Job,
        limit: 5,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Application,
            attributes: ["status"],
          },
        ],
      },
    ],
  });

  const jobStats = await Job.findAll({
    where: { recruiterId },
    attributes: [
      "status",
      [sequelize.fn("COUNT", sequelize.col("status")), "count"],
    ],
    group: ["status"],
    raw: true,
  });

  return {
    recruiter,
    jobStats,
    recentJobs: recruiter.Jobs,
  };
};

export const getCompanyDashboardData = async (companyId) => {
  const company = await Company.findByPk(companyId, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Recruiter,
        as: "recruiter",
        attributes: ["id", "name", "email"],
        limit: 10,
      },
    ],
  });

  // Get company recruiters count
  const recruiterCount = await Recruiter.count({
    include: [
      {
        model: Company,
        where: { company_id: companyId },
        through: { attributes: [] },
      },
    ],
  });

  // Get total jobs posted by company recruiters
  const totalJobs = await Job.count({
    include: [
      {
        model: Recruiter,
        include: [
          {
            model: Company,
            where: { company_id: companyId },
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  // Get total applications for company jobs
  const totalApplications = await Application.count({
    include: [
      {
        model: Job,
        include: [
          {
            model: Recruiter,
            include: [
              {
                model: Company,
                where: { company_id: companyId },
                through: { attributes: [] },
              },
            ],
          },
        ],
      },
    ],
  });

  return {
    company,
    stats: {
      recruiterCount,
      totalJobs,
      totalApplications,
    },
    recruiters: company.recruiter,
  };
};
