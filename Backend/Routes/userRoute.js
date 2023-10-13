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

const { addSub } = require("../Controllers/subController")
const { unSub } = require("../Controllers/subController")
const jsonParser = bodyParser.json();
router.post("/subscribe/:id", jsonParser, addSub); // add sport into subscribe (http://localhost:3002/user/subscribe/:id)
router.delete("/unsubscribe/:id", jsonParser, unSub); // unsubcribe sport from subscribe (http://localhost:3002/user/unsubscribe/:id)
require("dotenv").config();

// ADD : check mail used before sending crateUser
router.post("/register", jsonParser, createUser); // register user   (http://localhost:3002/user/register)
router.get("/infoByEmail", jsonParser, infoUserByEmail); // register user (http://localhost:3002/user/infoByEmail)
router.get("/infoByID", jsonParser, infoUserByID); // register user (http://localhost:3002/user/infoByID)
router.get("/list", jsonParser, allinfoUser); // register user
router.delete("/removeByID", jsonParser, removeUserByID); // register user (http://localhost:3002/user/infoByID)
router.delete("/removeByEmail", jsonParser, removeUserByEmail); // register user (http://localhost:3002/user/infoByID)

// router.

module.exports = router;
