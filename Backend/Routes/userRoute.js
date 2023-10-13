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

const { registerUser } = require("../Controllers/authController");

const jsonParser = bodyParser.json();
require("dotenv").config();

// ADD : check mail used before sending crateUser
router.post("/register", jsonParser, registerUser); // register user   (http://localhost:3002/user/register)
router.get("/login", jsonParser, infoUserByEmail); // register user (http://localhost:3002/user/login)

router.get("/infoByEmail", jsonParser, infoUserByEmail); // register user (http://localhost:3002/user/infoByEmail)
router.get("/infoByID", jsonParser, infoUserByID); // register user (http://localhost:3002/user/infoByID)
router.get("/list", jsonParser, allinfoUser); // register user

router.delete("/removeByID", jsonParser, removeUserByID); // register user (http://localhost:3002/user/infoByID)
router.delete("/removeByEmail", jsonParser, removeUserByEmail); // register user (http://localhost:3002/user/infoByID)

router.post("/updateByID", jsonParser, updateUserByID); // update user
router.post("/updateByEmail", jsonParser, updateUserByEmail); // update user

module.exports = router;
