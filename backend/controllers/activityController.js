const Activity = require('../models/activity');

//Create Activity

exports.createActivity = async (req, res) => {
    try {
        const activity = await Activity.create(req.body);

        res.status(201).json(activity);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get All Activities

// Get All Activities (with pagination)
exports.getAllActivities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20; // Load 20 activities at a time
        const skip = (page - 1) * limit;
        const { search, type, user, module, date } = req.query;

        let query = {};

        // Search logic
        if (search) {
            query.$or = [
                { action: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Dropdown filters
        if (type) query.action = { $regex: type, $options: 'i' }; // e.g., 'Note', 'Create'
        if (user) query.createdBy = user;
        if (module) query.module = module;

        // Date filter
        if (date) {
            const startOfDay = new Date(date);
            const endOfDay = new Date(date);
            endOfDay.setDate(endOfDay.getDate() + 1);

            query.createdAt = {
                $gte: startOfDay,
                $lt: endOfDay
            };
        }

        const activities = await Activity.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit)
            .populate('leadId', 'leadName companyName')
            .populate('ClientId', 'clientName companyName');

        const totalActivities = await Activity.countDocuments(query);
        const totalPages = Math.ceil(totalActivities / limit);

        res.status(200).json({
            data: activities,
            pagination: {
                totalActivities,
                totalPages,
                currentPage: page,
                limit
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


//Get Activity By Lead

exports.getActivityByLead = async (req, res) => {
    try {
        const activities = await Activity.find({
            leadId: req.params.leadId,
        }).sort({
            createdAt: 1,
        });

        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


// Get Activity Stats
exports.getActivityStats = async (req, res) => {
    try {
        // Calculate date boundaries
        const now = new Date();

        // Start of Today
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Start of this Week
        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

        // Start of this Month
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Run all database queries at the same time for max speed
        const [totalActivities, todayActivities, weeklyActivities, monthlyActivities, systemActivities] = await Promise.all([
            Activity.countDocuments(),
            Activity.countDocuments({ createdAt: { $gte: startOfToday } }),
            Activity.countDocuments({ createdAt: { $gte: startOfWeek } }),
            Activity.countDocuments({ createdAt: { $gte: startOfMonth } }),
            Activity.countDocuments({ createdBy: 'System' })
        ]);

        res.status(200).json({
            totalActivities,
            todayActivities,
            weeklyActivities,
            monthlyActivities,
            systemActivities
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
