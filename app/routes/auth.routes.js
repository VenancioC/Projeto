module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const user = require("../controllers/user.controller.js");

  //Auth
  // SignUp
  app.post("/auth/signup", user.create);

  // signin
  app.post("/auth/signin", auth.signin);
};