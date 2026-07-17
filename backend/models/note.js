const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    // Keeps track of the Lead (or Client) this note belongs to
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true,
    },

    // NEW: The title of the Note
    title: {
        type: String,
        default: "Note",
        trim: true,
    },

    // The actual text content
    notes: {
        type: String,
        required: true,
        trim: true,
    },

    // NEW: Is this note for a Lead or a Client?
    relatedToModel: {
        type: String,
        enum: ["Lead", "Client"],
        default: "Lead"
    },

    // NEW: Pin / Unpin functionality
    isPinned: {
        type: Boolean,
        default: false,
    },

    // NEW: Who wrote this note
    createdBy: {
        type: String,
        default: "Admin"
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Note", notesSchema);
