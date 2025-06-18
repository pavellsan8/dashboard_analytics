const detailTransactionService = require('../services/detailTransactionService');

const detailTransactionController = {
    async getListDetailTransaction(req, res) {
        try {
            const transactions = await detailTransactionService.getListDetailTransaction();
            
            res.status(200).json({
                status: 200,
                data: transactions
            });
        } catch (error) {
            console.error('Error in getListDetailTransaction:', error);
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
};

module.exports = detailTransactionController;