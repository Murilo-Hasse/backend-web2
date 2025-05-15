import express from "express";
import companyRoutes from "./routes/company.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";

const app = express();

app.use(express.json());

app.use("/companies", companyRoutes);
app.use("/recruiters", recruiterRoutes);

export default app;
