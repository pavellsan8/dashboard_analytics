import React, { useState, useEffect } from 'react';
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getTransactionDetailData } from '../../services/Api';

export const DetailedTables = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionDetailData();
        setTransactions(data || []);
      } catch (err) {
        setError('Failed to fetch transaction data');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction || !searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Search across multiple fields with proper null checks
    const searchFields = [
      transaction.orderId?.toString(),
      transaction.order_id?.toString(), // Handle both naming conventions
      transaction.customerName,
      transaction.customer_name, // Handle both naming conventions
      transaction.productName,
      transaction.product_name, // Handle both naming conventions
      transaction.category,
      transaction.status
    ];
    
    return searchFields.some(field => 
      field && field.toString().toLowerCase().includes(searchLower)
    );
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Adjust current page if it exceeds total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage === 1) {
      return [1, 2, 3];
    } else if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading transactions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500 text-center">
            <p className="mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* Header and Search Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Detailed Transactions Data</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search by Order ID, Customer, Product..."
            className="pl-10 pr-10 py-2 border border-gray-300 rounded w-full bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchIcon size={18} className="absolute left-3 top-2.5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredTransactions.length} result{filteredTransactions.length !== 1 ? 's' : ''} for "{searchTerm}"
        </div>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction, index) => (
                <tr key={transaction.rowId || transaction.orderId || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.orderId || transaction.order_id || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.orderDate || transaction.order_date 
                      ? new Date(transaction.orderDate || transaction.order_date).toLocaleDateString()
                      : 'N/A'
                    }
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.customerName || transaction.customer_name || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.productName || transaction.product_name || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.category || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'Complete'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : transaction.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {transaction.status || 'Unknown'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  {searchTerm ? 'No transactions found matching your search.' : 'No transactions available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Only show if there are results */}
      {filteredTransactions.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing{' '}
            {Math.min(filteredTransactions.length, (currentPage - 1) * itemsPerPage + 1)} to{' '}
            {Math.min(filteredTransactions.length, currentPage * itemsPerPage)} of{' '}
            {filteredTransactions.length} entries
            {searchTerm && ` (filtered from ${transactions.length} total)`}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-1 rounded transition-colors ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeftIcon size={20} />
              </button>
              
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full transition-colors ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-1 rounded transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};