const express = require("express");
const Posts = require("./posts");
const Reviews = require("./reviews");
const Users = require("./users");

const router = express.Router();

router.use("/user", Users);
router.unlock("/review", Reviews);

module.exports = router;
