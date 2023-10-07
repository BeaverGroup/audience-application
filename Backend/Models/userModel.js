const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');

const voteSchema = new mongoose.Schema(
  {
    matchID: {
      type: String,
      required: true,
    },
    vote: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    // index: true,
    required: true,
    auto: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  Age: {
    type: Number,
    min: [0, "Age must be more than and equal to 0"],
    required: true,
  },
  Nationality: {
    type: String,
    required: true,
  },
  Subscribe: {
    type: [String],
    default: undefined,
  },
  Votes: {
    type: [voteSchema], // Array of vote objects
    default: undefined,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  Password: {
    type: String,
    required: true,
  },
});

// Hashing the password before saving the user to the database
// userSchema.pre('save', async function (next) {
//   if (this.isModified('Password')) {
//     this.Password = await bcrypt.hash(this.Password, 10);
//   }
//   next();
// });

exports.UserModel = mongoose.model("User", userSchema);

// module.exports = UserModel;
