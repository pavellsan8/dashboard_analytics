const customerStatsQuery = {
    customerPercentageSegmentBaseQuery: `
        SELECT 
            b.segment,
            COUNT(*) AS jumlah_segment,
            COUNT(*) * 100.0 / (SELECT COUNT(*) 
                                FROM transactions a
                                JOIN customers b
                                ON a.customer_id = b.customer_id
                                WHERE YEAR(a.order_date) = 2018) AS persentase_segment
        FROM transactions a
        JOIN customers b
            ON a.customer_id = b.customer_id
        JOIN locations c
            ON b.postal_code = c.postal_code
        WHERE YEAR(a.order_date) = 2018
    `,
    customerPercentageSegmentSuffix: `
        GROUP BY b.segment
        ORDER BY jumlah_segment DESC
    `,
    topCustomerSalesBaseQuery: `
        SELECT 
            b.customer_name,
            MAX(b.segment) AS segment,
            SUM(CASE WHEN YEAR(a.order_date) = 2018 THEN a.sales ELSE 0 END) AS sales_2018
        FROM transactions a
        JOIN customers b
            ON a.customer_id = b.customer_id
        JOIN locations c
            ON b.postal_code = c.postal_code
    `,
    topCustomerSalesSuffix: `
        GROUP BY b.customer_name
        ORDER BY sales_2018 DESC
        LIMIT 5
    `,
};

module.exports = customerStatsQuery;