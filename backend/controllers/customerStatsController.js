const customerStatsService = require('../services/customerStatsService');

const customerStatsController = {
    async getCustomerStats(req, res) {
        try {
            const [segmentStats, topCustomers] = await Promise.all([
                customerStatsService.getPercentageSegmentStat(req),
                customerStatsService.getTopCustomerSales(req)
            ]);

            res.status(200).json({
                status: 200,
                data: {
                    customerSegments: segmentStats,
                    topCustomers: topCustomers
                }
            });
        } catch (error) {
            console.error('Error in getCustomerStats:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
};

module.exports = customerStatsController;