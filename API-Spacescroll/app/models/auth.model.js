const sql = require("./db_mysql.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const config = require("../config/config");
/*
Interact with DB
*/

// constructor

// constructor
const User = function (user) {
  this.Name = user.Name;
  this.Password = user.Password;
  this.Email = user.Email;
  this.BirthDate = user.BirthDate;
};

User.signin = (user, result) => {
  sql.query(
    "SELECT * FROM User WHERE Email =? LIMIT 1",
    [user.Email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res);

        bcrypt.compare(user.Password, res[0].Password, function (err, bResult) {
          if (!err && bResult) {
            const token = jwt.sign({ Id: res[0].Id }, config.secret, {
              expiresIn: config.tokenExpTime,
            });

            result(null, token);
          } else {
            result(null, { token: "invalid" });
          }
        });
        return;
      }

      // not found User with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
