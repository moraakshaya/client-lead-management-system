const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { getDashboardStats, getChartData, getRecentWork } = require('../controllers/dashboardController');

router.use(authMiddleware);

router.get('/stats', getDashboardStats);
router.get('/charts', getChartData);
router.get('/recent-work', getRecentWork);

module.exports = router;