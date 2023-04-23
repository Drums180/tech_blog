const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all blog posts
router.get("/", async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      include: [{ model: User }],
    });

    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    res.render("homepage", {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post by id
router.get("/:id/edit", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!postData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    if (postData.user_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You do not have permission to edit this post." });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("editPost", {
      post,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a blog post
router.put("/:id", async (req, res) => {
  try {
    const blogPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!blogPostData[0]) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json({ message: "Blog post updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE a blog post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    if (postData.user_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You do not have permission to delete this post." });
      return;
    }

    await postData.destroy();

    res.status(200).json({ message: "Blog post deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
