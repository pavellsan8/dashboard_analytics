const kpiCardService = require('../services/kpiCardService');
const { calculateGrowth } = require('../utils/function_utils');

const kpiCardController = {
    async getAllKpis(req, res) {
        try {
            const [totalSales, totalCustomer, totalOrder, totalAov] = await Promise.all([
                kpiCardService.getTotalSalesQuery(),
                kpiCardService.getTotalCustomerQuery(),
                kpiCardService.getTotalOrderQuery(),
                kpiCardService.getTotalAovQuery()
            ]);

            res.json({
                status: 200,
                data: [
                    calculateGrowth(totalSales, 'total_penjualan'),
                    calculateGrowth(totalCustomer, 'total_customer'),
                    calculateGrowth(totalOrder, 'total_order'),
                    calculateGrowth(totalAov, 'average_order_value')
                ]
            });

        } catch (error) {
            console.error('Error in getAllKpis:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
};

module.exports = kpiCardController;