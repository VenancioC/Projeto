module.exports = app => {
  const pagepermission = require("../controllers/pagepermission.controller.js");

  // Create a new pagepermission
  app.post("/pagepermission", pagepermission.create);

  // Retrieve all pagepermission
  app.get("/pagepermission", pagepermission.findAll);

  // Retrieve a single PagePermission with UserId and PageId 
  app.get("/pagepermission/:userId/:pageId", pagepermission.findOne);

  // Update a pagepermission with UserId and PageId 
  app.put("/pagepermission/:userId/:pageId", pagepermission.update);

  // Delete a pagepermission with UserId and PageId 
  app.delete("/pagepermission/:userId/:pageId", pagepermission.delete);
};