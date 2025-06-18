const express = require('express');
const router = express.Router();
const customerStatsController = require('../controllers/customerStatsController');

// Get customer segmentation data
router.get('/', customerStatsController.getCustomerStats);

module.exports = router;