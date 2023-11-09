const { user_model } = require("../Models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { Name, Gender, Age, Nationality, Password, Email } = req.body;

    const user = await user_model.findOne({ Email });
    if (user) {
      return res.status(409).json({ message: "Email is already used" });
    }
    const newUser = new user_model({
      Name,
      Gender,
      Age,
      Nationality,
      Email,
      Password: await bcrypt.hash(Password, 10),
    });
    // Using async/await to save the user and generate token
    try {
      const saved_user = await newUser.save();

      const token_payload = { Email: Email, Role: newUser.Role };
      const token = jwt.sign(token_payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      const threeDays = 3 * 24 * 60 * 60 * 1000; // number of milliseconds in 3 days
      res
        .status(201)
        .cookie("authToken", token, {
          maxAge: threeDays,
          // httpOnly: true, // Recommended for security reasons
          // secure: false, // Ensure this is true if you are using HTTPS
          secure: false, // <-- false here when served over HTTP
          // sameSite: "None", // Important for cross-site access if your API and client are on different domains
        })
        .json({
          message: "User account created successfully.",
          token,
          user: saved_user,
        });
    } catch (err) {
      console.error("Error saving user or generating token:", err);
      return res.status(500).json({
        error: "Internal server error while saving user or generating token",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    var user = await user_model.findOne({ Email });

    if (!user) {
      return res.status(400).json({ message: "Email is not found" });
    }
    // Check password
    const isPasswordMatched = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Password is wrong" });
    }
    const tokenPayload = { Email: Email, Role: user.Role };
    jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: "3d" }, // set exp of token for req api
      (err, token) => {
        if (err) {
          console.error("Failed to generate token", err);
          return res
            .status(500)
            .json({ error: "Internal server error (Generate Token Fail)" });
        }
        const threeDays = 3 * 24 * 60 * 60 * 1000; // number of days of exp cookie
        res
          .status(201)
          .cookie("authToken", token, {
            maxAge: threeDays,
            // httpOnly: true, // Recommended for security reasons
            // secure: false, // Ensure this is true if you are using HTTPS
            secure: false, // <-- false here when served over HTTP
            // sameSite: "None", // Important for cross-site access if your API and client are on different domains
          })
          .json({
            message: "User account created successfully.",
            user,
          });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginGoogle = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await user_model.findOne({ Email });
    //.exec(function(err, user) { }-> use for callback but you can is await insteand .exec
    if (!user) {
      // use register api instead login google
      return res.status(409).json({ message: "Email not used" });
    }
    try {
      const token_payload = { Email: Email, Role: user.Role };
      const token = jwt.sign(token_payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      console.log("token >>>>>> ", token);
      const threeDays = 3 * 24 * 60 * 60 * 1000; // number of milliseconds in 3 days
      return res
        .status(201)
        .cookie("authToken", token, {
          maxAge: threeDays,
          // httpOnly: true, // Recommended for security reasons
          secure: false, // Ensure this is true if you are using HTTPS
          // sameSite: "None", // Important for cross-site access if your API and client are on different domains
        })
        .json({ message: "Login success", token, user });
    } catch (err) {
      console.error("Error saving user or generating token:", err);
      return res.status(500).json({
        error: "Internal server error while saving user or generating token",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
