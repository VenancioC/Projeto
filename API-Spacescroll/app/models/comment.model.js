const sql = require("./db_mysql.js");

/*
Interact with DB
*/

// constructor
const Comment = function (comment) {
  this.Text = comment.Text
  this.Date = comment.Date;
  this.CommentId = comment.CommentId;
  this.UserId = comment.UserId;
  this.PostId = comment.PostId;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO Comment (Text, Date, CommentId, UserId, PostId) VALUES (?, ?, ?, ?, ?)"
    , [newComment.Text, newComment.Date, newComment.CommentId, newComment.UserId, newComment.PostId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created comment: ", { id: res.insertId, ...newComment });
      result(null, { id: res.insertId, ...newComment });
    });
};

Comment.getAll = result => {
  sql.query("SELECT * FROM Comment"
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Comments: ", res);
      result(null, res);
    });
};

Comment.findById = (commentId, result) => {
  console.log(commentId);
  sql.query("SELECT * FROM Comment WHERE id =?"
    , [commentId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found comment: ", res);
        result(null, res);
        return;
      }

      // not found Comment with the id
      result({ kind: "not_found" }, null);
    });
};

Comment.findByPostId = (postId, result) => {
  console.log(postId);
  sql.query(`SELECT c.*, u.Username FROM Comment c
            inner join User u on u.Id = c.UserId 
            WHERE PostId =? ORDER BY Date DESC`
    , [postId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found comments: ", res);
        result(null, res);
        return;
      }

      // not found Comment with postId
      result({ kind: "not_found" }, null);
    });
};

Comment.updateById = (id, comment, result) => {
  sql.query("UPDATE Comment SET Text =?, Date =?, CommentId =?, UserId =?, PostId =? WHERE id =?"
    , [comment.Text, comment.Date, comment.CommentId, comment.UserId, comment.PostId, id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

Comment.remove = (id, result) => {
  sql.query("DELETE FROM Comment WHERE id =?"
    , [id]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted comment with id: ", id);
      result(null, res);
    });
};

module.exports = Comment;
