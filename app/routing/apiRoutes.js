const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const friendsdb = require("../data/friends");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/friends", (req, res) => {
  friendsdb.selectFrom("*", res);
});

router.post("/friends", (req, res) => {
  let name = req.body.name;
  let url = req.body.url;
  let score = req.body.score;
  friendsdb.createTable(name, url, score);
  res.redirect("/friends");
});

module.exports = router;
