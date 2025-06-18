const express = require('express');
const router = express.Router();
const salesTrendController = require('../controllers/salesTrendController')

router.get('/total-sales-stats', salesTrendController.getTotalSalesData);
router.get('/total-order-stats', salesTrendController.getTotalOrderData);
router.get('/ship-mode-stats', salesTrendController.getShipModeStatsData);

module.exports = router;