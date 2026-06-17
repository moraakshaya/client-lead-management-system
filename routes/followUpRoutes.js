const express = require('express');
const router = express.Router();

const { createFollowUp, getAllFollowUps, getFollowUpByLead, updateFollowUp, deleteFollowUp } = require('../controllers/followUpController');

//Define Routes
router.post('/', createFollowUp);
router.get('/', getAllFollowUps);
router.get('/lead/:leadId', getFollowUpByLead);
router.patch('/:id', updateFollowUp);
router.delete('/:id', deleteFollowUp);

module.exports = router;