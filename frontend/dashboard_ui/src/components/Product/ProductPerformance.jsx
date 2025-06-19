import { useState } from 'react'
import { CategoriesTab } from './CategoriesTab'
import { SubcategoriesTab } from './SubCategoryTab'
import { TopProductsTab } from './TopProductsTabs'

export const ProductPerformance = ({ selectedCategory }) => {
  const [activeTab, setActiveTab] = useState('categories')

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
          className={`py-2 px-4 text-sm font-medium focus:outline-none border-0 bg-transparent rounded-none ${
            activeTab === 'categories' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium focus:outline-none border-0 bg-transparent rounded-none ${
            activeTab === 'subcategories' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('subcategories')}
        >
          Subcategories
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium focus:outline-none border-0 bg-transparent rounded-none ${
            activeTab === 'products' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Top Products
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'categories' && <CategoriesTab />}
      {activeTab === 'subcategories' && <SubcategoriesTab />}
      {activeTab === 'products' && <TopProductsTab selectedCategory={selectedCategory} />}
    </div>
  )
}