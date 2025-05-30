import {
  sequelize,
  Candidate,
  JobVacancy,
  Applications,
  Company,
  Recruiter,
  ResumeCandidate,
  CompanyRecruiter,
} from "./models/index.js"; // Import all models from your index.js

import app from "./app.js";

const PORT = 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Synchronize tables in the correct order based on foreign key dependencies
    // Level 1: No foreign keys or only references built-in types
    await Company.sync({ alter: true });
    await Recruiter.sync({ alter: true });
    await Candidate.sync({ alter: true });
    await JobVacancy.sync({ alter: true }); // This must be synchronized before Applications

    // Level 2: Depend on Level 1 tables
    await ResumeCandidate.sync({ alter: true }); // Depends on Candidate
    await CompanyRecruiter.sync({ alter: true }); // Depends on Company, Recruiter
    await Applications.sync({ alter: true }); // Depends on Candidate, JobVacancy

    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    // Start your Express app or other server logic here
    // ...
  } catch (error) {
    console.error(
      "Unable to connect to the database or synchronize models:",
      error
    );
    process.exit(1);
  }
}

startServer();