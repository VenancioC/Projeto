const sql = require("./db_mysql.js");

/*
Interact with DB
*/

// constructor
const PageFollow = function (pagefollow) {
  this.UserId = pagefollow.UserId;
  this.PageId = pagefollow.PageId;
};

PageFollow.create = (newPageFollow, result) => {
  sql.query("INSERT INTO PageFollows (UserId, PageId) VALUES (?, ?)"
    , [newPageFollow.UserId, newPageFollow.PageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created PageFollow: ", { ...newPageFollow });
      result(null, { ...newPageFollow });
    });
};

PageFollow.getAll = result => {
  sql.query("SELECT * FROM PageFollows"
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("PageFollows: ", res);
      result(null, res);
    });
};

PageFollow.findById = (userId, pageId, result) => {
  console.log("u:" + userId + "  p:" + pageId);
  sql.query("SELECT * FROM PageFollows WHERE UserId =? AND PageId =?"
    , [userId, pageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found PageFollows: ", res);
        result(null, res);
        return;
      }

      // not found PageFollows with the id
      result({ kind: "not_found" }, null);
    });
};

PageFollow.findByUserId = (userId, result) => {
  console.log(userId);
  sql.query("SELECT * FROM PageFollows WHERE UserId =?"
    , [userId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("sUser Follows: ", res);
        result(null, res);
        return;
      }

      // not found PageFollows with userId
      result({ kind: "not_found" }, null);
    });
};

PageFollow.findByPageId = (pageId, result) => {
  console.log(pageId);
  sql.query("SELECT * FROM PageFollows WHERE PageId =?"
    , [pageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Page Follows: ", res);
        result(null, res);
        return;
      }

      // not found PageFollows with Id
      result({ kind: "not_found" }, null);
    });
};

PageFollow.remove = (userId, pageId, result) => {
  sql.query("DELETE FROM PageFollows WHERE UserId =? AND PageId =?"
    , [userId, pageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PageFollows with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted PageFollows with u: {0}  p: {1}", userId, pageId);
      result(null, res);
    });
};

module.exports = PageFollow;
