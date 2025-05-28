import sequelize from "../config/db_sequelize.js";
import Candidate from "./candidate.model.js";
import ResumeCandidate from "./resumeCandidate.model.js";
import Company from "./company.model.js";
import Recruiter from "./recruiter.model.js";
import CompanyRecruiter from "./companyRecruiter.model.js";
import Applications from "./applications.model.js";
import JobVacancy from "./jobVacancy.model.js";

const models = {
  Company,
  Recruiter,
  CompanyRecruiter,
  Candidate,
  ResumeCandidate,
  Applications,
  JobVacancy,
};

Object.values(models).forEach((model) => {
  if (model.initModel) {
    model.initModel(sequelize);
  }
});

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export {
  Company,
  Recruiter,
  CompanyRecruiter,
  Candidate,
  ResumeCandidate,
  Applications,
  JobVacancy,
};
export default models; 
