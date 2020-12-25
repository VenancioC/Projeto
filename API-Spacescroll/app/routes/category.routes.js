module.exports = app => {
  const categorys = require("../controllers/category.controller.js");

  // Create a new Category -> Registo
  app.post("/categorys", categorys.create);

  // Retrieve all Categorys
  app.get("/categorys", categorys.findAll);

  // Retrieve a single Category with categoryId
  app.get("/categorys/:categoryId", categorys.findOne);

  // Update a Category with categoryId ->
  app.put("/categorys/:categoryId", categorys.update);

  // Delete a Category with categoryId
  app.delete("/categorys/:categoryId", categorys.delete);
};