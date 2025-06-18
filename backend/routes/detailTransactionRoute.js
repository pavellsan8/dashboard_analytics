const express = require('express');
const router = express.Router();
const detailTransactionController = require('../controllers/detailTransactionController');

router.get('/', detailTransactionController.getListDetailTransaction);

module.exports = router;