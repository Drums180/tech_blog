// ./seeds/post-seeds.js

const { Post } = require("../models");

const postData = [
  {
    title: "Post 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author_id: 4,
  },
  {
    title: "Post 2",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author_id: 14,
  },
  {
    title: "Post 3",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
