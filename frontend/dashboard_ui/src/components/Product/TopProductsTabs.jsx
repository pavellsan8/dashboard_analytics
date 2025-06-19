import { useState, useEffect } from 'react'

import { getTopProductsData } from '../../services/Api'

export const TopProductsTab = ({ selectedCategory = 'all' }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
        const response = await getTopProductsData(params);
        
        // Updated to match API response structure
        const tableData = response.map(item => ({
          productName: item.productName,
          category: item.category,
          subCategory: item.subCategory,
          sales: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(item.sales)
        }));
        
        setData(tableData);
        setError(null);
      } catch (err) {
        setError('Failed to load top products data');
        console.error('Error loading top products data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-gray-500">Loading top products data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sub Category
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sales
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-2 py-2 text-sm text-gray-900">
                {product.productName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                <span className="inline-flex items-center py-0.5">
                  {product.category}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                <span className="inline-flex items-center py-0.5">
                  {product.subCategory}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-900">
                {product.sales}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}