const express = require("express");
const bodyParser = require("body-parser");
const friendsdb = require("../data/friends");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// global variables
let name = "undefined";

router.get("/friends", (req, res) => {
  if (name === "undefined") {
    res.redirect('/survey');
  } else {
    friendsdb.sendCompatibleFriends(name).then(friends => {
      res.json(friends);
    });
  }
});

router.post("/friends", (req, res) => {
  name = req.body.name;
  let url = req.body.photo;
  let score = [
    req.body.q1,
    req.body.q2,
    req.body.q3,
    req.body.q4,
    req.body.q5,
    req.body.q6,
    req.body.q7,
    req.body.q8,
    req.body.q9,
    req.body.q10
  ];
  friendsdb
    .createColumn(name, url, `${score}`)
    .then(resp => {
      console.log(resp);
      res.redirect("/api/friends");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
