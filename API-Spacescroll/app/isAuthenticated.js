const jwt = require("jsonwebtoken");
const config = require("./config/config");

module.exports =  (req, res, next) => {
    jwt.verify(req.cookies.auth, config.secret, async function (err, decoded) {
      if (!err && decoded) {
        next();
      } else {
        res
          .status("401")
          .json({ message: "Sorry you are not authenticated :(" });
      }
    });
  };