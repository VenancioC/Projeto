const Post = require("../models/post.model.js");
/*
Validações e chamar os metodos do models
*/

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Post
  const post = new Post({
    Title: req.body.Title, 
    Description: req.body.Description,
    Date: req.body.Date,
    UserId: req.body.UserId,
    PageId: req.body.PageId
  });

  console.log(req.body);
  console.log(post);

  // Save Post in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.send(data);
  });
};

// Retrieve all Post from the database.
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Posts."
      });
    else res.send(data);
  });
};

// Find a single Post with a postId
exports.findOne = (req, res) => {
  Post.findById(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Post with id " + req.params.postId
        });
      }
    } else res.send(data);
  });
};

// Update a Post identified by the postId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Post.updateById(
    req.params.postId,
    new Post(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Post with id " + req.params.postId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
  Post.remove(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Post with id " + req.params.postId
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};