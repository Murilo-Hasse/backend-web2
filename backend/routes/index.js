import express from "express";
import authRoutes from "./auth.routes.js";
import candidateRoutes from "./candidate.routes.js";
import recruiterRoutes from "./recruiter.routes.js";
//import applicationRoutes from "./application.routes.js";
//import jobRoutes from "./jobVacancy.routes.js";

const router = express.Router();

// Mount route modules
router.use("/auth", authRoutes);
router.use("/candidates", candidateRoutes);
router.use("/recruiters", recruiterRoutes);
//router.use("/applications", applicationRoutes);
//router.use("/jobs", jobRoutes);

// Health check route
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

export default router;
