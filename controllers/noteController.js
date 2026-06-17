const Notes = require('../models/note');

//Create Note
exports.createNote = async (req, res) => {
    try {
        const newNote = await Notes.create(req.body);
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Get All Notes
exports.getAllNotes = async(req,res) => {
    try {
        const notes = await Notes.find()
        .populate("leadId");
        res.status(201).json(notes);
    } catch(err) {
        res.status(500).json({
            message:err.message,
        });
    }
};

//Get Notes By Lead 
exports.getNotesById = async (req,res) => {
    try {
        const notes = await Notes.find({
            leadId: req.params.leadId,
        }).sort({ createdAt: -1 });
        
        res.status(201).json(notes);
    } catch(err) {
        res.status(500).json({
            message:err.message,
        });
    }
};

//Update Note
exports.updateNotes = async (req,res) => {
    try {
        const notes = await Notes.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(201).json(notes);
    } catch(err) {
        res.status(500).json({
            message:err.message,
        });
    }
};

//Delete Notes
exports.deleteNotes = async (req,res) => {
    try {
        const notes = await Notes.findByIdAndDelete(req.params.id);
         res.status(201).json({
            message: "Follow-Up Deleted Successfully",
        });
    } catch(err) {
        res.status(500).json({
            message:err.message,
        });
    }
}
