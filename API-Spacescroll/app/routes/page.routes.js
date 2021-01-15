module.exports = app => {
  const pages = require("../controllers/page.controller.js");

  const isAuthenticated = require("../isAuthenticated");

  
  // Create a new Page
  app.post("/pages", isAuthenticated, pages.create);

  // Retrieve all Pages
  app.get("/pages", isAuthenticated, pages.findAll);

  // Retrieve a single Page with pageId
  app.get("/pages/:pageId", isAuthenticated, pages.findOne);

  // Update a Page with pageId ->
  app.put("/pages/:pageId", isAuthenticated, pages.update);

  // Delete a Page with pageId
  app.delete("/pages/:pageId", isAuthenticated, pages.delete);
};