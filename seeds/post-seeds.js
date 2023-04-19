// ./seeds/post-seeds.js

const { Post } = require("../models");

const postData = [
  {
    title: "Post 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    user_id: 1,
  },
  {
    title: "Post 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user_id: 2,
  },
  {
    title: "Post 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
