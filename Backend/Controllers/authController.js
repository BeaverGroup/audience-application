const { user_model } = require("../Models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// 1. set bcrypt to to password before sending to database
// 2. set status code

// exports.registerUser = async (req, res) => {
//   try {
//     const { Name, Gender, Age, Nationality, Password, Email } = req.body;

//     var user = await user_model.findOne({ Email });
//     console.log(user);
//     if (user) {
//       return res.status(400).json({ message: "Email is already used" });
//     }
//     const newUser = new user_model(
//       {
//         Name,
//         Gender,
//         Age,
//         Nationality,
//         Email,
//         Password,
//       },
//     //   { runValidators: true }
//     );

//     newUser.Password = await bcrypt.hash(Password, 10);
//     newUser.save((err, user) => {
//       {
//         if (err) {
//           console.log(err);
//           res.status(501).json({
//             message:
//               "Data that you assign server does not accept (501 Not Implemented)",
//           });
//         }
//         const tokenPayload = { Email: Email, Role: "User" };
//         jwt.sign(
//           tokenPayload,
//           process.env.JWT_SECRET,
//           { expiresIn: "3d" }, // set exp of token for req api
//           (err, token) => {
//             if (err) {
//               console.error("Failed to generate token", err);
//               return res
//                 .status(500)
//                 .json({ error: "Internal server error (Generate Token Fail)" });
//             }
//             const threeDays = 3 * 24 * 60 * 60 * 1000; // number of days of exp cookie
//             res
//               .status(201)
//               .cookie("authToken", token, {
//                 // httpOnly: true,
//                 maxAge: threeDays, // set exp of cookie in browser
//                 // secure: true,
//                 // sameSite: 'None',
//               })
//               .json({
//                 message: "User account created successfully.",
//                 token,
//                 user,
//               });
//           }
//         );
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.registerUser = async (req, res) => {
  try {
    const { Name, Gender, Age, Nationality, Password, Email } = req.body;

    const user = await user_model.findOne({ Email });

    if (user) {
      return res.status(400).json({ message: "Email is already used" });
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

      const token_payload = { Email: Email, Role: "User" };
      const token = jwt.sign(token_payload, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      const threeDays = 3 * 24 * 60 * 60 * 1000; // number of milliseconds in 3 days
      res.status(201).cookie("authToken", token, { maxAge: threeDays }).json({
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
    const tokenPayload = { Email: Email, Role: "User" };
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
            // httpOnly: true,
            maxAge: threeDays, // set exp of cookie in browser
            // secure: true,
            // sameSite: 'None',
          })
          .json({
            message: "User account created successfully.",
            token,
            user,
          });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
