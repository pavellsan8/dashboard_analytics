const express = require('express');
const router = express.Router();

const healthChecker = require('./healthChecker')
const getKpiCardData = require('./kpiCardRoute')

router.use('/health-checker', healthChecker)

router.use('/kpi-data-card', getKpiCardData)

module.exports = router