const jwt = require("jsonwebtoken");
const config = require("./config/config");

module.exports = (req, res, next) => {
  let token;
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res
      .status("401")
      .json({ message: "Sorry you are not authenticated :(" });
  }
  console.log(token);
  jwt.verify(token, config.secret, async function (err, decoded) {
    if (!err && decoded) {
      next();
    } else {
      res.status("401").json({ message: "Sorry you are not authenticated :(" });
    }
  });
};
