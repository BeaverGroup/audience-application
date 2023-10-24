const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { registerUser, loginUser, loginGoogle } = require("../Controllers/authController");
const { checkTokenGMiddle } = require("../Middlewares/authMiddle");
const jsonParser = bodyParser.json();
require("dotenv").config();

router.post("/register", jsonParser, registerUser); // register user  
router.post("/login", jsonParser, loginUser); // register user 
router.post("/google-login", jsonParser, checkTokenGMiddle, loginGoogle); // register user 

module.exports = router;
