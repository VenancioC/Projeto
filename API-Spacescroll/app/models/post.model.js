const sql = require("./db_mysql.js");
/*
Interação com a base de dados utilizando os dados recebidos 
*/


// constructor
const Post = function (post) {
  this.Title = post.Title;
  this.Description = post.Description;
  this.Date = post.Date;
  this.UserId = post.UserId;
  this.PageId = post.PageId;
};

Post.create = (newPost, result) => {
  sql.query("INSERT INTO Post (Title, Description, Date, UserId, PageId) VALUES (?, ?, ?, ?, ?)"
    , [newPost.Title, newPost.Description, newPost.Date, newPost.UserId, newPost.PageId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created post: ", { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    });
};

Post.getAll = result => {
  sql.query("SELECT * FROM Post"
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Posts: ", res);
      result(null, res);
    });
};

Post.findById = (postId, result) => {
  console.log(postId);
  sql.query("SELECT * FROM Post WHERE id =?"
    , [postId]
    , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found Post: ", res);
        result(null, res);
        return;
      }

      // not found Post with the id
      result({ kind: "not_found" }, null);
    });
};

Post.updateById = (id, post, result) => {
  console.log(post);
  sql.query("UPDATE Post SET Title =?, Description =?, Date =?, UserId =?, PageId =? WHERE id =?"
    , [post.Title, post.Description, post.Date, post.UserId, post.PageId, id]
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

      console.log("updated post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Post.remove = (id, result) => {
  sql.query("DELETE FROM Post WHERE id =?"
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

      console.log("deleted post with id: ", id);
      result(null, res);
    });
};

module.exports = Post;
