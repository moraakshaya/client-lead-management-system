const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { createFollowUp, getAllFollowUps, getFollowUpByLead, updateFollowUp, deleteFollowUp, getFollowUpStats } = require('../controllers/followUpController');

router.use(authMiddleware);

//Define Routes
router.post('/', createFollowUp);
router.get('/', getAllFollowUps);
router.get('/stats', getFollowUpStats);
router.get('/lead/:leadId', getFollowUpByLead);
router.patch('/:id', updateFollowUp);
router.delete('/:id', deleteFollowUp);

module.exports = router;