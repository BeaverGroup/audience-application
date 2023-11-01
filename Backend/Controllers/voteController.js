// vote and unvote for matches

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { user_model } = require("../Models/userModel.js");

exports.addVote = async (req, res) => {
    try {
        const User_Id = req.params.id;
        const matchID = req.body.matchID;
        const vote = req.body.vote;

        const user = await user_model.findById(User_Id);
        if (!user) {
            return res.status(400).json({ error: `User id ${User_Id} not found.` });
        }

        const voteIndex = user.Votes.findIndex(v => v.matchID === matchID);
        if (voteIndex !== -1) {
            return res.status(400).json({ error: `You have already voted for matchID ${matchID}.` });
        }

        user.Votes.push({ matchID, vote });
        await user.save();

        res.json({ message: `Successfully voted for matchID ${matchID}.` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.removeVote = async (req, res) => {
    try {
        const User_Id = req.params.id;
        const matchID = req.body.matchID;

        const user = await user_model.findById(User_Id);
        if (!user) {
            return res.status(400).json({ error: `User id ${User_Id} not found.` });
        }

        const voteIndex = user.Votes.findIndex(v => v.matchID === matchID);
        if (voteIndex !== -1) {
            user.Votes.splice(voteIndex, 1);
            await user.save();
            return res.json({ message: `Successfully removed your vote for matchID ${matchID}.` });
        }

        return res.status(400).json({ error: `You have not voted for matchID ${matchID}.` });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.allVotes = async (req, res) => {
    try {
        const User_Id = req.params.id;
        const user = await user_model.findById(User_Id);
        if (!user) {
            return res.status(400).json({ error: `User id ${User_Id} not found.` });
        }

        const user_votes = user.Votes;
        res.json({ 'user_email': user.Email, 'votes': user_votes });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
