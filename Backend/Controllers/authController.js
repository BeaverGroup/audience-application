const { user_model } = require("../Models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// 1. set bcrypt to to password before sending to database
// 2. set status code

exports.registerUser = async (req, res) => {
  try {
    const {
      Name,
      Gender,
      Age,
      Nationality, 
      Password,
    } = req.body;

    var user = user_model.findOne({ Email }, { new: true });

    if (user) {
      return res.status(400).json({ message: "Email is already used" });
    }

    const newUser = new user_model({
      Name,
      Gender,
      Age,
      Nationality,
      Email,
      Password,
    });
    // check email is used
    var user = user_model.findOne({ Email });
    if (user) {
      return res.status(400).json({ message: "Email is already used" });
    }

    newUser.Password = await bcrypt.hash(Password, 10);
    newUser.save(err, (user) => {
      {
        if (err) {
          console.log(err);
          res.status(501).json({
            message:
              "Data that you assign server does not accept (501 Not Implemented)",
          });
        }
        res.status(201).json({ message: "User created", user });
      }
    });
    // res.status(201).json({ message: "User created", user: savedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    var user = user_model.findOneAndUpdate({ Email }, { new: true });

    if (!user) {
      return res.status(400).json({ message: "Email is not found" });
    }
    const isPasswordMatched = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Password is wrong" });
    }
    res.status(200).json({ message: "Login successfully", user });
    jwt.sign(
      { _id: user._id, Email: Email, Role: "user" },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, result_token) => {
        if (err) {
          res.status(500).json({ error: "Generate cookie fail" });
          // throw err;
          console.log(err);
          return;
        }
        res
          .status(200)
          .json({ message: "Login success", result_token, user })
          .cookie("token", result_token, {
            // httpOnly: true,
            // maxAge: 300000,
            secure: true,
            sameSite: none,
          }); // set cookie; // sent to fontend and add it to header
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
