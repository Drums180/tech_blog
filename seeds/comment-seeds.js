const { Comment } = require("../models");

const commentData = [
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 1",
    post_id: 1,
    author_id: 1,
  },
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 2",
    post_id: 1,
    author_id: 2,
  },
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 3",
    post_id: 2,
    author_id: 3,
  },
  {
    date_created: "2023-04-15 21:17:19",
    content: "Comment 4",
    post_id: 2,
    author_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
