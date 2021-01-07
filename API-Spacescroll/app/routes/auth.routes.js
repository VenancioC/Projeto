module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  const config = require('../config/config');
  const jwt = require('jsonwebtoken');


  //Auth
  // SignUp
  app.post("/auth/signup", auth.signup);

  // signin
  app.post("/auth/signin", auth.signin);
};