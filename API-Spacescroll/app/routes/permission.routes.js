module.exports = app => {
  const permissions = require("../controllers/permission.controller.js");

  // Create a new Permission
  app.post("/permissions", permissions.create);

  // Retrieve all Permissions
  app.get("/permissions", permissions.findAll);

  // Retrieve a single Permissions with permissionId
  app.get("/permissions/:permissionId", permissions.findOne);

  // Update a Permission with permissionId
  app.put("/permissions/:permissionId", permissions.update);

  // Delete a Permission with permissionId
  app.delete("/permissions/:permissionId", permissions.delete);
};