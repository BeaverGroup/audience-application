const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { registerUser, loginUser } = require("../Controllers/authController");

const jsonParser = bodyParser.json();
require("dotenv").config();

router.post("/register", jsonParser, registerUser); // register user   (http://localhost:3002/auth/register)
router.post("/login", jsonParser, loginUser); // register user (http://localhost:3002/auth/login)

module.exports = router;
