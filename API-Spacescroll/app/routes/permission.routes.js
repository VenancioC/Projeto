module.exports = app => {
  const permissions = require("../controllers/permission.controller.js");
  const isAuthenticated = require("../isAuthenticated");


  // Create a new Permission
  app.post("/permissions", isAuthenticated, permissions.create);

  // Retrieve all Permissions
  app.get("/permissions", isAuthenticated, permissions.findAll);

  // Retrieve a single Permissions with permissionId
  app.get("/permissions/:permissionId", isAuthenticated, permissions.findOne);

  // Update a Permission with permissionId
  app.put("/permissions/:permissionId", isAuthenticated, permissions.update);

  // Delete a Permission with permissionId
  app.delete("/permissions/:permissionId", isAuthenticated, permissions.delete);
};