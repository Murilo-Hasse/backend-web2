import { Applications, Candidate } from '../models/index.js';

export const createApplication = async (applicationData) => {
  const { candidateId, jobId, coverLetter, expectedSalary } = applicationData;
  
  // Check if Applications already exists
  const existingApplication = await Applications.findOne({
    where: { candidateId, jobId }
  });
  
  if (existingApplication) {
    throw new Error('You have already applied for this job');
  }

  const Applications = await Applications.create({
    candidateId,
    jobId,
    coverLetter,
    expectedSalary,
    status: 'pending',
    appliedAt: new Date()
  });

  return Applications;
};

export const getJobApplications = async (options) => {
  const { jobId, status, page = 1, limit = 10 } = options;
  const offset = (page - 1) * limit;
  
  let whereClause = { jobId };
  
  if (status) {
    whereClause.status = status;
  }

  const { rows: applications, count } = await Applications.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    include: [
      {
        model: Candidate,
        attributes: ['id', 'name', 'email', 'phone', 'skills', 'experience']
      }
    ],
    order: [['appliedAt', 'DESC']]
  });

  return {
    applications,
    totalCount: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

export const updateApplicationStatus = async (applicationId, status, notes, recruiterId) => {
  const Applications = await Applications.findByPk(applicationId);
  
  if (!Applications) {
    return null;
  }

  await Applications.update({
    status,
    notes,
    reviewedBy: recruiterId,
    reviewedAt: new Date()
  });

  return Applications;
};