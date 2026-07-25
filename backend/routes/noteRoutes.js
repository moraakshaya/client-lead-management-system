const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { createNote, getAllNotes, getNotesById, updateNotes, deleteNotes, getNoteStats } = require('../controllers/noteController');

router.use(authMiddleware);

//Define Routes
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/stats', getNoteStats);
router.get('/lead/:leadId', getNotesById);
router.patch('/:id', updateNotes);
router.delete('/:id', deleteNotes);

module.exports = router;