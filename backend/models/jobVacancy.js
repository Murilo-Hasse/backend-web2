const { Model, DataTypes } = require("sequelize");

export default class jobVacancy extends Model {
  static initModel(sequelize) {
    jobVacancy.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        seniorityLevel: {
          type: DataTypes.ENUM("INTERN", "JUNIOR", "MID", "SENIOR", "LEAD"),
          allowNull: false2,
        },
        

      },
      {
        sequelize,
        timestamps: true,
      }
    );
  }
}
