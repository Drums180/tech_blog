const router = require("express").Router();
const { Comment, User } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: { model: User, attributes: ["username"] }, // Add this line
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", async (req, res) => {
  if (!req.session.logged_in) {
    res.status(401).json({ message: "You need to be logged in to comment" });
    return;
  }

  try {
    console.log("Request body:", req.body); // Add this line to log the request body
    const comment = await Comment.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    // Fetch the comment with the associated user information
    const commentWithUser = await Comment.findByPk(comment.id, {
      include: { model: User, attributes: ["username"] },
    });

    res.json(commentWithUser);
  } catch (err) {
    console.error("Error details:", err); // Modify this line to log the error details
    res.status(400).json({ error: err.message });
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
        author_id: req.session.user_id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
