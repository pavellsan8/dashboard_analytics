const regionStatsService = require('../services/regionStatsService');

const regionStatsController = {
    async getTopRegionSalesData(req, res) {
        try {
            const topRegionSales = await regionStatsService.getTopRegionSales(req);

            res.status(200).json({
                status: 200,
                data: topRegionSales // The growth calculation is already handled in the service
            });
        } catch (error) {
            console.error('Error in getTopRegionSalesData:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
};

module.exports = regionStatsController;