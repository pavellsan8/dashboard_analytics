const regionStatsQuery = {
    getTopRegionSalesQuery: `
        SELECT 
            c.country,
            SUM(CASE WHEN YEAR(a.order_date) = 2017 THEN a.sales ELSE 0 END) AS sales_2017,
            SUM(CASE WHEN YEAR(a.order_date) = 2018 THEN a.sales ELSE 0 END) AS sales_2018
        FROM transactions a
        JOIN customers b 
            ON a.customer_id = b.customer_id
        JOIN locations c 
            ON b.postal_code = c.postal_code
        GROUP BY c.country
        ORDER BY sales_2018 DESC
        LIMIT 5
    `,
}

module.exports = regionStatsQuery;