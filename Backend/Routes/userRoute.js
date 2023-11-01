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
require("dotenv").config();

// ADD : check mail used before sending crateUser

router.get("/infoByEmail", jsonParser, verifyCookieToken, infoUserByEmail); // register user (http://localhost:3002/user/infoByEmail)
router.get("/infoByID", jsonParser, verifyCookieToken, infoUserByID); // register user (http://localhost:3002/user/infoByID)
router.get("/list", jsonParser, verifyCookieToken, allinfoUser); // register user

router.delete("/removeByID", jsonParser, verifyCookieToken, removeUserByID); // register user (http://localhost:3002/user/infoByID)
router.delete("/removeByEmail", jsonParser, removeUserByEmail); // register user (http://localhost:3002/user/infoByID)

router.post("/updateByID", jsonParser, verifyCookieToken, updateUserByID); // update user
router.post("/updateByEmail", jsonParser, verifyCookieToken, updateUserByEmail); // update user

module.exports = router;
