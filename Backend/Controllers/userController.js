// create user and manage user (base structure user information in register account and login account / accress a)

const { user_model } = require("../Models/userModel");

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

exports.updateUserByEmail = async (req, res) => {
  try {
    const {
      Name,
      Gender,
      Age,
      Nationality,
      Subscribe,
      Votes,
      Email,
      // NewEmail, // Use this if the email needs to be updated
    } = req.body;

    const updatedUser = await user_model.findOneAndUpdate(
      { Email: Email }, // Find user by this email
      {
        Name,
        Gender,
        Age,
        Nationality,
        Subscribe,
        Votes,
        // Email: NewEmail || Email, // Update email if NewEmail is provide
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated document before saving
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUserByID = async (req, res) => {
  try {
    const { Name, Gender, Age, Nationality, Subscribe, Votes, _id } = req.body;

    const updatedUser = await user_model.findOneAndUpdate(
      { _id: _id }, // Find user by this email
      {
        Name,
        Gender,
        Age,
        Nationality,
        Subscribe,
        Votes,
      },
      {
        new: true,
        runValidators: true, // check requirement field of schema
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
