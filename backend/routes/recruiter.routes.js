
import express from 'express';
import { RecruiterController } from '../controllers/recruiter.controller.js';
import { 
  authenticateToken, 
  isRecruiter, 
} from '../middleware/auth.js';
import { validateRecruiterCreation } from '../middleware/validation.js';

const router = express.Router();

// Admin only routes
router.get(
  "/",
  authenticateToken,
  RecruiterController.getAllRecruiters
);
router.post(
  "/",
  authenticateToken,
  validateRecruiterCreation,
  RecruiterController.createRecruiter
);
router.delete(
  "/:id",
  authenticateToken,
  RecruiterController.deleteRecruiter
);

// Recruiter routes
router.get(
  "/:id",
  authenticateToken,
  isRecruiter,
  RecruiterController.getRecruiterById
);
router.put(
  "/:id",
  authenticateToken,
  isRecruiter,
  RecruiterController.updateRecruiter
);

// Recruiter job postings
router.get(
  "/jobs/me",
  authenticateToken,
  isRecruiter,
  RecruiterController.getJobPostings
);

export default router;