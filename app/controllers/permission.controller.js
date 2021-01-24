const Permission = require("../models/permission.model.js");
const Validator = require("validatorjs");
/*
validations and call models
*/

const validationRule = {
  Description: "required|string",
};

// Create and Save a new Category
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

  // Create a Permission
  const permission = new Permission({
    Description: req.body.Description,
  });

  // Save Permission in the database
  Permission.create(permission, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Permission.",
      });
    else
      res.status(200).send({
        message: "Permission successfully created!",
      });
  });
};

// Retrieve all Permissions from the database.
exports.findAll = (req, res) => {
  Permission.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Permissions.",
      });
    else res.send(data);
  });
};

// Find a single Permission with a permissionId
exports.findOne = (req, res) => {
  Permission.findById(req.params.permissionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Permission with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

// Update a Permission identified by the permissionId in the request
exports.update = (req, res) => {
  // Validate Request
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

  Permission.updateById(
    req.params.permissionId,
    new Permission(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Permission with id ${req.params.permissionId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Permission with id " + req.params.permissionId,
          });
        }
      } else
        res.status(200).send({
          message: "Permission successfully updated!",
        });
    }
  );
};

// Delete a Permission with the specified permissionId in the request
exports.delete = (req, res) => {
  Permission.remove(req.params.permissionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Permission with id ${req.params.permissionId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Permission with id " + req.params.permissionId,
        });
      }
    } else
      res.status(200).send({
        message: "Permission successfully deleted!",
      });
  });
};
