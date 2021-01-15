const Category = require("../models/category.model.js");
const Validator = require("validatorjs");
/*
validations and call models
*/

const validationRule = {
  Category: "required|string",
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

  // Create a Category
  const category = new Category({
    Category: req.body.Category,
  });

  // Save Category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
      else res.status(200).send({
        message: "Category successfully created!",
      });
  });
};

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    else res.send(data);
  });
};

// Find a single Category with a categoryId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }else {
    let validation = new Validator(req.body, validationRule);
    if (!validation.passes()) {
      res.status(422).send({
        message: validation.errors.errors,
      });
      return;
    }
  }

  Category.updateById(
    req.params.categoryId,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.categoryId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Category with id " + req.params.categoryId,
          });
        }
      }  else res.status(200).send({
      message: "Category successfully updated!",
    });
    }
  );
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Category with id " + req.params.categoryId,
        });
      }
    }  else res.status(200).send({
      message: "User successfully deleted!",
    });
  });
};
