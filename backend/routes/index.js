const express = require('express');
const router = express.Router();

const healthChecker = require('./healthChecker')
const getKpiCardData = require('./kpiCardRoute')
const getTopRegionData = require('./regionStatsRoute')

router.use('/health-checker', healthChecker)
router.use('/kpi-card-data', getKpiCardData)
router.use('/top-region-data', getTopRegionData)

module.exports = router