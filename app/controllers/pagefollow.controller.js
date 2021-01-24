const PageFollow = require("../models/pagefollow.model.js");
const Validator = require("validatorjs");
/*
validations and call models
*/

const validationRule = {
  UserId: "required|integer",
  PageId: "required|integer",
};

// Create PageFollow
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

  // Create a PageFollow
  const pagefollow = new PageFollow({
    UserId: req.body.UserId,
    PageId: req.body.PageId,
  });

  // Save PageFollow in the database
  PageFollow.create(pagefollow, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PageFollow.",
      });
      else res.status(200).send({
        message: "Page Followed successfully!",
      });
  });
};

// Retrieve all PageFollow from the database.
exports.findAll = (req, res) => {
  PageFollow.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    else res.send(data);
  });
};

// Find a single PageFollow with a userId and pageId
exports.findOne = (req, res) => {
  PageFollow.findById(req.params.userId, req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PageFollow with u: ${req.params.userId}  p: ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving PageFollow with u: " +
            req.params.userId +
            "   p: " +
            req.params.pageId,
        });
      }
    } else res.send(data);
  });
};

// Find PageFollow with userId
exports.findByUser = (req, res) => {
  PageFollow.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PageFollow for user ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PageFollow for user " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Find PageFollow with pageId
exports.findByPage = (req, res) => {
  PageFollow.findByPageId(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PageFollow for page ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PageFollow for page " + req.params.pageId,
        });
      }
    } else res.send(data);
  });
};

// Delete a PageFollow with the specified userId and pageId in the request
exports.delete = (req, res) => {
  PageFollow.remove(req.params.userId, req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PageFollow with user ${req.params.userId} e page ${req.params.pageId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete PageFollow with user " +
            req.params.userId +
            " e page " +
            req.params.pageId,
        });
      }
    }  else res.status(200).send({
      message: "Page Follow successfully deleted!",
    });
  });
};
