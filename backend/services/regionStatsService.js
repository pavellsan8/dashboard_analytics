const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const { calculateGrowthBetweenValues } = require('../utils/function_utils');
const regionStatsQuery = require('../queries/regionStatsQuery');

const getTopRegionSales = async (req) => {
    try {
        const state = req.query.state || null;
        let query = regionStatsQuery.getTopRegionSalesBaseQuery;

        const replacements = [];
        if (state) {
            query += ` AND c.state = ?`;
            replacements.push(state);
        }

        query += regionStatsQuery.getTopRegionSalesSuffix;
        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements,
        });

        return results.map(item => ({
            country: item.country,
            year2018: parseFloat(item.sales_2018),
            growthFormatted: calculateGrowthBetweenValues(
                parseFloat(item.sales_2018),
                parseFloat(item.sales_2017)
            )
        }));
    } catch (error) {
        console.error('Error in getTopRegionSales:', error);
        throw error;
    }
};

module.exports = { getTopRegionSales };