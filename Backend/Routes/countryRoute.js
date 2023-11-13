const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const { addCountryCount } = require("../Controllers/countryController");
const jsonParser = bodyParser.json();

router.post("/add/:country", jsonParser, addCountryCount);

module.exports = router;
