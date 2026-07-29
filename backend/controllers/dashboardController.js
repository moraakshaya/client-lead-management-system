const lead = require('../models/lead');
const client = require('../models/client');
const followUp = require('../models/followUp');

exports.getDashboardStats = async (req, res) => {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        
        const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
        const endOfYesterday = new Date(startOfToday.getTime() - 1);

        const calcTrend = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100);
        };

        const getTrendType = (trend) => {
            if (trend > 0) return 'positive';
            if (trend < 0) return 'negative';
            return 'neutral';
        };

        const formatTrend = (trend) => {
            if (trend > 0) return `+${trend}%`;
            if (trend < 0) return `${trend}%`;
            return '0%';
        };

        // Total Leads (last 30 days vs previous 30 days)
        const currentLeads = await lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo, $lte: now } });
        const previousLeads = await lead.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } });
        const leadsTrend = calcTrend(currentLeads, previousLeads);

        // Total Clients (last 30 days vs previous 30 days)
        const currentClients = await client.countDocuments({ createdAt: { $gte: thirtyDaysAgo, $lte: now } });
        const previousClients = await client.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } });
        const clientsTrend = calcTrend(currentClients, previousClients);

        // Converted to Clients (Won Leads in last 30 days vs previous 30 days)
        const currentConverted = await lead.countDocuments({ status: "Won", updatedAt: { $gte: thirtyDaysAgo, $lte: now } });
        const previousConverted = await lead.countDocuments({ status: "Won", updatedAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } });
        const convertedTrend = calcTrend(currentConverted, previousConverted);

        // Followups Today vs Yesterday
        const currentFollowups = await followUp.countDocuments({ followUpDate: { $gte: startOfToday, $lte: endOfToday } });
        const previousFollowups = await followUp.countDocuments({ followUpDate: { $gte: startOfYesterday, $lte: endOfYesterday } });
        const followupsTrend = calcTrend(currentFollowups, previousFollowups);

        res.status(200).json({
            leads: { 
                value: currentLeads, 
                trend: formatTrend(leadsTrend), 
                trendType: getTrendType(leadsTrend) 
            },
            clients: { 
                value: currentClients, 
                trend: formatTrend(clientsTrend), 
                trendType: getTrendType(clientsTrend) 
            },
            converted: { 
                value: currentConverted, 
                trend: formatTrend(convertedTrend), 
                trendType: getTrendType(convertedTrend) 
            },
            followups: { 
                value: currentFollowups, 
                trend: formatTrend(followupsTrend), 
                trendType: getTrendType(followupsTrend) 
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getChartData = async (req, res) => {
    try {
        const { timeRange = 'This Year' } = req.query;
        let startDate = new Date();
        let endDate = new Date();
        
        const currentYear = new Date().getFullYear();
        
        switch (timeRange) {
            case 'This Week':
                const firstDay = startDate.getDate() - startDate.getDay();
                startDate = new Date(startDate.setDate(firstDay));
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'This Month':
                startDate = new Date(currentYear, startDate.getMonth(), 1);
                break;
            case 'Last 6 Months':
                startDate.setMonth(startDate.getMonth() - 6);
                break;
            case 'This Year':
            default:
                startDate = new Date(`${currentYear}-01-01`);
                endDate = new Date(`${currentYear}-12-31`);
                break;
        }

        const leadSources = await lead.aggregate([
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            { $group: { _id: "$source", count: { $sum: 1 } } }
        ]);

        let groupBy = { $month: "$createdAt" };
        if (timeRange === 'This Week' || timeRange === 'This Month') {
            groupBy = { $dayOfMonth: "$createdAt" };
        }

        const leadTrend = await lead.aggregate([
            { 
                $match: { 
                    createdAt: { 
                        $gte: startDate, 
                        $lte: endDate 
                    } 
                } 
            },
            {
                $group: {
                    _id: groupBy,
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