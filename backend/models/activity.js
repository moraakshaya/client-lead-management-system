const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    // The main title of the activity
    action: {
        type: String,
        required: true,
    },

    // A deeper explanation of what happened
    description: {
        type: String,
        required: true,
    },

    // Link to Lead (if applicable)
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
    },

    // Link to Client (if applicable)
    ClientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },

    // NEW: The system module (e.g., 'Leads Module', 'Notes Module')
    module: {
        type: String,
        default: 'System Module'
    },

    // NEW: Text for the colored badge (e.g., 'Active', 'Completed')
    status: {
        type: String,
        default: 'Added'
    },

    // NEW: A keyword used by the frontend to pick the correct icon
    type: {
        type: String,
        default: 'note'
    },

    // NEW: The user who caused the activity
    createdBy: {
        type: String,
        default: 'Admin'
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Activity", activitySchema);
