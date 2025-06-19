const transactionDetailQuery = {
    getListDetailTransactionQuery: `
        SELECT
            a.row_id,
            a.order_id,
            a.order_date,
            b.customer_name,
            c.product_name, 
            c.category,
            CASE 
                WHEN a.sales != 0 THEN 'Complete'
                ELSE 'Pending'
            END AS status
        FROM transactions a
        JOIN customers b
        ON a.customer_id = b.customer_id
        JOIN products c
        ON a.product_id = c.product_id
        WHERE YEAR(a.order_date) = 2018
        ORDER BY a.order_date DESC
        LIMIT 50
    `
}

module.exports = transactionDetailQuery;