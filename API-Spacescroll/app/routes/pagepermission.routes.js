module.exports = app => {
  const pagepermission = require("../controllers/pagepermission.controller.js");

  const isAuthenticated = require("../isAuthenticated");

  
  // Create a new pagepermission
  app.post("/pagepermission", isAuthenticated, pagepermission.create);

  // Retrieve all pagepermission
  app.get("/pagepermission", isAuthenticated, pagepermission.findAll);

  // Retrieve a single PagePermission with UserId and PageId 
  app.get("/pagepermission/:userId/:pageId", isAuthenticated, pagepermission.findOne);

  // Update a pagepermission with UserId and PageId 
  app.put("/pagepermission/:userId/:pageId", isAuthenticated, pagepermission.update);

  // Delete a pagepermission with UserId and PageId 
  app.delete("/pagepermission/:userId/:pageId", isAuthenticated, pagepermission.delete);
};