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

    // Start your Express app or other server logic here
    // ...
  } catch (error) {
    console.error(
      "Unable to connect to the database or synchronize models:",
      error
    );
  }
}

startServer();