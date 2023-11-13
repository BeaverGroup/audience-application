const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const { addCountryCount,reduceCountryCount } = require("../Controllers/countryController");
const jsonParser = bodyParser.json();

router.post("/add/:country", jsonParser, addCountryCount);
// 
router.post("/reduce/:country", jsonParser, reduceCountryCount);


module.exports = router;
