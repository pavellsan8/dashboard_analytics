const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const productPerformanceQuery = require('../queries/productPerformanceQuery');

class productPerformanceService {
    async getCategoryProductStat() {
        try {
            const query = productPerformanceQuery.categoryProductStatsQuery;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            return results.map(item => ({
                category: item.category,
                sales: parseInt(item.sales_2018, 10),
            }));
        } catch (error) {
            throw error;
        }
    }

    async getSubCategoryProductStat() {
        try {
            const query = productPerformanceQuery.subCategoryProductStatsQuery;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            return results.map(item => ({
                subCategory: item.sub_category,
                sales: parseInt(item.sales_2018, 10),
            }));
        } catch (error) {
            throw error;
        }
    }

    async getTopProductSales() {
        try {
            const query = productPerformanceQuery.topProductSalesDataQuery;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            return results.map(item => ({
                productName: item.product_name,
                category: item.category,
                sales: parseInt(item.sales_2018, 10), 
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new productPerformanceService();