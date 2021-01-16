module.exports = app => {
  const comments = require("../controllers/comment.controller.js");

  const isAuthenticated = require("../isAuthenticated");


  // Create a new Comment
  app.post("/comments", isAuthenticated, comments.create);

  // Retrieve all Comments
  app.get("/comments", isAuthenticated, comments.findAll);

  // Retrieve a single Comment with commentId 
  app.get("/comments/:commentId", isAuthenticated, comments.findOne);

  // Retrieve Comments by PostId 
  app.get("/comments/posts/:postId", comments.findByPost);

  // Update a Comment with commentId ->
  app.put("/comments/:commentId", isAuthenticated, comments.update);

  // Delete a Comment with commentId
  app.delete("/comments/:commentId", isAuthenticated, comments.delete);
};