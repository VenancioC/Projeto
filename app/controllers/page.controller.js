const Page = require("../models/page.model.js");
const Validator = require("validatorjs");
/*
validations and call models
*/

const validationRule = {
  Name: "required|string",
  Description: "string",
  CategoryId: "integer",
  UserId: "required|integer",
  Followers: "integer",
};

// Create and Save a new Page
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

  // Create a Page
  const page = new Page({
    Name: req.body.Name,
    Description: req.body.Description,
    CategoryId: req.body.CategoryId,
    UserId: req.body.UserId,
    Followers: req.body.Followers,
  });
  
  // Save Page in the database
  Page.create(page, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Page.",
      });
    else
      res.status(200).send({
        message: "Page successfully created!",
      });
  });
};

// Retrieve all Page from the database.
exports.findAll = (req, res) => {
  Page.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Pages.",
      });
    else res.send(data);
  });
};

// Find a single Page with a PageId
exports.findOne = (req, res) => {
  Page.findById(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Page with id " + req.params.pageId,
        });
      }
    } else res.send(data);
  });
};

// Update a page identified by the pageId in the request
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

  Page.updateById(req.params.pageId, new Page(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Page with id " + req.params.pageId,
        });
      }
    } else
      res.status(200).send({
        message: "Page successfully updated!",
      });
  });
};

// Delete a Page with the specified pageId in the request
exports.delete = (req, res) => {
  Page.remove(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Page with id " + req.params.pageId,
        });
      }
    } else
      res.status(200).send({
        message: "Page successfully deleted!",
      });
  });
};
