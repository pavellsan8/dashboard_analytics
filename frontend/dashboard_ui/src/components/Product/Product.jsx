import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const ProductPerformance = ({ selectedCategory }) => {
  const [activeTab, setActiveTab] = useState('categories')
  const categoryData = [
    {
      name: 'Furniture',
      sales: 482000,
      profit: 96400,
      color: '#3B82F6',
    },
    {
      name: 'Office Supplies',
      sales: 356000,
      profit: 85440,
      color: '#10B981',
    },
    {
      name: 'Technology',
      sales: 620200,
      profit: 124040,
      color: '#6366F1',
    },
  ]
  const subcategoryData = [
    {
      name: 'Chairs',
      category: 'Furniture',
      sales: 182000,
      profit: 36400,
    },
    {
      name: 'Tables',
      category: 'Furniture',
      sales: 154000,
      profit: 30800,
    },
    {
      name: 'Storage',
      category: 'Furniture',
      sales: 146000,
      profit: 29200,
    },
    {
      name: 'Paper',
      category: 'Office Supplies',
      sales: 98000,
      profit: 23520,
    },
    {
      name: 'Binders',
      category: 'Office Supplies',
      sales: 87000,
      profit: 20880,
    },
    {
      name: 'Art',
      category: 'Office Supplies',
      sales: 78000,
      profit: 18720,
    },
    {
      name: 'Phones',
      category: 'Technology',
      sales: 245000,
      profit: 49000,
    },
    {
      name: 'Computers',
      category: 'Technology',
      sales: 198000,
      profit: 39600,
    },
    {
      name: 'Accessories',
      category: 'Technology',
      sales: 177200,
      profit: 35440,
    },
  ]
  // Filter subcategories based on selected category
  const filteredSubcategories =
    selectedCategory === 'all'
      ? subcategoryData
      : subcategoryData.filter(
          (item) => item.category.toLowerCase() === selectedCategory,
        )
  // Top products data
  const topProducts = [
    {
      name: 'Dell XPS 15 Laptop',
      category: 'Technology',
      sales: '$124,500',
      profit: '$31,125',
    },
    {
      name: 'Herman Miller Aeron Chair',
      category: 'Furniture',
      sales: '$98,750',
      profit: '$29,625',
    },
    {
      name: 'iPhone 13 Pro',
      category: 'Technology',
      sales: '$87,300',
      profit: '$26,190',
    },
    {
      name: 'HP LaserJet Printer',
      category: 'Technology',
      sales: '$65,420',
      profit: '$16,355',
    },
    {
      name: 'Standing Desk',
      category: 'Furniture',
      sales: '$58,900',
      profit: '$17,670',
    },
  ]
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Product Performance
        </h2>
        <div className="text-sm text-gray-500">
          {selectedCategory === 'all'
            ? 'All Categories'
            : `Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'subcategories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('subcategories')}
        >
          Subcategories
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('products')}
        >
          Top Products
        </button>
      </div>
      {/* Category Chart */}
      {activeTab === 'categories' && (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Sales ($)" fill="#3B82F6" />
              <Bar dataKey="profit" name="Profit ($)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* Subcategory Chart */}
      {activeTab === 'subcategories' && (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredSubcategories}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Sales ($)" fill="#3B82F6" />
              <Bar dataKey="profit" name="Profit ($)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* Top Products Table */}
      {activeTab === 'products' && (
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
                  Sales
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {product.sales}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {product.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
