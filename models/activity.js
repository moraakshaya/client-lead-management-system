const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    action : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    leadId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Lead",
    },

    ClientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Client",
    },
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("Activity", activitySchema);