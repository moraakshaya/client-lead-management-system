const lead = require('../models/lead');
const client = require('../models/client');
const followUp = require('../models/followUp');

exports.getDashboardStats = async (req,res) => {
    try {
        const totalLeads = await lead.countDocuments();

        const totalClients = await client.countDocuments();

        const totalFollowUps = await followUp.countDocuments();

        const pendingFollowUps = await followUp.countDocuments({
            status: "Pending",
        });

        const completedFollowUps = await followUp.countDocuments({
            status: "Completed",
        });

        const wonLeads = await lead.countDocuments({
            status: "Won",
        });

        const lostLeads = await lead.countDocuments({
            status: "Lost",
        });

        res.status(201).json({
            totalLeads,
            totalClients,
            totalFollowUps,
            pendingFollowUps,
            completedFollowUps,
            wonLeads,
            lostLeads
        });
    } catch(err) {
        res.status(500).json({
            message:err.message,
        });
    }
}; 