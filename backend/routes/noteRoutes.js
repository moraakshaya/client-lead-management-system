const express = require('express');
const router = express.Router();

const { createNote, getAllNotes, getNotesById, updateNotes, deleteNotes } = require('../controllers/noteController');

//Define Routes
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/lead/:leadId', getNotesById);
router.patch('/:id', updateNotes);
router.delete('/:id', deleteNotes);

module.exports = router;