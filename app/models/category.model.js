const sql = require("./db_mysql.js");

//Interaction with data base 

// constructor
const Category = function (category) {
  this.Category = category.Category;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO Category (Category) VALUES (?)"
    , [newCategory.Category]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created Category: ", { id: res.insertId, ...newCategory });
      result(null, { id: res.insertId, ...newCategory });
    });
};

Category.getAll = result => {
  sql.query("SELECT * FROM Category"
  , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("categories: ", res);
      result(null, res);
  });
};

Category.findById = (categoryId, result) => {
  console.log(categoryId);
  sql.query("SELECT * FROM Category WHERE id =?"
    , [categoryId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found category: ", res);
        result(null, res);
        return;
      }

      // not found Category with the id
      result({ kind: "not_found" }, null);
    });
};

Category.updateById = (id, category, result) => {
  console.log(category);
  sql.query("UPDATE Category SET Category =? WHERE id =?"
    , [category.Category, id]
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

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM Category WHERE id =?"
    , [id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted category with id: ", id);
      result(null, res);
    });
};

module.exports = Category;