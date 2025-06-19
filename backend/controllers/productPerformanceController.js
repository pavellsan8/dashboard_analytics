const productPerformanceService = require('../services/productPerformanceService');

const productPerformanceController = {
    async getCategoryStats(req, res) {
        try {
            const categoryStats = await productPerformanceService.getCategoryProductStat();
            
            res.status(200).json({
                status: 200,
                data: categoryStats
            });
        } catch (error) {
            console.error('Error in getCategoryStats:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    },

    async getSubCategoryStats(req, res) {
        try {
            const subCategoryStats = await productPerformanceService.getSubCategoryProductStat();
            
            res.status(200).json({
                status: 200,
                data: subCategoryStats
            });
        } catch (error) {
            console.error('Error in getSubCategoryStats:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    },

    async getTopProducts(req, res) {
        try {
            const topProducts = await productPerformanceService.getTopProductSales(req);
            
            res.status(200).json({
                status: 200,
                data: topProducts
            });
        } catch (error) {
            console.error('Error in getTopProducts:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
};

module.exports = productPerformanceController;