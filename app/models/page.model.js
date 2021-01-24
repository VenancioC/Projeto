const sql = require("./db_mysql.js");

/*
Interact with DB
*/

// constructor
const Page = function (page) {
  this.Name = page.Name;
  this.Description = page.Description;
  this.CategoryId = page.CategoryId;
  this.UserId = page.UserId;
  this.Followers = page.Followers;
};

Page.create = (newPage, result) => {
  sql.query("INSERT INTO Page (Name, Description, CategoryId, UserId, Followers) VALUES (?, ?, ?, ?, ?)"
    , [newPage.Name, newPage.Description, newPage.CategoryId, newPage.UserId, newPage.Followers]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created page: ", { id: res.insertId, ...newPage });
      result(null, { id: res.insertId, ...newPage });
    });
};

Page.getAll = result => {
  sql.query("SELECT * FROM Page"
  , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Pages: ", res);
      result(null, res);
  });
};

Page.findById = (pageId, result) => {
  console.log(pageId);
  sql.query("SELECT * FROM Page WHERE id =?"
    , [pageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found page: ", res);
        result(null, res);
        return;
      }

      // not found Page with the id
      result({ kind: "not_found" }, null);
    });
};

Page.updateById = (id, page, result) => {
  console.log(page);
  sql.query("UPDATE Page SET Name =?, Description =?, CategoryId =?, UserId =?, Followers =? WHERE id =?"
    , [page.Name, page.Description, page.CategoryId, page.UserId, page.Followers, id]
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

      console.log("updated page: ", { id: id, ...page });
      result(null, { id: id, ...page });
    }
  );
};

Page.remove = (id, result) => {
  sql.query("DELETE FROM Page WHERE id =?"
    , [id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Page with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted page with id: ", id);
      result(null, res);
    });
};

module.exports = Page;