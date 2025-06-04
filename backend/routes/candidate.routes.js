import express from "express";
import { CandidateController } from "../controllers/candidate.controller.js";
import {
  authenticateToken,
  isCandidate,
  isRecruiter,
} from "../middleware/auth.js";
import {
  validateCandidateCreation,
} from "../middleware/validation.js";

const router = express.Router();

// Public routes (for recruiters to search candidates)
router.get(
  "/",
  authenticateToken,
  isRecruiter,
  CandidateController.getAllCandidates
);
router.get(
  "/:id",
  authenticateToken,
  CandidateController.getCandidateById
);

// Admin/Recruiter only routes
router.post(
  "/",
  authenticateToken,
  isRecruiter,
  validateCandidateCreation,
  CandidateController.createCandidate
);
router.put(
  "/:id",
  authenticateToken,
  CandidateController.updateCandidate
);
router.delete(
  "/:id",
  authenticateToken,
  isRecruiter,
  CandidateController.deleteCandidate
);

// Candidate profile routes
router.get(
  "/profile/me",
  authenticateToken,
  isCandidate,
  CandidateController.getProfile
);
router.put(
  "/profile/me",
  authenticateToken,
  isCandidate,
  CandidateController.updateProfile
);

// Candidate applications
router.get(
  "/applications/me",
  authenticateToken,
  isCandidate,
  CandidateController.getApplications
);

export default router;
