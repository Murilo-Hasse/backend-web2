import { Model, DataTypes } from "sequelize";

export default class CompanyRecruiter extends Model {
  static initModel(sequelize) {
    CompanyRecruiter.init(
      {
        company_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        recruiter_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "CompanyRecruiter",
        tableName: "company_recruiters", 
        timestamps: false,
      }
    );
  }
}3
