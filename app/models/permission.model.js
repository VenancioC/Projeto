const sql = require("./db_mysql.js");

/*
Interact with DB
*/


// constructor
const Permission = function (permission) {
  this.Description = permission.Description;
};

Permission.create = (newPermission, result) => {
  sql.query("INSERT INTO Permission (Description) VALUES (?)"
    , [newPermission.Description]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created Category: ", { id: res.insertId, ...newPermission });
      result(null, { id: res.insertId, ...newPermission });
    });
};

Permission.getAll = result => {
  sql.query("SELECT * FROM Permission"
  , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Permissions: ", res);
      result(null, res);
  });
};

Permission.findById = (permissionId, result) => {
  console.log(permissionId);
  sql.query("SELECT * FROM Permission WHERE id =?"
    , [permissionId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found permissionId: ", res);
        result(null, res);
        return;
      }

      // not found Permission with the id
      result({ kind: "not_found" }, null);
    });
};

Permission.updateById = (id, permission, result) => {
  console.log(permission);
  sql.query("UPDATE Permission SET Description =? WHERE Id =?"
    , [permission.Description, id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated permission: ", { id: id, ...permission });
      result(null, { id: id, ...permission });
    }
  );
};

Permission.remove = (id, result) => {
  sql.query("DELETE FROM Permission WHERE id =?"
    , [id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Permission with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted permission with id: ", id);
      result(null, res);
    });
};

module.exports = Permission;