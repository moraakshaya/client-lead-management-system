const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    leadId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Lead",
       require: true,
    },

    notes: {
        type: String,
        require: true,
        trim: true,
    },
},
{timestamps: true,}
);

module.exports = mongoose.model("Note", notesSchema);