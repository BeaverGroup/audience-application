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
const countryRouter = require("./Routes/countryRoute");

app.use("/user", userRouter); // use and set prefix path of Insurance
app.use("/auth", authRouter);
app.get("/health", healthController.healthCheck);
app.use("/country",countryRouter)


const PORT = process.env.SERVER_PORT ; // Use the port from the environment variables or default to 4000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} V3`);
});
