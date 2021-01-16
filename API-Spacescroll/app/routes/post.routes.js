module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  const isAuthenticated = require("../isAuthenticated");


  // Create a new Posts
  app.post("/posts", isAuthenticated, posts.create);

  // Retrieve all Posts
  app.get("/posts", posts.findAll);

  app.get("/posts/recent", posts.findRecents);

  // Retrieve a single Post with postsId 
  app.get("/posts/:postId", posts.findOne);

  app.get("/posts/user/:userId", posts.findFeedByUser);

  app.get("/posts/page/:pageId", posts.findByPage);

  // Update a Post with postId ->
  app.put("/posts/:postId", isAuthenticated, posts.update);

  // Delete a Post with postId
  app.delete("/posts/:postId", isAuthenticated, posts.delete);
};