const Sequelize = require("sequelize");

module.exports = class Roomimage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        imageId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Roomimage",
        tableName: "roomimages",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Roomimage.belongsTo(db.Post, {
      foreignKey: "postId",
      targetKey: "postId",
      onDelete: "CASCADE",
    });
  }
};
