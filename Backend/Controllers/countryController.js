const { country_model } = require("../Models/countryModel.js");

exports.addCountryCount = async (req, res) => {
  try {
    // Check if the country already exists
    const countryParam = req.params.country;

    const countryData = await country_model.findOne({ country: countryParam });

    if (countryData) {
      // If the country exists, increment the count
      countryData.count += 1;
      const newCountry = await countryData.save();
      res.json({
        message: `Successfully incremented ${countryParam}.`,
        cID: newCountry._id,
        country: newCountry.country,
        count: newCountry.count,
      });
    } else {
      // If the country does not exist, create a new one with count 1
      const newCountry = new country_model({ country: countryParam, count: 1 });
      await newCountry.save();
      res.json({
        message: `Successfully added ${countryParam} with count 1.`,
        cID: newCountry._id,
        country: newCountry.country,
        count: newCountry.count,
      });
    }
  } catch (err) {
    console.error("Error in increaseCountryCount:", err);
    throw err; // Rethrow the error to handle it in the calling function
  }
};

exports.reduceCountryCount = async (req, res, next) => {
    try {
      const countryParam = req.params.country;
  
      const countryData = await country_model.findOne({ country: countryParam });
  
      if (countryData && countryData.count > 0) {
        // If the country exists and count is greater than 0, decrement the count
        countryData.count -= 1;
        await countryData.save();
        res.json({
          message: `Successfully decremented ${countryParam}.`,
          cID: countryData._id,
          country: countryData.country,
          count: countryData.count,
        });
      } else if (countryData && countryData.count === 0) {
        // If the country exists but count is already 0, respond appropriately
        res.status(400).json({
          message: `Cannot decrement ${countryParam}, count is already at zero.`,
        });
      } else {
        // If the country does not exist, respond with an error message
        res.status(404).json({
          message: `Country ${countryParam} not found.`,
        });
      }
    } catch (err) {
      console.error("Error in reduceCountryCount:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
