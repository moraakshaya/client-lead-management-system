const lead = require('../models/lead');
const client = require('../models/client');
const followUp = require('../models/followUp');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalLeads = await lead.countDocuments();
        const totalClients = await client.countDocuments();
        const hotLeads = await lead.countDocuments({ status: "Qualified" });
        const pendingFollowUps = await followUp.countDocuments({ status: "Pending" });
        const completedFollowUps = await followUp.countDocuments({ status: "Completed" });
        const wonLeads = await lead.countDocuments({ status: "Won" });
        const lostLeads = await lead.countDocuments({ status: "Lost" });

        const totalFollowUps = await followUp.countDocuments();

        res.status(200).json({
            totalLeads,
            totalClients,
            hotLeads,
            totalFollowUps,
            pendingFollowUps,
            completedFollowUps,
            wonLeads,
            lostLeads
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}; 

exports.getChartData = async (req, res) => {
    try {
        const leadSources = await lead.aggregate([
            { $group: { _id: "$source", count: { $sum: 1 } } }
        ]);

        const currentYear = new Date().getFullYear();
        const leadTrend = await lead.aggregate([
            { 
                $match: { 
                    createdAt: { 
                        $gte: new Date(`${currentYear}-01-01`), 
                        $lte: new Date(`${currentYear}-12-31`) 
                    } 
                } 
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    leads: { $sum: 1 },
                    converted: { $sum: { $cond: [{ $eq: ["$status", "Won"] }, 1, 0] } },
                    pending: { $sum: { $cond: [{ $in: ["$status", ["New", "Contacted"]] }, 1, 0] } },
                    lost: { $sum: { $cond: [{ $eq: ["$status", "Lost"] }, 1, 0] } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json({ leadSources, leadTrend });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecentWork = async (req, res) => {
    try {
        const recentLeads = await lead.find().sort({ createdAt: -1 }).limit(5);
        let upcomingFollowUps = await followUp.find({ status: "Pending" })
                                                .sort({ followUpDate: 1 })
                                                .limit(5)
                                                .lean();

        // Extract unique leadIds
        const leadIdsToFetch = upcomingFollowUps.map(f => f.leadId).filter(Boolean);

        // Fetch matching Leads and Clients
        const [leads, clients] = await Promise.all([
            lead.find({ _id: { $in: leadIdsToFetch } }).select('leadName companyName source').lean(),
            client.find({ _id: { $in: leadIdsToFetch } }).select('clientName companyName').lean()
        ]);

        const leadMap = {};
        leads.forEach(l => leadMap[l._id.toString()] = l);
        clients.forEach(c => {
            leadMap[c._id.toString()] = {
                _id: c._id,
                leadName: c.clientName, // Map clientName to leadName for frontend
                companyName: c.companyName,
                isClient: true
            };
        });

        // Attach populated objects back
        upcomingFollowUps = upcomingFollowUps.map(f => ({
            ...f,
            leadId: f.leadId ? (leadMap[f.leadId.toString()] || null) : null
        }));

        res.status(200).json({ recentLeads, upcomingFollowUps });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};