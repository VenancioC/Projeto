const sql = require("./db_mysql.js");

const bcrypt = require('bcrypt');
const config = require('../config/config');
/*
Interact with DB
*/

// constructor
const User = function (user) {
  this.Username = user.Username
  this.Name = user.Name;
  this.Email = user.Email;
  this.Password = user.Password;
  this.BirthDate = user.BirthDate;
  this.Genre = user.Genre;
};

User.create = (newUser, result) => {
  bcrypt.hash(newUser.Password, config.saltRounds, function (err, hash) {
    newUser.Password = hash;
    sql.query("INSERT INTO User (Username, Name, Email, Password, BirthDate, Genre) VALUES (?, ?, ?, ?, ?, ?)"
      , [newUser.Username, newUser.Name, newUser.Email, newUser.Password, newUser.BirthDate, newUser.Genre]
      , (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
      });
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM User"
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Users: ", res);
      result(null, res);
    });
};

User.findById = (userId, result) => {
  console.log(userId);
  sql.query("SELECT * FROM User WHERE id =?"
    , [userId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res);
        result(null, res);
        return;
      }

      // not found User with the id
      result({ kind: "not_found" }, null);
    });
};

User.updateById = (id, user, result) => {
  console.log(user);
  bcrypt.hash(user.Password, config.saltRounds, function (err, hash) {
    user.Password = hash;
    sql.query("UPDATE User SET Username =?, Name =?, Email =?, Password =?, BirthDate =?, Genre =? WHERE id =?"
      , [user.Username, user.Name, user.Email, user.Password, user.BirthDate, user.Genre, id]
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

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  });
};

User.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE id =?"
    , [id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
    });
};

module.exports = User;
