const FollowUp = require('../models/followUp');

//Create Follow Up
exports.createFollowUp = async (req,res) => {
    try {
        const newFollowUp = await FollowUp.create(req.body);
        res.status(201).json(newFollowUp);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get All Follow Ups
exports.getAllFollowUps = async (req,res) => {
    try {
        const followUps = await FollowUp.find();
        res.status(201).json(followUps);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get Follow-Ups By Lead
exports.getFollowUpByLead = async (req,res) => {
    try {
        const followUps = await FollowUp.find({
            leadId: req.params.leadId,
        });
        res.status(201).json(followUps);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Update Follow-Up
exports.updateFollowUp = async (req,res) => {
    try {
        const followUp = await FollowUp.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(201).json(followUp);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Delete Follow-Up
exports.deleteFollowUp = async (req,res) => {
    try {
        const followUp = await FollowUp.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message: "Follow-Up Deleted Successfully",
        });
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

