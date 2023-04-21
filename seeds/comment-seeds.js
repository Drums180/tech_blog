const { Comment } = require("../models");

const commentData = [
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 1",
    post_id: 4,
    author_id: 4,
  },
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 2",
    post_id: 4,
    author_id: 14,
  },
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 3",
    post_id: 14,
    author_id: 24,
  },
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 4",
    post_id: 14,
    author_id: 4,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
