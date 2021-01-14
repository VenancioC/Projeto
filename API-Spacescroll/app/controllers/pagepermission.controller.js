const PagePermission = require("../models/pagepermission.model.js");
const Validator = require("validatorjs");

/*
Validations and call models
*/

const validationRule = {
  UserId: "required|integer",
  PageId: "required|integer",
  PermissionId: "required|integer",
};

// Create and Save a new PagePermission
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

  // Create a PagePermission
  const pagepermission = new PagePermission({
    UserId: req.body.UserId,
    PageId: req.body.PageId,
    PermissionId: req.body.PermissionId,
  });

  // Save PagePermission in the database
  PagePermission.create(pagepermission, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the PagePermission.",
      });
    else
      res.status(200).send({
        message: "Permission successfully created!",
      });
  });
};

// Retrieve all PagePermission from the database.
exports.findAll = (req, res) => {
  PagePermission.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving PagePermissions.",
      });
    else res.send(data);
  });
};

// Find a single PagePermission with userId and pageId
exports.findOne = (req, res) => {
  PagePermission.findById(req.params.userId, req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PagePermission with user ${req.params.userId} and page ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving PagePermission with user " +
            req.params.userId +
            " and page " +
            +req.params.pageId,
        });
      }
    } else res.send(data);
  });
};

// Update a PagePermission identified by the userId and pageId in the request
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

  PagePermission.updateById(
    req.params.userId,
    req.params.pageId,
    new PagePermission(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found PagePermission with user ${req.params.userId} and page ${req.params.pageId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating PagePermission with user" +
              req.params.userId +
              " and page " +
              req.params.pageId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a PagePermission with the specified userId and pageId in the request
exports.delete = (req, res) => {
  PagePermission.remove(req.params.userId, req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PagePermission with user ${req.params.userId} and page ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete PagePermission with user " +
            req.params.userId +
            " and page " +
            req.params.pageId,
        });
      }
    } else
      res.status(200).send({
        message: "Permission successfully deleted!",
      });
  });
};
