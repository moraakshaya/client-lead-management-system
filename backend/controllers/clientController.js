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
        const clients = await Client.find(); // Retrieve all clients from the database using the find() method of the Client model
        res.status(201).json(clients); // Send a response with status code 201 (Created) and the list of clients in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
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
                message: 'Client not found' // Send a response with status code 404 (Not Found) and a message indicating that the client was not found
            });
        }
        res.status(201).json(updatedClient); // Send a response with status code 201 (Created) and the updated client in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to delete a client by its ID
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id); // Delete a client from the database using the findByIdAndDelete() method of the Client model, passing the client ID

        if (!client) { // Check if the client was not found
            return res.status(404).json({
                message: 'Client not found' // Send a response with status code 404 (Not Found) and a message indicating that the client was not found
            });
        }
        res.status(201).json({ message: 'Client deleted successfully' }); // Send a response with status code 201 (Created) and a success message
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
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

