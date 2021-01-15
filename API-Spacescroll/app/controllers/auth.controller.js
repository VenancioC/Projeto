const Auth = require("../models/auth.model.js");
const User = require("../models/user.model.js");
const Validator = require("validatorjs");

//Signup
//using create in user controller

const validationRule = {
  Email: "required|email",
  Password: "required|string",
};

// Signin
exports.signin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  } else {
    let validation = new Validator(req.body, validationRule);
    if (!validation.passes()) {
      res.status(422).send({
        message: validation.errors.errors,
      });
      return;
    }
  }

  const user = new User({
    Password: req.body.Password,
    Email: req.body.Email,
  });

  // Save Customer in the database
  Auth.signin(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else {
      res.send(data);
    }
  });
};
