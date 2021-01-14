const Validator = require("validatorjs");
/*
validations and call models
*/

const validationRule = {
  Text: "required|string",
  Date: "required|date",
  CommentId: "integer",
  UserId: "required|integer",
  PostId: "required|integer",
};

// Create Comment
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

  // Create a Comment
  const comment = new Comment({
    Text: req.body.Text,
    Date: req.body.Date,
    CommentId: req.body.CommentId,
    UserId: req.body.UserId,
    PostId: req.body.PostId,
  });

  // Save Customer in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    else
      res.status(200).send({
        message: "Comment successfully created!",
      });
  });
};

// Retrieve all Comment from the database.
exports.findAll = (req, res) => {
  Comment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    else res.send(data);
  });
};

// Find a single Comment with a commentId
exports.findOne = (req, res) => {
  Comment.findById(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.commentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Comment with id " + req.params.commentId,
        });
      }
    } else res.send(data);
  });
};

// Find  Comments with a postId
exports.findByPost = (req, res) => {
  Comment.findByPostId(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comments for post ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Comments for Post " + req.params.postId,
        });
      }
    } else res.send(data);
  });
};

// Update a Comment identified by the commentId in the request
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

  Comment.updateById(
    req.params.commentId,
    new Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.commentId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.params.commentId,
          });
        }
      } else
        res.status(200).send({
          message: "Comment successfully updated!",
        });
    }
  );
};

// Delete a Comment with the specified commentId in the request
exports.delete = (req, res) => {
  Comment.remove(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.commentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Comment with id " + req.params.commentId,
        });
      }
    } else
      res.status(200).send({
        message: "Comment successfully deleted!",
      });
  });
};
