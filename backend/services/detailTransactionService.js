const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const detailTransactionQuery = require('../queries/detailTransactionQuery');

class DetailTransactionService {
    async getListDetailTransaction() {
        try {
            const results = await sequelize.query(
                detailTransactionQuery.getListDetailTransactionQuery,
                {
                    type: QueryTypes.SELECT
                }
            );

            return results.map(item => ({
                orderId: item.order_id,
                orderDate: item.order_date,
                customerName: item.customer_name,
                productName: item.product_name,
                category: item.category,
                status: item.status
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new DetailTransactionService();