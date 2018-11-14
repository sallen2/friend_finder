// dependencies
require("dotenv").config();
const express = require("express");
const path = require("path");
// intializing app
const app = express();

// requiring routes
const homeRoutes = require("./app/routing/htmlRoutes.js");
const apiRoutes = require("./app/routing/apiRoutes.js");

// global middleware
app.use(express.static(path.join(__dirname, "/app/public")));
app.use("/", homeRoutes);
app.use("/api", apiRoutes);

// server listening
app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port 8080");
});
