const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema ({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true,
    },

    followUpDate: {
        type: Date,
        required: true,
    },

    followUpType: {
        type: String,
        enum: ["Call", "Email", "Meeting", "Demo", "WhatsApp"],
        required: true,
    },

    remarks: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
    },
},
{timestamps: true,}
);

module.exports = mongoose.model("FollowUp", followUpSchema);