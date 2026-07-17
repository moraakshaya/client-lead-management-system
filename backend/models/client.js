const mongoose = require('mongoose'); // Importing Mongoose to define the schema and model for the Client collection

// Define the schema for the Client collection
const clientSchema = new mongoose.Schema({
    clientName: {
        type: String, // The name of the client
        required: true // The clientName field is required and cannot be empty
    },
    companyName: {
        type: String, // The name of the company associated with the client
    },
    email: {
        type: String, // The email address of the client
    },
    phone: {
        type: String, // The phone number of the client
    },
    address: {
        type: String, // The address of the client
    },
    leadId: {
        type: mongoose.Schema.Types.ObjectId, // The ID of the lead associated with the client, referencing the Lead collection
        ref: 'Lead' // Establishing a reference to the Lead model, allowing for population of lead data when querying clients
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    priority: {
        type: String,
        enum: ['Standard', 'VIP'],
        default: 'Standard'
    }
},
 {
    timestamps: true // Automatically add createdAt and updatedAt fields to the schema
 }
)

// Export the Client model based on the clientSchema
module.exports = mongoose.model('Client', clientSchema); // Exporting the Client model to be used in other parts of the application, allowing for interaction with the Client collection in the MongoDB database