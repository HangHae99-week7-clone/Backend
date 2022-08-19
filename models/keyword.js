const Sequelize = require("sequelize");

module.exports = class Keyword extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        keywordId: {
          type: Sequelize.INTEGER,
          primaryKey: true, // id 이름 userId로 설정.
          autoIncrement: true,
        },
        keyword: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Keyword",
        tableName: "keywords",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Keyword.belongsTo(db.Post, {
      foreignKey: "postId",
      targetKey: "postId",
      onDelete: "CASCADE",
    });
  }
};
