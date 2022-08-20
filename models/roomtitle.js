const Sequelize = require("sequelize");

module.exports = class Roomtitle extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        titleId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Roomtitle",
        tableName: "roomtitles",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Roomtitle.belongsTo(db.Post, {
      foreignKey: "postId",
      targetKey: "postId",
      onDelete: "CASCADE",
    });
  }
};
