import React, { useState } from 'react'
import {
    SearchIcon,
    FilterIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-react'

export const DetailedTables = ({}) => {
  const [activeTab, setActiveTab] = useState('transactions')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  // Mock data for transactions
  const transactions = [
    {
      id: 'ORD-1234',
      date: '2023-04-15',
      customer: 'ABC Corporation',
      product: 'Dell XPS Laptop',
      category: 'Technology',
      amount: '$1,299.99',
      status: 'Completed',
    },
    {
      id: 'ORD-1235',
      date: '2023-04-16',
      customer: 'XYZ Enterprises',
      product: 'Office Chair',
      category: 'Furniture',
      amount: '$249.99',
      status: 'Completed',
    },
    {
      id: 'ORD-1236',
      date: '2023-04-17',
      customer: 'Smith & Co',
      product: 'Printer Paper',
      category: 'Office Supplies',
      amount: '$45.99',
      status: 'Completed',
    },
    {
      id: 'ORD-1237',
      date: '2023-04-18',
      customer: 'Johnson LLC',
      product: 'Wireless Mouse',
      category: 'Technology',
      amount: '$29.99',
      status: 'Processing',
    },
    {
      id: 'ORD-1238',
      date: '2023-04-19',
      customer: 'Tech Solutions',
      product: 'Filing Cabinet',
      category: 'Furniture',
      amount: '$199.99',
      status: 'Completed',
    },
    {
      id: 'ORD-1239',
      date: '2023-04-20',
      customer: 'Global Traders',
      product: 'Desk Lamp',
      category: 'Office Supplies',
      amount: '$39.99',
      status: 'Shipped',
    },
    {
      id: 'ORD-1240',
      date: '2023-04-21',
      customer: 'City Services',
      product: 'Webcam',
      category: 'Technology',
      amount: '$89.99',
      status: 'Processing',
    },
    {
      id: 'ORD-1241',
      date: '2023-04-22',
      customer: 'First Choice',
      product: 'Bookshelf',
      category: 'Furniture',
      amount: '$159.99',
      status: 'Completed',
    },
    {
      id: 'ORD-1242',
      date: '2023-04-23',
      customer: 'Prime Solutions',
      product: 'Notebooks',
      category: 'Office Supplies',
      amount: '$12.99',
      status: 'Shipped',
    },
    {
      id: 'ORD-1243',
      date: '2023-04-24',
      customer: 'Ace Industries',
      product: 'Tablet',
      category: 'Technology',
      amount: '$499.99',
      status: 'Processing',
    },
    {
      id: 'ORD-1244',
      date: '2023-04-25',
      customer: 'Best Systems',
      product: 'Conference Table',
      category: 'Furniture',
      amount: '$899.99',
      status: 'Completed',
    },
    {
      id: 'ORD-1245',
      date: '2023-04-26',
      customer: 'Elite Corp',
      product: 'Pens (50 pack)',
      category: 'Office Supplies',
      amount: '$24.99',
      status: 'Shipped',
    },
  ]
  // Filter transactions based on search term, category, and region (in a real app)
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (searchTerm === '' ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.product.toLowerCase().includes(searchTerm.toLowerCase())) 
    )
  })
  // Paginate transactions
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Detailed Data</h2>
      </div>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'transactions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'customers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />
        </div>
        <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
          <FilterIcon size={16} className="mr-2" />
          <span>Advanced Filters</span>
        </button>
      </div>
      {/* Transactions Table */}
      {activeTab === 'transactions' && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {transaction.customer}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {transaction.product}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {transaction.category}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium
                        ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing{' '}
              {Math.min(
                filteredTransactions.length,
                (currentPage - 1) * itemsPerPage + 1,
              )}{' '}
              to{' '}
              {Math.min(
                filteredTransactions.length,
                currentPage * itemsPerPage,
              )}{' '}
              of {filteredTransactions.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-1 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeftIcon size={20} />
              </button>
              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>
        </>
      )}
      {/* Placeholder for other tabs */}
      {activeTab !== 'transactions' && (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <p>
            This tab is under development. Please check the Transactions tab for
            detailed data.
          </p>
        </div>
      )}
    </div>
  )
}
