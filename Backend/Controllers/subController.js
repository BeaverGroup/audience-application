// sent vote of user 

// api vote sport and subscribe sport
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { user_model } = require("../Models/userModel.js");

exports.addSub  = async (req, res) => {
    try {
        const User_Id = req.params.id
        const sportToSubscribe = req.body.Sport
        const user = await user_model.findById(User_Id)

        if (user.Subscribe.includes(sportToSubscribe)) {
            return res.status(400).json({ error: "You have been subscribed to this sport." });
        }
        user.Subscribe.push(sportToSubscribe);
        await user.save();
        res.json({ message: "Successfully subscribed to ${sportToSubscribe}." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

