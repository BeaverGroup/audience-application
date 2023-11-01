const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.use(morgan("dev")); // console log when server using any api
app.use(cors({ credentials: true, origin: "http://localhost:4001" })); // Enable CORS for all routes / check policies when requesting routes
app.use(express.json()); // change json to javascript
app.use(cookieParser());

require("dotenv").config(); // Load environment variables from .env file

const connectDB = require("./Config/db");
connectDB();

const userRouter = require("./Routes/userRoute");
const authRouter = require("./Routes/authRoute");

app.use("/user", userRouter); // use and set prefix path of Insurance
app.use("/auth", authRouter);

// Listen server
app.listen(process.env.SERVER_PORT || 4002, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 4002}`);
});
