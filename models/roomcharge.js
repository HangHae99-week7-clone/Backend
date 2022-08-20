const Sequelize = require("sequelize");

module.exports = class Roomcharge extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        chargeId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        charge: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Roomcharge",
        tableName: "roomcharges",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Roomcharge.belongsTo(db.Post, {
      foreignKey: "postId",
      targetKey: "postId",
      onDelete: "CASCADE",
    });
  }
};
