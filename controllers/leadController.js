const Lead = require('../models/lead'); // Importing the Lead model to interact with the Lead collection in the MongoDB database


// Controller function to create a new lead
exports.createLead = async (req, res) => {
    try {
        const newLead = await Lead.create(req.body); // Create a new instance of the Lead model using the data from the request body
        res.status(201).json(newLead); // Send a response with status code 201 (Created) and the newly created lead in JSON format
    } catch (err) {
        res.status(500).json(err); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to retrieve all leads
exports.getAllLeads = async (req, res) => {
    try {

        const { search, status, source, sort } = req.query;

        let query = {};

        //Search By Lead Name
        if (search) {
            query.$or = [
                {
                    leadName : {
                        $regex: search, //$regex means Search for matching text.
                        $options: "i",   //Means Case Insensitive Search, ignore uppercase or lowercase
                    },
                },
                {
                    email : {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    phone : {
                        $regex: search,
                        $options: "i",
                    },
                },
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

        let leadsQuery = Lead.find(query);

        //Sort
        if (sort === "oldest") {
            leadsQuery = leadsQuery.sort({
                createdAt: 1
            });
        }
        const leads = await leadsQuery; // Retrieve all leads from the database using the find() method of the Lead model
        res.status(201).json(leads); // Send a response with status code 201 (Created) and the list of leads in JSON format
    } catch (err) {
        res.status(500).json(err); // If an error occurs, send a response with status code 500 (Internal Server Error) and the error message in JSON format
    }
};

// Controller function to retrieve a single lead by its ID
exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id); // Retrieve a lead from the database using the findById() method of
        res.status(201).json(lead); // Send a response with status code 201 (Created) and the lead in JSON format
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



