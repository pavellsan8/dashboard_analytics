const kpiCardService = require('../services/kpiCardService');

const kpiCardController = {
    async getAllKpis(req, res) {
        try {
            const [totalSales, totalCustomer, totalOrder, totalAov] = await Promise.all([
                kpiCardService.getTotalSalesQuery(),
                kpiCardService.getTotalCustomerQuery(),
                kpiCardService.getTotalOrderQuery(),
                kpiCardService.getTotalAovQuery()
            ]);

            const flattenData = (data) => {
                if (Array.isArray(data) && Array.isArray(data[0])) {
                    return data[0]; // Ambil array pertama
                }
                return data;
            };

            // Function untuk hitung growth
            const calculateGrowth = (data, valueKey) => {
                const flatData = flattenData(data);
                const year2017 = flatData.find(item => item.tahun === 2017);
                const year2018 = flatData.find(item => item.tahun === 2018);
                
                if (!year2017 || !year2018) return null;
                
                const value2017 = parseFloat(year2017[valueKey]);
                const value2018 = parseFloat(year2018[valueKey]);
                
                const growth = ((value2018 - value2017) / value2017 * 100);
                
                return {
                    year2018: value2018,
                    growthFormatted: `${growth > 0 ? '+' : ''}${growth.toFixed(2)}%`
                };
            };

            res.json({
                success: true,
                data: {
                    totalSales: calculateGrowth(totalSales, 'total_penjualan'),
                    totalCustomer: calculateGrowth(totalCustomer, 'total_customer'),
                    totalOrder: calculateGrowth(totalOrder, 'total_order'),
                    totalAov: calculateGrowth(totalAov, 'average_order_value')
                }
            });

        } catch (error) {
            console.error('Error in getAllKpis:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = kpiCardController;