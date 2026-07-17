const followUp = require('../models/followUp');
const FollowUp = require('../models/followUp');
const Activity = require('../models/activity');

//Create Follow Up
exports.createFollowUp = async (req, res) => {
    try {
        const newFollowUp = await FollowUp.create(req.body);
        //Follow-Up Added Activity Log
        await Activity.create({
            action: "Follow-Up Added",
            description: newFollowUp.remarks,
            leadId: newFollowUp.leadId,
        });
        res.status(201).json(newFollowUp);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get All Follow Ups
// Get All Follow Ups (with pagination, filtering, and populated lead data)
exports.getAllFollowUps = async (req, res) => {
    try {
        const { status, type, page = 1, limit = 10 } = req.query;

        let query = {};

        // Apply filters if they exist in the request
        if (status) query.status = status;
        if (type) query.followUpType = type;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitNumber = parseInt(limit);

        // Fetch follow-ups, fetch the associated lead's name, and sort by newest first
        const followUps = await FollowUp.find(query)
            .populate('leadId', 'leadName companyName') // This fetches the lead's name instead of just the ID
            .sort({ followUpDate: -1 }) // -1 sorts by descending (newest first)
            .skip(skip)
            .limit(limitNumber);

        const totalFollowUps = await FollowUp.countDocuments(query);
        const totalPages = Math.ceil(totalFollowUps / limitNumber);

        // Return the data alongside pagination metadata
        res.status(200).json({
            data: followUps,
            pagination: {
                totalFollowUps,
                totalPages,
                currentPage: parseInt(page),
                limit: limitNumber
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


//Get Follow-Ups By Lead
exports.getFollowUpByLead = async (req, res) => {
    try {
        const followUps = await FollowUp.find({
            leadId: req.params.leadId,
        });
        res.status(201).json(followUps);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Update Follow-Up
exports.updateFollowUp = async (req, res) => {
    try {
        const followUp = await FollowUp.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(201).json(followUp);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Delete Follow-Up
exports.deleteFollowUp = async (req, res) => {
    try {
        const followUp = await FollowUp.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message: "Follow-Up Deleted Successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


// Get Follow-up Stats
exports.getFollowUpStats = async (req, res) => {
    try {
        const now = new Date();

        // Start and end of today
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(startOfToday);
        endOfToday.setDate(endOfToday.getDate() + 1);

        // End of the upcoming week
        const endOfUpcomingWeek = new Date(endOfToday);
        endOfUpcomingWeek.setDate(endOfUpcomingWeek.getDate() + 7);

        // Fetch all metrics using Promise.all for better performance
        const [total, today, upcoming, completed, overdue] = await Promise.all([
            // 1. Total Follow-ups
            FollowUp.countDocuments(),

            // 2. Scheduled for Today (and not completed)
            FollowUp.countDocuments({
                followUpDate: { $gte: startOfToday, $lt: endOfToday },
                status: { $ne: "Completed" }
            }),

            // 3. Upcoming within the next 7 days (and not completed)
            FollowUp.countDocuments({
                followUpDate: { $gte: endOfToday, $lt: endOfUpcomingWeek },
                status: { $ne: "Completed" }
            }),

            // 4. Completed
            FollowUp.countDocuments({ status: "Completed" }),

            // 5. Overdue (Past date and not completed)
            FollowUp.countDocuments({
                followUpDate: { $lt: startOfToday },
                status: { $ne: "Completed" }
            })
        ]);

        res.status(200).json({
            total,
            today,
            upcoming,
            completed,
            overdue
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


