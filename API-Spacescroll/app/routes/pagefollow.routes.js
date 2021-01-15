module.exports = app => {
  const pagefollows = require("../controllers/pagefollow.controller.js");

  const isAuthenticated = require("../isAuthenticated");


  // Create a new PageFollows
  app.post("/pagefollows", isAuthenticated, pagefollows.create);

  // Retrieve all PageFollows
  app.get("/pagefollows", isAuthenticated, pagefollows.findAll);

  // Retrieve all PageFollows with userId
  app.get("/pagefollows/users/:userId", isAuthenticated, pagefollows.findByUser);

  // Retrieve all PageFollows with pageId
  app.get("/pagefollows/pages/:pageId", isAuthenticated, pagefollows.findByPage);

  // Retrieve a single PageFollows with userId and pageId
  app.get("/pagefollows/:userId/:pageId", isAuthenticated, pagefollows.findOne);

  // Dont have update

  // Delete a PageFollows with userId and pageId
  app.delete("/pagefollows/:userId/:pageId", isAuthenticated, pagefollows.delete);
};