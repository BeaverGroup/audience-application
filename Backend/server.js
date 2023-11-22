const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_IP }));
app.use(express.json());
app.use(cookieParser());

// Database connection and route requires remain the same
const connectDB = require("./Config/db");
connectDB();

const healthController = require("./Controllers/healthController");
const userRouter = require("./Routes/userRoute");
const authRouter = require("./Routes/authRoute");
const countryRouter = require("./Routes/countryRoute");

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.get("/health", healthController.healthCheck);
app.use("/country", countryRouter);


module.exports = app; // Export the app
