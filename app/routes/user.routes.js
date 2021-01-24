module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const isAuthenticated = require("../isAuthenticated");

  // Create a new User
  app.post("/users", isAuthenticated, users.create);

  // Retrieve all Users
  app.get("/users", isAuthenticated, users.findAll);

  // Retrieve a single User with userId
  app.get("/users/:userId", isAuthenticated, users.findOne);

  // Update a User with userId 
  app.put("/users/:userId", isAuthenticated, users.update);

  // Delete a User with userId
  app.delete("/users/:userId", isAuthenticated, users.delete);
};
