const router = require("express").Router();
const { Comment } = require("../../models");

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
    const comment = await Comment.create({
      ...req.body,
      author_id: req.session.user_id,
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
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
