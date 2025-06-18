const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Transaction = require('../models/transaction');
const salesTrendQuery = require('../queries/salesTrendQuery');

class salesTrendService {
    async getTotalSalesQuery() {
        try {
            const result = await Transaction.findAll({
                attributes: [
                    [sequelize.fn('YEAR', sequelize.col('order_date')), 'tahun'],
                    [sequelize.fn('SUM', sequelize.col('sales')), 'total_penjualan']
                ],
                group: ['tahun'],
                order: [['tahun', 'ASC']]
            });

            return result.map(row => ({
                year: row.get('tahun'),
                sales: Number(row.get('total_penjualan'))
            }));
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
                group: ['tahun'],
                order: ['tahun']
            });

            return result.map(row => ({
                year: row.get('tahun'),
                order: Number(row.get('total_order'))
            }));
        } catch (error) {
            throw error;
        }
    }

    async getShipModeStats() {
        try {
            const query = salesTrendQuery.getShipModeStatsQuery;
            const results = await sequelize.query(query, {
                type: QueryTypes.SELECT
            });

            return results.map(item => ({
                shipMode: item.ship_mode,
                years: {
                    '2015': parseInt(item.ship_2015),
                    '2016': parseInt(item.ship_2016),
                    '2017': parseInt(item.ship_2017),
                    '2018': parseInt(item.ship_2018)
                }
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new salesTrendService();