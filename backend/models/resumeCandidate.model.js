import { Model, DataTypes } from "sequelize";

export default class ResumeCandidate extends Model{
  static initModel(sequelize){
    ResumeCandidate.init(
      {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      candidate_id: {
        type: DataTypes.UUID ,
        allowNull: false,
        references: {
          model: 'candidate',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      profissional_title:{
        type: DataTypes.STRING,
        allowNull: false
      },
      seniority_level:{
        type: DataTypes.ENUM('INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD'),
        allowNull: false
      },
      archive_path: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'ResumeCandidate',
      tableName: 'resumeCandidate',
      timestamps: true
    });
  }

  static associate(models) {
    ResumeCandidate.belongsTo(models.Candidate, {
      foreignKey: 'candidate_id',
      as: 'candidate'
    });
  }
}