const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        placename: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        charge: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: true,
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        images: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.hasMany(db.Review, {
      foreignKey: "postId",
      sourceKey: "postId",
      onDelete: "CASCADE",
    });
    db.Post.hasMany(db.Keyword, {
      foreignKey: "postId",
      sourceKey: "postId",
      onDelete: "CASCADE",
    });
    db.Post.hasMany(db.Roomtitle, {
      foreignKey: "postId",
      sourceKey: "postId",
      onDelete: "CASCADE",
    });
    db.Post.hasMany(db.Roomcharge, {
      foreignKey: "postId",
      sourceKey: "postId",
      onDelete: "CASCADE",
    });
    db.Post.hasMany(db.Roomimage, {
      foreignKey: "postId",
      sourceKey: "postId",
      onDelete: "CASCADE",
    });
    db.Post.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
      onDelete: "CASCADE",
      onDelete: "CASCADE",
    });
  }
};
