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

    async getTopProductSales(req) {
        try {
            const category = req.query.category || null;
            let query = productPerformanceQuery.topProductSalesBaseQuery;

            const replacements = [];
            if (category) {
                query += ` WHERE b.category = ?`;
                replacements.push(category);
            }

            query += productPerformanceQuery.topProductSalesSuffix;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements,
            });

            return results.map(item => ({
                productName: item.product_name,
                category: item.category,
                subCategory: item.sub_category,
                sales: parseInt(item.sales_2018, 10),
            }));
        } catch (error) {
            console.error('Error in getTopProductSales:', error);
            throw error;
        }
    }
}

module.exports = new productPerformanceService();