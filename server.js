const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");

const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up sessions with cookies
const sess = {
  secret: "Super secret secret",
  cookie: {
    // Stored in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
const homeRoutes = require("./controllers/home-routes");
const blogRoutes = require("./controllers/api/blog-routes");
const userRoutes = require("./controllers/api/user-routes");

app.use("/", homeRoutes);
app.use("/blog", blogRoutes);
app.use("/user", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Something broke! Error: ${err.message}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}! Visit http://localhost:${PORT}`)
  );
});
