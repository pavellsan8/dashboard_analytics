const salesTrendQuery = {
    getTotalSalesStatsQuery: `
        SELECT 
            YEAR(order_date) AS tahun, 
            SUM(sales) AS total_penjualan
        FROM transactions
        GROUP BY YEAR(order_date)
        ORDER BY tahun
    `,
    getTotalOrderStatsQuery: `
        SELECT
            YEAR(order_date) AS tahun, 
            COUNT(order_id) AS total_order
        FROM transactions
        GROUP BY YEAR(order_date)
        ORDER BY tahun
    `,
    getShipModeStatsQuery: `
        SELECT 
            ship_mode,
            SUM(CASE WHEN YEAR(order_date) = 2015 THEN 1 ELSE 0 END) AS ship_2015,
            SUM(CASE WHEN YEAR(order_date) = 2016 THEN 1 ELSE 0 END) AS ship_2016,
            SUM(CASE WHEN YEAR(order_date) = 2017 THEN 1 ELSE 0 END) AS ship_2017,
            SUM(CASE WHEN YEAR(order_date) = 2018 THEN 1 ELSE 0 END) AS ship_2018
        FROM transactions
        GROUP BY ship_mode
        ORDER BY ship_mode
    `
}

module.exports = salesTrendQuery;