const kpiCardQuery = {
    getTotalSalesQuery: `
        SELECT 
            YEAR(order_date) AS tahun, 
            SUM(sales) AS total_penjualan
        FROM transactions
        WHERE YEAR(order_date) IN (2017, 2018)
        GROUP BY YEAR(order_date)
        ORDER BY tahun
    `,
    getTotalCustomerQuery: `
        SELECT DISTINCT
            YEAR(order_date) AS tahun, 
            COUNT(customer_id) AS total_customer
        FROM transactions
        WHERE YEAR(order_date) IN (2017, 2018)
        GROUP BY YEAR(order_date)
        ORDER BY tahun
    `,
    getTotalOrderQuery: `
        SELECT
            YEAR(order_date) AS tahun, 
            COUNT(order_id) AS total_order
        FROM transactions
        WHERE YEAR(order_date) IN (2017, 2018)
        GROUP BY YEAR(order_date)
        ORDER BY tahun
    `,
    getTotalAovQuery: `
        SELECT 
            YEAR(order_date) AS tahun,
            ROUND(SUM(sales) / COUNT(DISTINCT order_id), 2) AS average_order_value
        FROM transactions
        WHERE YEAR(order_date) IN (2017, 2018)
        GROUP BY YEAR(order_date)
        ORDER BY tahun
    `
}

module.exports = kpiCardQuery;