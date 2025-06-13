import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {
  validateCandidateCreation,
  validateRecruiterCreation,
} from "../middleware/validation.js";
import {
  authenticateToken,
  isCandidate,
  isRecruiter,
} from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", AuthController.mainAuth);

// Candidate auth routes
router.get("/candidate/login", AuthController.candidateLoginForm);
router.post("/candidate/login", AuthController.candidateLogin);
router.get("/candidate/register", AuthController.candidateRegisterForm);
router.post(
  "/candidate/register",
  validateCandidateCreation,
  AuthController.candidateRegister
);

// Recruiter auth routes
router.get("/recruiter/login", AuthController.recruiterLoginForm);
router.post("/recruiter/login", AuthController.recruiterLogin);
router.get("/recruiter/register", AuthController.recruiterRegisterForm);
router.post(
  "/recruiter/register",
  validateRecruiterCreation,
  AuthController.recruiterRegister
);

// Protected routes
router.get(
  "/candidate/dashboard",
  authenticateToken,
  isCandidate,
  AuthController.candidateDashboard
);
router.get(
  "/recruiter/dashboard",
  authenticateToken,
  isRecruiter,
  AuthController.recruiterDashboard
);

// Logout
router.post("/logout", AuthController.logout);

export default router;