import sequelize from '../config/db_sequelize.js';
// import Candidate from './candidate.js';
// import ResumeCandidate from './ResumeCandidate.js';
import Company from './company.js';
import Recruiter from './recruiter.js';
import CompanyRecruiter from './companyRecruiter.js'


Company.initModel(sequelize);
Recruiter.initModel(sequelize);

const models = {
  //   Candidate,
  //   ResumeCandidate,
  Company,
  Recruiter,
  CompanyRecruiter,
};

// Candidate.initModel(sequelize);
// ResumeCandidate.initModel(sequelize);
Object.values(models).forEach(model => {
  if (model.initModel) {
    model.initModel(sequelize);
  }
});

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export { Company, Recruiter, CompanyRecruiter }; // exportação nomeada para cada modelo
export default models; // opcional