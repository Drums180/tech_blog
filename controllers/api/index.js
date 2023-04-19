const router = require("express").Router();

// Import your route files
const userRoutes = require("./user-routes");
const postRoutes = require("./blog-routes");
const commentRoutes = require("./comment-routes");

// Set up the routes
router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
