module.exports = app => {
  const pages = require("../controllers/page.controller.js");

  // Create a new Page
  app.post("/pages", pages.create);

  // Retrieve all Pages
  app.get("/pages", pages.findAll);

  // Retrieve a single Page with pageId
  app.get("/pages/:pageId", pages.findOne);

  // Update a Page with pageId ->
  app.put("/pages/:pageId", pages.update);

  // Delete a Page with pageId
  app.delete("/pages/:pageId", pages.delete);
};