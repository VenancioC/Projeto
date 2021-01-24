const sql = require("./db_mysql.js");
/*
Interact with DB
*/


// constructor
const PagePermission = function (pagepermission) {
  this.UserId = pagepermission.UserId;
  this.PageId = pagepermission.PageId;
  this.PermissionId = pagepermission.PermissionId;
};

PagePermission.create = (newPagePermission, result) => {
  sql.query("INSERT INTO PagePermissions (UserId, PageId, PermissionId) VALUES (?, ?, ?)"
    , [newPagePermission.UserId, newPagePermission.PageId, newPagePermission.PermissionId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created PagePermission: ", { ...newPagePermission });
      result(null, { ...newPagePermission });
    });
};

PagePermission.getAll = result => {
  sql.query("SELECT * FROM PagePermissions"
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("PagePermission: ", res);
      result(null, res);
    });
};

PagePermission.findById = (userId, pageId, result) => {
  console.log(userId);
  sql.query("SELECT * FROM PagePermissions WHERE userId =? AND pageId =?"
    , [userId, pageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found PagePermission: ", res);
        result(null, res);
        return;
      }

      // not found PagePermission with the id
      result({ kind: "not_found" }, null);
    });
};

PagePermission.updateById = (userId, pageId, pagepermission, result) => {
  console.log(pagepermission);
  sql.query("UPDATE PagePermissions SET PermissionId =? WHERE UserId =? AND PageId =?"
    , [pagepermission.PermissionId, userId, pageId]
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

      console.log("updated pagepermission: ", { ...pagepermission });
      result(null, { ...pagepermission });
    }
  );
};

PagePermission.remove = (userId, pageId, result) => {
  sql.query("DELETE FROM PagePermissions WHERE UserId =? AND PageId =?"
    , [userId, pageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PagePermission with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted PagePermission with user: {0}  page: {1}", userId, pageId);
      result(null, res);
    });
};

module.exports = PagePermission;
