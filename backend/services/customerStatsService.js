const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const customerStatsQuery = require('../queries/customerStatsQuery');

class customerSegmentService {
    async getPercentageSegmentStat() {
        try {
            const query = customerStatsQuery.customerPercentageSegmentQuery
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            return results.map(item => ({
                segment: item.segment,
                total: parseInt(item.jumlah_segment),
                percentage: parseFloat(item.persentase_segment).toFixed(2) + '%'
            }));
        } catch (error) {
            throw error;
        }
    }
    
    async getTopCustomerSales() {
        try {
            const query = customerStatsQuery.topCustomerSalesStats;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            return results.map(item => ({
                customerName: item.customer_name,
                segment: item.segment,
                sales2018: parseFloat(item.sales_2018).toFixed(2)
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new customerSegmentService();