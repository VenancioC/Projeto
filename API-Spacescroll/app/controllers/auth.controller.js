const Auth = require("../models/auth.model.js");
const User = require("../models/user.model.js");
const cookie = require("cookie");
const config = require("../config/config");

// Create User
exports.signup = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a User
  const user = new User({
    Username: req.body.Username,
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    BirthDate: req.body.BirthDate,
    Genre: req.body.Genre,
  });

  console.log(user);

  // Save Customer in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

// Signin
exports.signin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = new User({
    Password: req.body.Password,
    Email: req.body.Email,
  });

  console.log(req.body);
  console.log(user);

  // Save Customer in the database
  Auth.signin(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      console.log("token: " + data);
      res.send(data);
    }
  });
};
