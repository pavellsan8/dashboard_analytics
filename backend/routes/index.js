const express = require('express');
const router = express.Router();

const healthChecker = require('./healthChecker')
const getKpiCardData = require('./kpiCardRoute')
const getTopRegionData = require('./regionStatsRoute')
const getCustomerStatsData = require('./customerStatsRoute')
const getProductPerformanceRoute = require('./productPerformanceRoute');

router.use('/health-checker', healthChecker)
router.use('/kpi-card-data', getKpiCardData)
router.use('/top-region-data', getTopRegionData)
router.use('/customer-segment-data', getCustomerStatsData)
router.use('/product-performance', getProductPerformanceRoute);

module.exports = router