# Model-View-Controller (MVC) Tech Blog

## Description

This is a CMS-style blog site that allows developers to publish articles, blog posts, and their thoughts and opinions. The site follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Installation

Clone this repository to your local machine.

```
git clone git@github.com:your_username/tech-blog.git
```

Navigate to the project directory and run the following command to install the required npm packages.
```
npm install
```

Create a .env file and add your MySQL credentials.

```
DB_NAME='tech_blog_db'
DB_USER='your_mysql_username'
DB_PW='your_mysql_password'
```

Create the database by running the following command in your MySQL Workbench or other MySQL management tool.

```
CREATE DATABASE tech_blog_db;
```

Run the following command to seed the database with some initial data.

```
npm run seed
```

Run the application.

```
npm start
```

Open your browser and navigate to http://localhost:3001.

## Usage

### Homepage
When you visit the site for the first time, you will be presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in.

### Sign up and log in
If you click on any other links in the navigation, you will be prompted to either sign up or log in. If you choose to sign up, you will be prompted to create a username and password. When you click on the sign-up button, your user credentials are saved and you are logged into the site. When you revisit the site at a later time and choose to log in, you will be prompted to enter your username and password.

### Sign up
When you are signed in to the site, you see navigation links for the homepage, the dashboard, and the option to log out. When you click on the homepage option in the navigation, you are taken to the homepage and presented with existing blog posts that include the post title and the date created.

### View a blog post
When you click on an existing blog post, you are presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment.

### Leave a comment
When you enter a comment and click on the submit button while signed in, the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created.

### Dashboard
When you click on the dashboard option in the navigation, you are taken to the dashboard and presented with any blog posts you have already created and the option to add a new blog post.

### Add a new blog post
When you click on the button to add a new blog post, you are prompted to enter both a title and contents for your blog post. When you click on the button to create a new blog post, the title and contents of your post are saved and you are taken back to an updated dashboard with your new blog post.

```
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
```

### Update a blog post
When you click on one of your existing posts in the dashboard, you are able to delete or update your post and taken back to an updated dashboard.

```
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
```

### Delete a blog post
When you click on one of your existing posts in the dashboard, you are able to delete or update your post and taken back to an updated dashboard.

```
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
```

### Logout
When you click on the logout option in the navigation, you are signed out of the site.

```
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
```

### Session timeout
When you are idle on the site for more than a set time, you are able to view comments but you are prompted to log in again before you can add, update, or delete comments. This is the default behavior of the express-session package and does not require any additional code changes in the application.

## Credits

This application uses the following technologies:

Node.js
Express.js
MySQL2
Sequelize
Handlebars.js
dotenv
bcrypt
express-session
connect-session-sequelize

## License

This application is licensed under the MIT license.
