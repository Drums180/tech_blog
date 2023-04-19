const Post = require("./Post");
const Comment = require("./Comment");
const User = require("./User");

// Define the one-to-many relationship between User and Post
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

// Define the one-to-many relationship between User and Comment
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// Define the one-to-many relationship between Post and Comment
Post.hasMany(Comment, { foreignKey: "post_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

module.exports = {
  Post,
  Comment,
  User,
};
