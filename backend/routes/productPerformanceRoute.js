const express = require('express');
const router = express.Router();
const productPerformanceController = require('../controllers/productPerformanceController');

router.get('/category-stats', productPerformanceController.getCategoryStats);
router.get('/sub-category-stats', productPerformanceController.getSubCategoryStats);
router.get('/top-products', productPerformanceController.getTopProducts);

module.exports = router;