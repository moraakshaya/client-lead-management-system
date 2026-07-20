const mongoose = require('mongoose'); // Importing Mongoose to define the schema and model for the Lead collection

// Define the schema for the Lead collection
const leadSchema = new mongoose.Schema({
    leadName: String, // The name of the lead
    companyName: String, // The name of the company associated with the lead
    email: String, // The email address of the lead
    phone: String, // The phone number of the lead
    source: String, // The source from which the lead was acquired (e.g., website, referral, etc.)
    status: {
        type: String, // The status of the lead (e.g., new, contacted, qualified, etc.)
        enum: ["New", "Contacted", "Qualified", "Won", "Lost"],
        default: 'New' // Default value for the status field is 'new'
    },
    priority: {
        type: String,
        default: 'Medium'
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    budget: String,
    notes: String // Additional notes about the lead
},
{ timestamps: true } // Automatically add createdAt and updatedAt fields to the schema
);

//export the Lead model based on the leadSchema
module.exports = mongoose.model('Lead', leadSchema); // Exporting the Lead model to be used in other parts of the application, allowing for interaction with the Lead collection in the MongoDB database