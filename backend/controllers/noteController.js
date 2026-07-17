const Notes = require('../models/note');
const Activity = require('../models/activity');

//Create Note
exports.createNote = async (req, res) => {
    try {
        const newNote = await Notes.create(req.body);
        //Note Added Activity Log
        await Activity.create({
            action: "Note Added",
            description: `Notes : ${newNote.notes}`,
            leadId: newNote.leadId,
        });
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Get All Notes (with pagination, filtering, and populated lead data)
exports.getAllNotes = async (req, res) => {
    try {
        const { type, status, search, page = 1, limit = 10 } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { notes: { $regex: search, $options: 'i' } }
            ];
        }

        // Apply filters if they exist in the URL request
        if (type) query.relatedToModel = type; // "Lead" or "Client"
        if (status === "Pinned") query.isPinned = true;
        if (status === "Active") query.isPinned = false;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitNumber = parseInt(limit);

        // Fetch notes, fetch the associated lead/client name, and sort by newest first
        const notes = await Notes.find(query)
            .populate('leadId', 'leadName companyName') // Fetches the actual name!
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const totalNotes = await Notes.countDocuments(query);
        const totalPages = Math.ceil(totalNotes / limitNumber);

        res.status(200).json({
            data: notes,
            pagination: {
                totalNotes,
                totalPages,
                currentPage: parseInt(page),
                limit: limitNumber
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


//Get Notes By Lead 
exports.getNotesById = async (req, res) => {
    try {
        const notes = await Notes.find({
            leadId: req.params.leadId,
        }).sort({ createdAt: -1 });

        res.status(201).json(notes);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Update Note
exports.updateNotes = async (req, res) => {
    try {
        const notes = await Notes.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(201).json(notes);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

//Delete Notes
exports.deleteNotes = async (req, res) => {
    try {
        const notes = await Notes.findByIdAndDelete(req.params.id);
        res.status(201).json({
            message: "Follow-Up Deleted Successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}


// Get Note Stats
exports.getNoteStats = async (req, res) => {
    try {
        // Fetch all 4 metrics at the exact same time
        const [totalNotes, leadNotes, clientNotes, pinnedNotes] = await Promise.all([
            Notes.countDocuments(),
            Notes.countDocuments({ relatedToModel: "Lead" }),
            Notes.countDocuments({ relatedToModel: "Client" }),
            Notes.countDocuments({ isPinned: true })
        ]);

        res.status(200).json({
            totalNotes,
            leadNotes,
            clientNotes,
            pinnedNotes
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
