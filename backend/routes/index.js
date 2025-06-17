const express = require('express');
const router = express.Router();

const healthChecker = require('./healthChecker')

router.use('/health-checker', healthChecker)

module.exports = router