const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    unique: true, // Ensures that each country name is only used once
  },
  count: {
    type: Number,
    required: true,
    min: [0, "Count must be non-negative"], // Ensures that count is non-negative
    validate: {
      validator: Number.isInteger,
      message: "Count must be an integer",
    },
  },
});

exports.country_model = mongoose.model("Country", countrySchema);
