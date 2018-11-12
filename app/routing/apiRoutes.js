const express = require("express");
const bodyParser = require("body-parser");
const friendsdb = require("../data/friends");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/friends", (req, res) => {
  setTimeout(()=>{
    friendsdb.selectFrom("*", res);
    friendsdb.findFriends(res);
  },1500)
});

router.post("/friends", (req, res) => {
  let name = req.body.name;
  let url = req.body.photo;
  let score = [req.body.q1,req.body.q2,req.body.q3,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10]
  friendsdb.createTable(name, url, `${score}`);
  res.redirect("/api/friends");
});

module.exports = router;
