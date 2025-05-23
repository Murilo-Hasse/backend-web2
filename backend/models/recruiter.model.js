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
        password: {
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
          validate: { isEmail: true},
        },
      },
      {
        sequelize,
        modelName: "Recruiter",
        tableName: "recruiter",
        hooks: {
          beforeCreate: async (candidate) => {
            candidate.password = await bcrypt.hash(candidate.password, 10);
          },
          beforeUpdate: async (candidate) => {
            if (candidate.changed("password")) {
              candidate.password = await bcrypt.hash(candidate.password, 10);
            }
          }
        }
      }
    );
  }

  static associate(models) {
    Recruiter.belongsToMany(models.Company, {
      through: models.CompanyRecruiter,
      foreignKey: "recruiter_id",
      otherKey: "company_id",
      as: "representedCompanie",
    });
  }
}
