const express = require('express');
const router = express.Router();
const regionStatsController = require('../controllers/regionStatsController');

// Get top region data
router.get('/', regionStatsController.getTopRegionSalesData);

module.exports = router;