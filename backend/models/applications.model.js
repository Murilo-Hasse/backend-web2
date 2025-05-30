import { DataTypes, Model } from "sequelize";

export default class Applications extends Model {
  static initModel(sequelize) {
    Applications.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        candidate_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "candidate",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        job_vacancy_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "jobVacancy",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        status: {
          type: DataTypes.ENUM("EM_ANALISE", "APROVADA", "REPROVADA"),
          allowNull: false,
          defaultValue: "EM_ANALISE",
        },
      },
      {
        sequelize,
        modelName: "Application",
        tableName: "application",
        timestamps: true,
      }
    );
  }

  static associate(models) {
    Applications.belongsTo(models.Candidate, {
      foreignKey: "candidate_id",
      as: "candidate",
    });
    Applications.belongsTo(models.JobVacancy, {
      foreignKey: "jobVacancy_id",
      as: "jobVacancy",
    });
  }
}
