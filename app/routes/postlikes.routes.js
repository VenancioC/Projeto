module.exports = app => {
  const postlikes = require("../controllers/postlikes.controller.js");

  const isAuthenticated = require("../isAuthenticated");


  // Create a new postlikes
  app.post("/postlikes", isAuthenticated, postlikes.create);

  // Retrieve all postlikes
  app.get("/postlikes", isAuthenticated, postlikes.findAll);

  // Retrieve all postlikes with userId
  app.get("/postlikes/user/:userId", isAuthenticated, postlikes.findByUser);

  // Retrieve all postlikes with postId
  app.get("/postlikes/post/:postId", isAuthenticated, postlikes.findByPost);

  // Retrieve a single postlikes with userId and postId
  app.get("/postlikes/:postId/:userId", isAuthenticated, postlikes.findOne);

  // Don't have update

  // Delete a postlikes with userId and postId
  app.delete("/postlikes/:postId/:userId", isAuthenticated, postlikes.delete);
};