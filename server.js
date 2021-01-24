const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();


app.use(cors({origin:true,credentials: true}));

/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
 */

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
require("./app/routes/post.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/pagefollow.routes.js")(app);
require("./app/routes/permission.routes.js")(app);
require("./app/routes/pagepermission.routes.js")(app);
require("./app/routes/postlikes.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
