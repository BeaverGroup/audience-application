const { user_model } = require("../Models/userModel.js");

exports.addSub = async (req, res) => {
  try {
    const User_Id = req.params.id;
    const sportToSubscribe = req.body.Sport;

    // Find the user by ID
    const user = await user_model.findById(User_Id);
    if (!user) {
      return res.status(400).json({ error: `User id ${User_Id} not found.` });
    }

    // Initialize the Subscribe array if it does not exist
    if (!user.Subscribe) {
      user.Subscribe = [];
    }

    // Check if the user is already subscribed to the sport
    if (user.Subscribe.includes(sportToSubscribe)) {
      return res.status(400).json({
        error: `You are already subscribed to ${sportToSubscribe}.`,
      });
    }

    // Add the new subscription
    user.Subscribe.push(sportToSubscribe);
    await user.save();

    // Send a success response
    res.json({ message: `Successfully subscribed to ${sportToSubscribe}.` });
  } catch (err) {
    console.error(err); // Updated to use error logging
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.unSub = async (req, res) => {
  try {
    const User_Id = req.params.id;
    const sportToUnSubscribe = req.body.Sport;
    const user = await user_model.findById(User_Id);
    if (!user) {
      return res.status(400).json({ error: `User id ${User_Id} not found.` });
    }

    if (user.Subscribe.includes(sportToUnSubscribe)) {
      user.Subscribe.splice(user.Subscribe.indexOf(sportToUnSubscribe), 1);
      await user.save();
      return res.json({
        message: `Successfully Unsubscribed to ${sportToUnSubscribe}.`,
      });
    }
    return res.status(400).json({
      error: `You have not been subscribed to ${sportToUnSubscribe}.`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.allSub = async (req, res) => {
  try {
    const User_Id = req.params.id;
    const user = await user_model.findById(User_Id);
    if (!user) {
      return res.status(400).json({ error: `User id ${User_Id} not found.` });
    }
    const user_sub = user.Subscribe;
    res.json({ user_email: user.Email, subscribe: user_sub });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// diff
exports.updateSub = async (req, res) => {
  // Replace all current subscriptions with a new list.
  try {
    const User_Id = req.params.id;
    const updatedSubscriptions = req.body.Sport;

    const user = await user_model.findById(User_Id);
    if (!user) {
      return res.status(400).json({ error: `User id ${User_Id} not found.` });
    }

    user.Subscribe = updatedSubscriptions;
    await user.save();
    res.json({ message: `Successfully updated subscriptions.` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
