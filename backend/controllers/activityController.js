const Activity = require('../models/activity');

//Create Activity

exports.createActivity = async (req,res) => {
    try {
        const activity = await Activity.create(req.body);

        res.status(201).json(activity);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get All Activities

exports.getAllActivities = async (req,res) => {
    try {
        const activities = await Activity.find().sort({ createdAt : 1 });

        res.status(201).json(activities);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get Activity By Lead

exports.getActivityByLead = async (req,res) => {
    try {
        const activities = await Activity.find({
            leadId: req.params.leadId,
        }).sort({
            createdAt : 1,
        });

        res.status(200).json(activities);
    } catch(err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

