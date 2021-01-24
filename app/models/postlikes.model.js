const sql = require("./db_mysql.js");

/*
Interact with DB 
*/

// constructor
const PostLikes = function (postlikes) {
  this.PostId = postlikes.PostId;
  this.UserId = postlikes.UserId;
};

PostLikes.create = (newPostLikes, result) => {
  sql.query(
    "INSERT INTO PostLikes (PostId, UserId) VALUES (?, ?)",
    [newPostLikes.PostId, newPostLikes.UserId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created PostLikes: ", { ...newPostLikes });
      result(null, { ...newPostLikes });
    }
  );
};

PostLikes.getAll = (result) => {
  sql.query("SELECT * FROM PostLikes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("PostLikes: ", res);
    result(null, res);
  });
};

PostLikes.findById = (postId, userId, result) => {
  console.log("p:" + postId + "  u:" + userId);
  sql.query(
    "SELECT * FROM PostLikes WHERE PostId =? AND UserId =?",
    [postId, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found PostLikes: ", res);
        result(null, res);
        return;
      }

      // not found PostLikes with the id
      result({ kind: "not_found" }, null);
    }
  );
};

PostLikes.findByUserId = (userId, result) => {
  console.log(userId);
  sql.query(
    "SELECT * FROM PostLikes WHERE UserId =?",
    [userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("User Liked: ", res);
        result(null, res);
        return;
      }

      // not found PostLikes with userId
      result({ kind: "not_found" }, null);
    }
  );
};

PostLikes.findByPostId = (postId, result) => {
  console.log(postId);
  sql.query(
    "SELECT * FROM PostLikes WHERE PostId =?",
    [postId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Post liked by: ", res);
        result(null, res);
        return;
      }

      // not found PostLikes with Id
      result({ kind: "not_found" }, null);
    }
  );
};

PostLikes.remove = (postId, userId, result) => {
  sql.query(
    "DELETE FROM PostLikes WHERE PostId =? AND UserId =?",
    [postId, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PostLikes with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted PostLikes with p: {0}  u: {1}", postId, userId);
      result(null, res);
    }
  );
};

module.exports = PostLikes;
