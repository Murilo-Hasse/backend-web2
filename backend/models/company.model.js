import { Model, DataTypes } from "sequelize";

export default class Company extends Model {
  static initModel(sequelize) {
    Company.init(
      { 
        company_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        },
        email: {
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
