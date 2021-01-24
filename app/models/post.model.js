const sql = require("./db_mysql.js");
/*
Interact with DB
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
  sql.query(
    "INSERT INTO Post (Title, Description, Date, UserId, PageId) VALUES (?, ?, ?, ?, ?)",
    [
      newPost.Title,
      newPost.Description,
      newPost.Date,
      newPost.UserId,
      newPost.PageId,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created post: ", { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    }
  );
};

Post.getAll = (result) => {
  sql.query("SELECT * FROM Post", (err, res) => {
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
  sql.query(`SELECT p.*, pg.Name, u.Username FROM Post p
    inner join user u on u.Id  = p.UserId 
    inner join page pg on pg.Id = p.PageId 
    WHERE p.id =?`, [postId], (err, res) => {
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

Post.getFeedByUser = (userId, result) => {
  console.log(userId);
  sql.query(
    `select pt.*, pg.Name, u.Username from user u
    inner join pagefollows pf on pf.UserId = u.Id 
    inner join page pg on pg.Id = pf.PageId 
    inner join post pt on pt.PageId = pg.Id 
    where u.Id =?
    order by pt.Date desc`,
    [userId],
    (err, res) => {
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

      // not found Post in Feed
      result({ kind: "not_found" }, null);
    }
  );
};

Post.getByPage = (pageId, result) => {
  console.log(pageId);
  sql.query(
    `select pt.*, pg.Name, u.Username from page pg 
    inner join post pt on pt.PageId = pg.Id 
    inner join user u on u.Id = pt.UserId 
    where pg.Id =?
    order by pt.Date desc `,
    [pageId],
    (err, res) => {
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

      // not found Post in Feed
      result({ kind: "not_found" }, null);
    }
  );
};

Post.getRecents = (result) => {
  sql.query(
    `select pt.*, pg.Name, u.Username from post pt 
      inner join page pg on pg.Id = pt.PageId
      inner join user u on u.Id = pt.UserId 
      order by pt.Date desc`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("Posts: ", res);
      result(null, res);
    }
  );
};


Post.updateById = (id, post, result) => {
  console.log(post);
  sql.query(
    "UPDATE Post SET Title =?, Description =?, Date =?, UserId =?, PageId =? WHERE id =?",
    [post.Title, post.Description, post.Date, post.UserId, post.PageId, id],
    (err, res) => {
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
  sql.query("DELETE FROM Post WHERE id =?", [id], (err, res) => {
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
