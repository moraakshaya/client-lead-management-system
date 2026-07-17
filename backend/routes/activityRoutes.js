const express = require('express');
const router = express.Router();

const { createActivity, getAllActivities, getActivityByLead, getActivityStats } = require("../controllers/activityController");

router.post('/', createActivity);
router.get('/', getAllActivities);
router.get('/stats', getActivityStats);

router.get('/lead/:leadId', getActivityByLead);


module.exports = router;
