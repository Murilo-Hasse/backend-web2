import { Model, DataTypes, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";

export default class Company extends Model {
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static initModel(sequelize) {
    Company.init(
      {
        company_id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        cnpj: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Company",
        tableName: "company",
        hooks: {
          beforeCreate: async (company) => {
            company.password = await bcrypt.hash(company.password, 10);
          },
          beforeUpdate: async (company) => {
            if (company.changed("password")) {
              company.password = await bcrypt.hash(company.password, 10);
            }
          },
        },
      }
    );
  }

  static associate(models) {
    Company.belongsToMany(models.Recruiter, {
      through: models.CompanyRecruiter,
      foreignKey: "company_id",
      otherKey: "recruiter_id",
      as: "recruiter",
    });
  }
}
