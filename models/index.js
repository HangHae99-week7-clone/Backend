const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const User = require("./user");
const Post = require("./post");
const Review = require("./review");
const Keyword = require("./keyword");
const Roomtitle = require("./roomtitle");
const Roomcharge = require("./roomcharge");
const Roomimage = require("./roomimage");
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
db.Roomcharge = Roomcharge;
db.Roomtitle = Roomtitle;
(db.Roomimage = Roomimage), User.init(sequelize);
Post.init(sequelize);
Review.init(sequelize);
Keyword.init(sequelize);
Roomtitle.init(sequelize);
Roomcharge.init(sequelize);
Roomimage.init(sequelize);
User.associate(db);
Post.associate(db);
Review.associate(db);
Keyword.associate(db);
Roomtitle.associate(db);
Roomcharge.associate(db);
Roomimage.associate(db);
module.exports = db;
