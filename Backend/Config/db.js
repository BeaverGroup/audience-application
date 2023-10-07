require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");

// url = // mongodb://root:1234@localhost:27018/beaver?authSource=admin
const url_connection = `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
const connectDB = async () => {
  try {
    await mongoose.connect(
        url_connection,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Add this line to use the new MongoDB topology engine

      }
    );
    console.log(`DB Connected : ${url_connection}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB