module.exports = app => {
  const pagefollows = require("../controllers/pagefollow.controller.js");

  // Create a new PageFollows
  app.post("/pagefollows", pagefollows.create);

  // Retrieve all PageFollows
  app.get("/pagefollows", pagefollows.findAll);

  // Retrieve all PageFollows with userId
  app.get("/pagefollows/users/:userId", pagefollows.findByUser);

  // Retrieve all PageFollows with pageId
  app.get("/pagefollows/pages/:pageId", pagefollows.findByPage);

  // Retrieve a single PageFollows with userId and pageId
  app.get("/pagefollows/:userId/:pageId", pagefollows.findOne);

  // Dont have update

  // Delete a PageFollows with userId and pageId
  app.delete("/pagefollows/:userId/:pageId", pagefollows.delete);
};