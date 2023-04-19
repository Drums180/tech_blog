// Import the necessary modules
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET route for home page
router.get("/", async (req, res) => {
  // Removed withAuth middleware
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: { model: User, attributes: ["username"] },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const commentData = await Comment.findAll({
      include: { model: User, attributes: ["username"] },
      order: [["createdAt", "DESC"]],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log("Posts:");
    console.log(JSON.stringify(posts, null, 2));

    console.log("Comments:");
    console.log(JSON.stringify(comments, null, 2));

    res.render("home", { posts, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route for login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
