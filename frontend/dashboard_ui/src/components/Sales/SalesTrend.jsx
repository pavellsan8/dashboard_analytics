import React, { useState } from 'react'
import { SalesTab } from './SalesTab'
import { OrdersTab } from './OrdersTab'
import { ShipModeTab } from './ShipModeTab'

export const SalesTrends = () => {
  const [activeTab, setActiveTab] = useState('sales')

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'sales':
        return <SalesTab />
      case 'orders':
        return <OrdersTab />
      case 'shipmode':
        return <ShipModeTab />
      default:
        return <SalesTab />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Sales Trends</h2>
        <div className="text-sm text-gray-500 capitalize">Yearly Data</div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium focus:outline-none border-0 bg-transparent rounded-none ${
            activeTab === 'sales' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium focus:outline-none border-0 bg-transparent rounded-none ${
            activeTab === 'orders' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium focus:outline-none border-0 bg-transparent rounded-none ${
            activeTab === 'shipmode' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('shipmode')}
        >
          Ship Mode
        </button>
      </div>

      {/* Tab Content */}
      {renderActiveTab()}
    </div>
  )
}