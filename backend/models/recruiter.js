import { Model, DataTypes } from "sequelize";

export default class Recruiter extends Model {
  static initModel(sequelize) {
    Recruiter.init(
      {
        recruiter_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Recruiter",
        tableName: "recruiters",
      }
    );
  }

  static associate(models) {
    Recruiter.belongsToMany(models.Company, {
      through: models.CompanyRecruiter,
      foreignKey: "recruiter_id",
      otherKey: "company_id",
      as: "representedCompanies",
    });
  }
}
