const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cookieParser());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node-server application." });
});


require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/page.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
