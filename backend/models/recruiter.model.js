import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt"; // Certifique-se de que bcrypt está importado

export default class Recruiter extends Model {
  // Se você tiver um método para checar senha, adicione aqui (como em Candidate)
  async checkPassword(password) {
    // Assumindo que você tem uma coluna para o hash da senha, como passwordHash
    return await bcrypt.compare(password, this.passwordHash);
  }

  static initModel(sequelize) {
    Recruiter.init(
      {
        id: {
          type: DataTypes.UUID, // CORREÇÃO 1: Tipo UUID
          defaultValue: DataTypes.UUIDV4, // CORREÇÃO 1: Geração automática de UUID
          primaryKey: true,
        },
        password: {
          // Assumindo que esta é a coluna para o hash da senha
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
      },
      {
        timestamps: true,
        sequelize,
        modelName: "Recruiter",
        tableName: "recruiter",
        hooks: {
          beforeCreate: async (recruiter) => {
            // CORREÇÃO 2: Variável 'recruiter'
            recruiter.password = await bcrypt.hash(recruiter.password, 10);
          },
          beforeUpdate: async (recruiter) => {
            // CORREÇÃO 2: Variável 'recruiter'
            if (recruiter.changed("password")) {
              recruiter.password = await bcrypt.hash(recruiter.password, 10);
            }
          },
        },
      }
    );
  }

  static associate(models) {
    Recruiter.belongsToMany(models.Company, {
      through: models.CompanyRecruiter,
      foreignKey: "recruiter_id",
      otherKey: "company_id",
      as: "representedCompany",
    });
    Recruiter.hasMany(models.JobVacancy, {
      foreignKey: "recruiter_id",
      as: "jobVacancies", 
    });
  }
}
