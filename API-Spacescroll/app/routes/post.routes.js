module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  // Create a new Posts
  app.post("/posts", posts.create);

  // Retrieve all Posts
  app.get("/posts", posts.findAll);

  // Retrieve a single Post with postsId 
  app.get("/posts/:postId", posts.findOne);

  // Update a Post with postId ->
  app.put("/posts/:postId", posts.update);

  // Delete a Post with postId
  app.delete("/posts/:postId", posts.delete);
};