const express = require('express');
const router = express.Router();

const { getDashboardStats, getChartData, getRecentWork } = require('../controllers/dashboardController');

router.get('/stats', getDashboardStats);
router.get('/charts', getChartData);
router.get('/recent-work', getRecentWork);

module.exports = router;