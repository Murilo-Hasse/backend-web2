import { DataTypes, Model } from "sequelize";

export default class JobVacancy extends Model {
  static initModel(sequelize) {
    JobVacancy.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4, // Adicionado defaultValue para UUID, como nos outros modelos
          primaryKey: true,
        },
        recruiter_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "recruiter", // Mantido como string, assumindo que Recruiter.tableName é 'recruiter'
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
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
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "JobVacancy",
        // CORREÇÃO 1: Consistência no tableName
        // Altere para 'jobVacancy' para corresponder à referência em applications.model.js
        // OU, se você prefere 'job_vacancy', teria que mudar em applications.model.js
        // Vou sugerir 'jobVacancy' para padronizar com o modelName e a referência.
        tableName: "jobVacancy",
      }
    );
  }

  // CORREÇÃO 2: Nome do método de associação
  static associate(models) {
    // CORREÇÃO 4: Tipo de associação (belongsTo) e CORREÇÃO 3: Digitação foreignKey
    JobVacancy.belongsTo(models.Recruiter, {
      foreignKey: "recruiter_id",
      as: "recruiter",
    });
  }
}
