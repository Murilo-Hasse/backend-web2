import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default class Candidate extends Model {
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
  static initModel(sequelize) {
    Candidate.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: { //email is a login
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: { isEmail: true },
        },
        salt: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        socialNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthDay: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },  
      {
        sequelize,
        modelName: "Candidate",
        tableName: "candidate",
        timestamps: true,
        hooks: {
          beforeCreate: async (candidate) => {
            candidate.password = await bcrypt.hash(candidate.password, 10);
          },
          beforeUpdate: async (candidate) => {
            if (candidate.changed("password")) {
              candidate.password = await bcrypt.hash(candidate.password, 10);
            }
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.ResumeCandidate, {
      foreignKey: "candidate_id",
      as: "resume",
    });
    Candidate.hasMany(models.Applications, {
      foreignKey: "candidate_id",
      as: "application",
    });
  }
}
