const productPerformanceQuery = {
    categoryProductStatsQuery: `
        SELECT 
            b.category,
            SUM(CASE WHEN YEAR(a.order_date) = 2018 THEN a.sales ELSE 0 END) AS sales_2018
        FROM transactions a
        JOIN products b
            ON a.product_id = b.product_id
        GROUP BY b.category
        ORDER BY sales_2018 desc
    `,
    subCategoryProductStatsQuery: `
        SELECT 
            b.sub_category,
            SUM(CASE WHEN YEAR(a.order_date) = 2018 THEN a.sales ELSE 0 END) AS sales_2018
        FROM transactions a
        JOIN products b
            ON a.product_id = b.product_id
        GROUP BY b.sub_category
        ORDER BY sales_2018 desc
    `,
    topProductSalesDataQuery: `
        SELECT 
            b.product_name,
            MAX(b.category) AS category,
            SUM(CASE WHEN YEAR(a.order_date) = 2018 THEN a.sales ELSE 0 END) AS sales_2018
        FROM transactions a
        JOIN products b
            ON a.product_id = b.product_id
        GROUP BY b.product_id
        ORDER BY sales_2018 desc
        LIMIT 5
    `
}

module.exports = productPerformanceQuery;