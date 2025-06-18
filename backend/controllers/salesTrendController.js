const salesTrendService = require('../services/salesTrendService');

const salesTrendController = {
    async getTotalSalesData(req, res) {
        try {
            const totalSalesData = await salesTrendService.getTotalSalesQuery();

            res.status(200).json({
                status: 200,
                data: totalSalesData 
            });
        } catch (error) {
            console.error('Error in getTotalSalesData:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    },

    async getTotalOrderData(req, res) {
        try {
            const totalOrderData = await salesTrendService.getTotalOrderQuery();

            res.status(200).json({
                status: 200,
                data: totalOrderData 
            });
        } catch (error) {
            console.error('Error in getTotalOrderData:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    },

    async getShipModeStatsData(req, res) {
        try {
            const shipModeStatsData = await salesTrendService.getShipModeStats();

            res.status(200).json({
                status: 200,
                data: shipModeStatsData 
            });
        } catch (error) {
            console.error('Error in getShipModeStatsData:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    },
}

module.exports = salesTrendController;