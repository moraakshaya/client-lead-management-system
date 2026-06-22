const express = require('express');
const router = express.Router();

const { createActivity, getAllActivities, getActivityByLead } = require("../controllers/activityController");

router.post('/', createActivity);
router.get('/', getAllActivities);
router.get('/lead/:leadId', getActivityByLead);


module.exports = router;
