import express from "express";
import { ApplicationController } from "../controllers/application.controller.js";
import {
  authenticateToken,
  isCandidate,
  isRecruiter,
} from "../middleware/auth.js";
import { validateApplicationCreation } from "../middleware/validation.js";

const router = express.Router();

// Candidate routes
router.post(
  "/jobs/:jobId/apply",
  authenticateToken,
  isCandidate,
  validateApplicationCreation,
  ApplicationController.submitApplication
);

// Recruiter routes
router.get(
  "/jobs/:jobId",
  authenticateToken,
  isRecruiter,
  ApplicationController.getJobApplications
);

router.put(
  "/:applicationId/status",
  authenticateToken,
  isRecruiter,
  ApplicationController.updateApplicationStatus
);

export default router;