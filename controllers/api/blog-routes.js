const router = require("express").Router();
const { Post, User } = require("../../models");

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
router.get("/blogPost/:id", async (req, res) => {
  try {
    const blogPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    const blogPost = blogPostData.get({ plain: true });

    res.render("blogPost", {
      blogPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a new blog post
router.post("/", async (req, res) => {
  try {
    const blogPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
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
router.delete("/:id", async (req, res) => {
  try {
    const blogPostData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json({ message: "Blog post deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
