const express = require('express');
const router = express.Router();
const kpiCardController = require('../controllers/kpiCardController');

// Get all KPIs
router.get('/', kpiCardController.getAllKpis);

module.exports = router;