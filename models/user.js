const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true, // id 이름 userId로 설정.
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100), // 비밀번호 hash화 하면 길이가 늘어나서 여유롭게 100으로 설정
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "userId", sourceKey: "userId" });
    db.User.hasMany(db.Review, { foreignKey: "userId", sourceKey: "userId" });
  }
};
