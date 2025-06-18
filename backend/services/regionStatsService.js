const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const { calculateGrowthBetweenValues } = require('../utils/function_utils')
const regionStatsQuery = require('../queries/regionStatsQuery')

const getTopRegionSales = async () => {
    try {
        const query = regionStatsQuery.getTopRegionSalesQuery

        const results = await sequelize.query(query, {
            type: QueryTypes.SELECT
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
        throw error;
    }
};

module.exports = { getTopRegionSales };