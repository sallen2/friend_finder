const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();

router.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = router;
