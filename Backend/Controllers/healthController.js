// healthController.js

const mongoose = require("mongoose");
const connectDB = require("../Config/db"); // adjust the path as necessary

exports.healthCheck = async (req, res) => {
  try {
    // We try to connect to the database
    await connectDB();

    // If the connection is successful, we check if we're actually connected
    if (mongoose.connection.readyState === 1) {
      res.status(200).json({ status: 'UP', databaseStatus: 'Connected' });
    } else {
      throw new Error('Database connection is not ready');
    }
  } catch (error) {
    // If the connection fails, catch the error
    res.status(500).json({ status: 'DOWN', databaseStatus: 'Disconnected', error: error.message });
  }
};
