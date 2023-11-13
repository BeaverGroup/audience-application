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
  addSub,
  unSub,
  allSub,
  updateSub,
} = require("../Controllers/subController");

const {
  verifyCookieToken,
} = require("../Middlewares/authMiddle");
const jsonParser = bodyParser.json();
const {
  addVote,
  removeVote,
  allVotes,
} = require("../Controllers/voteController");
require("dotenv").config();

//user
router.get("/infoByEmail/:Email", jsonParser, verifyCookieToken, infoUserByEmail); // register user (http://localhost:3002/user/infoByEmail)
router.get("/infoByID/:_id", jsonParser, verifyCookieToken, infoUserByID); // register user (http://localhost:3002/user/infoByID)
router.get("/list", jsonParser, verifyCookieToken, allinfoUser); // register user
router.post("/updateByID", jsonParser, verifyCookieToken, updateUserByID); // update user
router.post("/updateByEmail", jsonParser, verifyCookieToken, updateUserByEmail); // update user
router.delete("/removeByID", jsonParser, verifyCookieToken, removeUserByID); // register user (http://localhost:3002/user/infoByID)
router.delete("/removeByEmail", jsonParser,verifyCookieToken ,removeUserByEmail); // register user (http://localhost:3002/user/infoByID)

// vote
router.delete("/unvote/:id", jsonParser, verifyCookieToken, removeVote);
router.post("/vote/:id", jsonParser, verifyCookieToken, addVote);
router.get("/userAllvote/:id", jsonParser, verifyCookieToken, allVotes);

// sub
router.post("/subscribe/:id", jsonParser, verifyCookieToken, addSub); // add sport into subscribe (http://localhost:3002/user/subscribe/:id)
router.delete("/unsubscribe/:id", jsonParser, verifyCookieToken, unSub); // unsubcribe sport from subscribe (http://localhost:3002/user/unsubscribe/:id)
router.get("/userAllsub/:id", jsonParser, verifyCookieToken, allSub); // get all user's subscribetions (http://localhost:3002/user/userAllsub/:id)
router.post("/updateSub/:id", jsonParser, verifyCookieToken, updateSub);

module.exports = router;
