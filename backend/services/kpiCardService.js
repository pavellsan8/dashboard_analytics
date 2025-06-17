const db = require('../config/database')
const queries = require('../queries/kpiCardQuery')

class kpiCardService {
    async getTotalSalesQuery() {
        try {
            const result = await db.query(queries.getTotalSalesQuery)
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalCustomerQuery() {
        try {
            const result = await db.query(queries.getTotalCustomerQuery)
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalOrderQuery() {
        try {
            const result = await db.query(queries.getTotalOrderQuery)
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotalAovQuery() {
        try {
            const result = await db.query(queries.getTotalAovQuery)
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new kpiCardService();