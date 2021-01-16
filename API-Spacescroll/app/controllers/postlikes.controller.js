const PostLikes = require("../models/postlikes.model.js");
const Validator = require("validatorjs");
/*
validations and call models
*/

const validationRule = {
  PostId: "required|integer",
  UserId: "required|integer",
};

// Create PostLikes
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

  // Create a PostLikes
  const postlikes = new PostLikes({
    PostId: req.body.PostId,
    UserId: req.body.UserId,
  });

  // Save PostLikes in the database
  PostLikes.create(postlikes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PostLikes.",
      });
      else res.status(200).send({
        message: "Post Liked successfully!",
      });
  });
};

// Retrieve all PostLikes from the database.
exports.findAll = (req, res) => {
  PostLikes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving PostLikes.",
      });
    else res.send(data);
  });
};

// Find a single PostLikes with a postId and userId
exports.findOne = (req, res) => {
  PostLikes.findById(req.params.postId, req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PostLikes with p: ${req.params.postId}  u: ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving PostLikes with p: " +
            req.params.postId +
            "   u: " +
            req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Find PostLikes with userId
exports.findByUser = (req, res) => {
  PostLikes.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PostLikes for user ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PostLikes for user " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Find PostLikes with postId
exports.findByPost = (req, res) => {
  PostLikes.findByPostId(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PostLikes for post ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PostLikes for post " + req.params.postId,
        });
      }
    } else res.send(data);
  });
};

// Delete a PostLikes with the specified postId and userId in the request
exports.delete = (req, res) => {
  PostLikes.remove(req.params.postId, req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PostLikes with post ${req.params.postId} e user ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete PostLikes with post " +
            req.params.postId +
            " e user " +
            req.params.userId,
        });
      }
    }  else res.status(200).send({
      message: "Post Like successfully deleted!",
    });
  });
};
