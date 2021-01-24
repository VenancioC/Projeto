module.exports = app => {
  const categories = require("../controllers/category.controller.js");
  const isAuthenticated = require("../isAuthenticated");

  // Create a new Category
  app.post("/categories", isAuthenticated, categories.create);

  // Retrieve all Categories
  app.get("/categories", isAuthenticated, categories.findAll);

  // Retrieve a single Category with categoryId
  app.get("/categories/:categoryId", isAuthenticated, categories.findOne);

  // Update a Category with categoryId ->
  app.put("/categories/:categoryId", isAuthenticated, categories.update);

  // Delete a Category with categoryId
  app.delete("/categories/:categoryId", isAuthenticated, categories.delete);
};