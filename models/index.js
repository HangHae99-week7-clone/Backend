const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./user");
const Post = require("./post");
const Review = require("./review");
const Keyword = require("./keyword");
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Review = Review;
db.Keyword = Keyword;
User.init(sequelize);
Post.init(sequelize);
Review.init(sequelize);
Keyword.init(sequelize);
User.associate(db);
Post.associate(db);
Review.associate(db);
Keyword.associate(db);
module.exports = db;
