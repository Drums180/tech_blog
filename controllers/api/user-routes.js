const router = require("express").Router();
const { User } = require("../../models");

// Create a new user
router.post("/", async (req, res) => {
  try {
    console.log("Creating a new user"); // Add this line
    console.log("Request body:", req.body); // Add this line

    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log("Error while creating a new user:", err); // Add this line
    res.status(500).json(err);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    console.log("Logging in"); // Add this line
    console.log("Request body:", req.body); // Add this line

    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log("Error while logging in:", err); // Add this line
    res.status(500).json(err);
  }
});

// Logout user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
