const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const path = require("path");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/friends", (req, res) => {
  res.send("api routes");
});

router.post("/friends", (req, res) => {
  res.redirect("/friends");
});
module.exports = router;
