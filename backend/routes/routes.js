import express from "express";
const router = express.Router();

// Import controllers
import * as applicationController from "../controllers/application.controller.js";
import * as candidateController from "../controllers/candidate.controller.js";
import * as companyController from "../controllers/company.controller.js";
import * as resumeCandidateController from "../controllers/resumeCandidate.controller.js";
import * as jobVacancyController from "../controllers/jobVacancy.controller.js";
import * as recruiterController from "../controllers/recruiter.controller.js";

// Application routes
router.get("/applications", applicationController.getAllApplications);
router.get("/applications/:id", applicationController.getApplicationById);
router.post("/applications", applicationController.createApplication);
router.put("/applications/:id", applicationController.updateApplication);
router.delete("/applications/:id", applicationController.deleteApplication);

// Candidate routes
router.get("/candidates", candidateController.getAllCandidates);
router.get("/candidates/:id", candidateController.getcandidateById);
router.post("/candidates", candidateController.createCandidate);
router.put("/candidates/:id", candidateController.updatecandidate);
router.delete("/candidates/:id", candidateController.deletecandidate);

// Company routes
router.get("/companies", companyController.getAllCompanies);
router.get("/companies/:id", companyController.getCompanyById);
router.post("/companies", companyController.createCompany);
router.put("/companies/:id", companyController.updateCompany);
router.delete("/companies/:id", companyController.deleteCompany);

// Resume Candidate routes
router.get("/resume-candidates", resumeCandidateController.getAllResumeCandidates);
router.get("/resume-candidates/:id", resumeCandidateController.getResumeCandidateById);
router.post("/resume-candidates", resumeCandidateController.createResumeCandidate);
router.put("/resume-candidates/:id", resumeCandidateController.updateResumeCandidate);
router.delete("/resume-candidates/:id", resumeCandidateController.deleteResumeCandidate);

// Job Vacancy routes
router.get("/job-vacancies", jobVacancyController.getAllJobVacancies);
router.get("/job-vacancies/:id", jobVacancyController.getJobVacancyById);
router.post("/job-vacancies", jobVacancyController.createJobVacancy);
router.put("/job-vacancies/:id", jobVacancyController.updateJobVacancy);
router.delete("/job-vacancies/:id", jobVacancyController.deleteJobVacancy);

// Recruiter routes
router.get("/recruiters", recruiterController.getAllRecruiters);
router.get("/recruiters/:id", recruiterController.getRecruiterById);
router.post("/recruiters", recruiterController.createRecruiter);
router.put("/recruiters/:id", recruiterController.updateRecruiter);
router.delete("/recruiters/:id", recruiterController.deleteRecruiter);

// Additional specific routes for job application system
// Applications by candidate
router.get(
  "/candidates/:candidateId/applications",
  applicationController.getApplicationsByCandidate
);

// Applications by job vacancy
router.get(
  "/job-vacancies/:jobVacancyId/applications",
  applicationController.getApplicationsByJobVacancy
);

// Job vacancies by company
// router.get(
//   "/companies/:companyId/job-vacancies",
//   jobVacancyController.
// );

// Job vacancies by recruiter
router.get(
  "/recruiters/:recruiterId/job-vacancies",
  jobVacancyController.getJobVacanciesByRecruiter
);

// Resume by candidate
router.get(
  "/candidates/:candidateId/resume",
  resumeCandidateController.getResumesByCandidate
);

// Recruiters by company
// router.get(
//   "/companies/:companyId/recruiters",
//   recruiterController.getByCompanyId
// );

export default router;
