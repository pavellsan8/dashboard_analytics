const { Op } = require('sequelize');
const sequelize = require('../config/database');
const Transaction = require('../models/transaction');

class kpiCardService {
    async getTotalSalesQuery() {
        try {
            const result = await Transaction.findAll({
                attributes: [
                    [sequelize.fn('YEAR', sequelize.col('order_date')), 'tahun'],
                    [sequelize.fn('SUM', sequelize.col('sales')), 'total_penjualan']
                ],
                where: sequelize.where(sequelize.fn('YEAR', sequelize.col('order_date')), {
                    [Op.in]: [2017, 2018]
                }),
                group: ['tahun'],
                order: ['tahun']
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalCustomerQuery() {
        try {
            const result = await Transaction.findAll({
                attributes: [
                    [sequelize.fn('YEAR', sequelize.col('order_date')), 'tahun'],
                    [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('customer_id'))), 'total_customer']
                ],
                where: sequelize.where(sequelize.fn('YEAR', sequelize.col('order_date')), {
                    [Op.in]: [2017, 2018]
                }),
                group: ['tahun'],
                order: ['tahun']
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalOrderQuery() {
        try {
            const result = await Transaction.findAll({
                attributes: [
                    [sequelize.fn('YEAR', sequelize.col('order_date')), 'tahun'],
                    [sequelize.fn('COUNT', sequelize.col('order_id')), 'total_order']
                ],
                where: sequelize.where(sequelize.fn('YEAR', sequelize.col('order_date')), {
                    [Op.in]: [2017, 2018]
                }),
                group: ['tahun'],
                order: ['tahun']
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalAovQuery() {
        try {
            const result = await Transaction.findAll({
                attributes: [
                    [sequelize.fn('YEAR', sequelize.col('order_date')), 'tahun'],
                    [
                        sequelize.literal('ROUND(SUM(sales) / COUNT(DISTINCT order_id), 2)'),
                        'average_order_value'
                    ]
                ],
                where: sequelize.where(sequelize.fn('YEAR', sequelize.col('order_date')), {
                    [Op.in]: [2017, 2018]
                }),
                group: ['tahun'],
                order: ['tahun']
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new kpiCardService();