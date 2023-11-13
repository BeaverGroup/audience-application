const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(morgan("dev")); // console log when server using any api
app.use(cors({ credentials: true, origin: process.env.FRONTEND_IP })); // Enable CORS for all routes / check policies when requesting routes
app.use(express.json()); // change json to javascript
app.use(cookieParser());

const connectDB = require("./Config/db");
connectDB();

const healthController = require("./Controllers/healthController"); // adjust the path as necessary
const userRouter = require("./Routes/userRoute");
const authRouter = require("./Routes/authRoute");

app.use("/user", userRouter); // use and set prefix path of Insurance
app.use("/auth", authRouter);
app.get("/health", healthController.healthCheck);


const PORT = process.env.SERVER_PORT || 4000; // Use the port from the environment variables or default to 4000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} V3`);
});
