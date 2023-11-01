const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const {
  infoUserByEmail,
  allinfoUser,
  infoUserByID,
  removeUserByID,
  removeUserByEmail,
  updateUserByID,
  updateUserByEmail,
} = require("../Controllers/userController");
const {
  checkTokenGMiddle,
  verifyCookieToken,
} = require("../Middlewares/authMiddle");

// const { registerUser, loginUser } = require("../Controllers/authController");

const jsonParser = bodyParser.json();
const {
  addVote,
  removeVote,
  allVotes,
} = require("../Controllers/voteController");

require("dotenv").config();

//user
router.get("/infoByEmail", jsonParser, verifyCookieToken, infoUserByEmail); // register user (http://localhost:3002/user/infoByEmail)
router.get("/infoByID", jsonParser, verifyCookieToken, infoUserByID); // register user (http://localhost:3002/user/infoByID)
router.get("/list", jsonParser, verifyCookieToken, allinfoUser); // register user
router.post("/updateByID", jsonParser, verifyCookieToken, updateUserByID); // update user
router.post("/updateByEmail", jsonParser, verifyCookieToken, updateUserByEmail); // update user
router.delete("/removeByID", jsonParser, verifyCookieToken, removeUserByID); // register user (http://localhost:3002/user/infoByID)
router.delete("/removeByEmail", jsonParser, removeUserByEmail); // register user (http://localhost:3002/user/infoByID)

// vote
router.delete("/unvote/:id", jsonParser, verifyCookieToken, removeVote);
router.post("/vote/:id", jsonParser, verifyCookieToken, addVote);
router.get("/userAllvote/:id", jsonParser, verifyCookieToken, allVotes);

module.exports = router;
