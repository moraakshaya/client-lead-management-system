const Client = require('../models/client'); // Importing the Client model to interact with the Client collection in the MongoDB database
const Lead = require('../models/lead');
const Activity = require('../models/activity');

// Controller function to create a new client
exports.createClient = async (req, res) => {
    try {
        const newClient = await Client.create(req.body); // Create a new instance of the Client model using the data from the request body
        res.status(201).json(newClient); // Send a response with status code 201 (Created) and the newly created client in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to retrieve all clients
exports.getAllClients = async (req, res) => {
    try {
        const { search, status, priority, sort, page = 1, limit = 10 } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { clientName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ];
        }

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let clientsQuery = Client.find(query);

        if (sort === "oldest") {
            clientsQuery = clientsQuery.sort({ createdAt: 1 });
        } else {
            clientsQuery = clientsQuery.sort({ createdAt: -1 }); // Default newest
        }

        clientsQuery = clientsQuery.skip(skip).limit(limitNumber);

        const clients = await clientsQuery;
        const totalClients = await Client.countDocuments(query);
        const totalPages = Math.ceil(totalClients / limitNumber);

        res.status(200).json({
            clients,
            pagination: {
                totalClients,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to retrieve a single client by its ID
exports.getClientsById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id); // Retrieve a client from the database using the findById() method of the Client model

        if (!client) { // Check if the client was not found
            return res.status(404).json({
                message: 'Client not found' // Send a response with status code 404 (Not Found) and a message indicating that the client was not found
            });
        }
        res.status(201).json(client); // Send a response with status code 201 (Created) and the client in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to update a client by its ID
exports.updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedClient) { // Check if the client was not found
            return res.status(404).json({
                message: 'Client not found' 
            });
        }
        
        await Activity.create({
            action: "Client Updated",
            description: `${updatedClient.clientName} updated`,
            ClientId: updatedClient._id,
        });

        res.status(201).json(updatedClient); 
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to delete a client by its ID
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id); 

        if (!client) { 
            return res.status(404).json({
                message: 'Client not found' 
            });
        }

        // --- CASCADING DELETES ---
        // Delete all orphaned follow-ups, notes, and activities to keep dashboard stats accurate
        const FollowUp = require('../models/followUp');
        const Note = require('../models/note');
        const Activity = require('../models/activity');

        await Promise.all([
            FollowUp.deleteMany({ leadId: client._id }),
            Note.deleteMany({ leadId: client._id }),
            Activity.deleteMany({ $or: [{ leadId: client._id }, { ClientId: client._id }] })
        ]);

        await Activity.create({
            action: "Client Deleted",
            description: `${client.clientName || 'A client'} was deleted`
        });

        res.status(201).json({ message: 'Client and all associated data deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
};

exports.convertLeadToClient = async (req, res) => {
    try {

        console.log("Lead ID:", req.params.leadId);

        const allLeads = await Lead.find();
        console.log("All Leads:", allLeads);

        const lead = await Lead.findById(req.params.leadId);
        console.log("Lead Found:", lead);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        const existingClient = await Client.findOne({
            leadId: lead._id,
        });

        if (existingClient) {
            return res.status(400).json({
                message: "Leads already converted",
            });
        }

        const client = await Client.create({
            clientName: lead.leadName,
            companyName: lead.companyName,
            email: lead.email,
            phone: lead.phone,
            leadId: lead._id,
        });

        lead.status = "Won";
        await lead.save();

        //Lead Converted Activity Log

        await Activity.create({
            action: "Lead Converted",
            description: `${lead.leadName} converted to client`,
            leadId: lead._id,
            clientId: client._id,
        });

        res.status(201).json({
            message: "Lead converted successfully",
            client,
        });
    } catch (err) {

        res.status(500).json({
            message: err.message,
        });
    }
};

exports.getClientStats = async (req, res) => {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

        const totalClients = await Client.countDocuments();
        const activeClients = await Client.countDocuments({ status: "Active" });
        const vipClients = await Client.countDocuments({ priority: "VIP" });
        const newClients = await Client.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        const inactiveClients = await Client.countDocuments({ status: "Inactive" });

        res.status(200).json({
            totalClients,
            activeClients,
            vipClients,
            newClients,
            inactiveClients
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
