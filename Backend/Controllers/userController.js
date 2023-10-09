// create user and manage user (base structure user information in register account and login account / accress a)

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
      Subscribe,
      Votes,
      Email,
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
      Subscribe,
      Votes,
      Email,
      Password,
    });
    // check email is used

    newUser.Password = await bcrypt.hash(Password, 10);
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created", user: savedUser });
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

exports.infoUserByEmail = async (req, res) => {
  try {
    const UserData = req.body;
    const { Email } = UserData;
    const info = await user_model.findOne({ Email: Email }).exec();
    res.status(200).json({ message: "User information", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.infoUserByID = async (req, res) => {
  try {
    const UserData = req.body;
    const { _id } = UserData;
    const info = await user_model.findOne({ _id: _id }).exec();
    res.status(200).json({ message: "User information", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.allinfoUser = async (req, res) => {
  try {
    // const UserData = req.body;
    //   const { email } = UserData;
    const Data = await user_model.find({}).exec();

    res.status(200).json({ message: "ALL user information", Data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeUserByEmail = async (req, res) => {
  try {
    const UserData = req.body;
    const { Email } = UserData;
    const info = await user_model.findOneAndDelete({ Email: Email }).exec();
    res.status(200).json({ message: "User is removed", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeUserByID = async (req, res) => {
  try {
    const UserData = req.body;
    const { _id } = UserData;
    const info = await user_model.findOneAndDelete({ _id: _id }).exec();
    res.status(200).json({ message: "User is removed", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
