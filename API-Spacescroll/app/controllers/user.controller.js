const User = require("../models/user.model.js");
const Validator = require("validatorjs");
/*
validations and call methods
*/

const validationRule = {
  Username: "required|string",
  Name: "required|string",
  Email: "required|email",
  Password: "required|string",
  BirthDate: "date",
  Genre: "integer",
};

// Create User
exports.create = (req, res) => {
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

  // Create a User
  const user = new User({
    Username: req.body.Username,
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    BirthDate: req.body.BirthDate,
    Genre: req.body.Genre,
  });

  // Save Customer in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else
      res.status(200).send({
        message: "User successfully created!",
      });
  });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    else res.send(data);
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  } else {
    let validation = new Validator(req.body, validationRule);

    if (validation.fails()) {
      res.status(422).send({
        message: validation.errors.errors,
      });
    }
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.userId,
        });
      }
    } else
      res.status(200).send({
        message: err.message || "User successfully updated!",
      });
  });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else
      res.status(200).send({
        message: "User successfully deleted!",
      });
  });
};
