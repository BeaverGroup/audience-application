const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev")); // console log when server using any api
app.use(cors()); // Enable CORS for all routes / check policies when requesting routes
app.use(express.json()); // change json to javascript

require("dotenv").config(); // Load environment variables from .env file

const connectDB = require("./Config/db");
connectDB();

const userRouter = require("./Routes/userRoute");

// const userSchema = {
//     _id: {
//       type: mongoose.Schema.Types.ObjectId,
//       index: true,
//       required: true,
//       auto: true,
//     },
//     Name: String,
//     Gender: String,
//     Age: {
//       type: Number,
//       min: [0, "Age must be more than and equal to 0"],
//     },
//     Nationality: String,
//     Subscribe: [String],
//     Vote: {
//       matchID: String,
//       vote: String
//     }
//   };

app.use("/user", userRouter); // use and set prefix path of Insurance
// app.use("/auth", authRouter);

// Listen server
app.listen(process.env.SERVER_PORT || 4002, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT || 4002}`);
});
