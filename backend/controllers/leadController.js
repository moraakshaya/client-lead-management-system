const Lead = require('../models/lead'); // Importing the Lead model to interact with the Lead collection in the MongoDB database
const Activity = require('../models/activity');

// Controller function to create a new lead
exports.createLead = async (req, res) => {
    try {
        const newLead = await Lead.create(req.body); // Create a new instance of the Lead model using the data from the request body
        // Create Activity Log
        await Activity.create({
            action: "Lead Created",
            description: `${newLead.leadName} created`,
            leadId: newLead._id,
        });

        res.status(201).json(newLead); // Send a response with status code 201 (Created) and the newly created lead in JSON format
    } catch (err) {
        res.status(500).json({
            message: err.message,
        }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to retrieve all leads
exports.getAllLeads = async (req, res) => {
    try {
        const { search, status, source, sort, page = 1, limit = 10 } = req.query;

        let query = {};

        //Search By Lead Name, Email, Phone
        if (search) {
            query.$or = [
                { leadName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ];
        }

        //Filter By Status
        if (status) {
            query.status = status;
        }

        //Filter by Source
        if (source) {
            query.source = source;
        }

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let leadsQuery = Lead.find(query);

        //Sort
        if (sort === "oldest") {
            leadsQuery = leadsQuery.sort({ createdAt: 1 });
        } else {
            leadsQuery = leadsQuery.sort({ createdAt: -1 }); // Default newest
        }

        // Pagination
        leadsQuery = leadsQuery.skip(skip).limit(limitNumber);

        const leads = await leadsQuery;
        const totalLeads = await Lead.countDocuments(query);
        const totalPages = Math.ceil(totalLeads / limitNumber);

        res.status(200).json({
            leads,
            pagination: {
                totalLeads,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to retrieve a single lead by its ID
exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id); // Retrieve a lead from the database using the findById() method of
        res.status(200).json(lead); // Send a response with status code 200 (OK) and the lead in JSON format
    } catch (err) {
        res.status(500).json(err); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to update a lead by its ID
exports.updateLead = async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ); // Update a lead in the database using the findByIdAndUpdate() method of the Lead model, passing the lead ID and the updated data from the request body

        // Create Activity when status changes
        if (req.body.status) {
            await Activity.create({
                action: "Status Updated",
                description: `Lead moved to ${req.body.status}`,
                leadId: updatedLead._id,
            });
        }

        res.json(updatedLead); // Send a response with the updated lead in JSON format
    } catch (err) {
        res.status(500).json(err); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to delete a lead by its ID
exports.deleteLead = async (req, res) => {
    try {
        const deleteLead = await Lead.findByIdAndDelete(req.params.id); // Delete a lead from the database using the findByIdAndDelete() method of the Lead model, passing the lead ID
        res.json({ message: 'Lead deleted successfully' }); // Send a response with a success message in JSON format
    } catch (err) {
        res.status(500).json(err); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

exports.getLeadStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: "New" });
        const qualifiedLeads = await Lead.countDocuments({ status: "Qualified" });
        const convertedLeads = await Lead.countDocuments({ status: "Won" });
        const lostLeads = await Lead.countDocuments({ status: "Lost" });

        res.status(200).json({
            totalLeads,
            newLeads,
            qualifiedLeads,
            convertedLeads,
            lostLeads
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
