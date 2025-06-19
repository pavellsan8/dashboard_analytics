const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const customerStatsQuery = require('../queries/customerStatsQuery');

class customerSegmentService {
    async getPercentageSegmentStat(req) {
        try {
            const state = req.query.state || null;
            let query = customerStatsQuery.customerPercentageSegmentBaseQuery;

            const replacements = [];
            if (state) {
                query += ` AND c.state = ?`;
                replacements.push(state);
            }

            query += customerStatsQuery.customerPercentageSegmentSuffix;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements,
            });

            return results.map(item => ({
                segment: item.segment,
                total: parseInt(item.jumlah_segment),
                percentage: parseFloat(item.persentase_segment).toFixed(2) + '%',
            }));
        } catch (error) {
            console.error('Error in getPercentageSegmentStat:', error);
            throw error;
        }
    }

    async getTopCustomerSales(req) {
        try {
            const state = req.query.state || null;
            let query = customerStatsQuery.topCustomerSalesBaseQuery;

            const replacements = [];
            if (state) {
                query += ` WHERE c.state = ?`;
                replacements.push(state);
            }

            query += customerStatsQuery.topCustomerSalesSuffix;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements,
            });

            return results.map(item => ({
                customerName: item.customer_name,
                segment: item.segment,
                sales2018: parseInt(item.sales_2018, 10),
            }));
        } catch (error) {
            console.error('Error in getTopCustomerSales:', error);
            throw error;
        }
    }
}

module.exports = new customerSegmentService();