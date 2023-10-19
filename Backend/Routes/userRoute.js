const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const {
  createUser,
  infoUserByEmail,
  allinfoUser,
  infoUserByID,
  removeUserByID,
  removeUserByEmail,
} = require("../Controllers/userController");
const jsonParser = bodyParser.json();
const { addVote,removeVote,allVotes  } = require("../Controllers/voteController")

require("dotenv").config();

// ADD : check mail used before sending crateUser
router.post("/register", jsonParser, createUser); // register user   (http://localhost:3002/user/register)
router.post("/vote/:id", jsonParser, addVote);

router.post("/infoByEmail", jsonParser, infoUserByEmail); // register user (http://localhost:3002/user/infoByEmail)
router.get("/infoByID", jsonParser, infoUserByID); // register user (http://localhost:3002/user/infoByID)
router.get("/list", jsonParser, allinfoUser); // register user
router.get("/userAllvote/:id", jsonParser, allVotes); //


router.delete("/removeByID", jsonParser, removeUserByID); // register user (http://localhost:3002/user/infoByID)
router.delete("/removeByEmail", jsonParser, removeUserByEmail); // register user (http://localhost:3002/user/infoByID)
router.delete("/unvote/:id", jsonParser, removeVote); //




module.exports = router;
