import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const SalesTrends = ({ timeRange }) => {
  const [activeTab, setActiveTab] = useState('sales')
  // Generate data based on time range
  const generateData = () => {
    if (timeRange === 'daily') {
      return Array.from(
        {
          length: 30,
        },
        (_, i) => ({
          name: `Day ${i + 1}`,
          sales: Math.floor(Math.random() * 50000) + 30000,
          orders: Math.floor(Math.random() * 500) + 300,
          standard: Math.floor(Math.random() * 200) + 150,
          express: Math.floor(Math.random() * 150) + 100,
          priority: Math.floor(Math.random() * 100) + 50,
        }),
      )
    } else if (timeRange === 'yearly') {
      return Array.from(
        {
          length: 5,
        },
        (_, i) => ({
          name: `${2019 + i}`,
          sales: Math.floor(Math.random() * 1000000) + 800000,
          orders: Math.floor(Math.random() * 10000) + 8000,
          standard: Math.floor(Math.random() * 5000) + 4000,
          express: Math.floor(Math.random() * 3000) + 2000,
          priority: Math.floor(Math.random() * 2000) + 1000,
        }),
      )
    } else {
      // monthly
      return Array.from(
        {
          length: 12,
        },
        (_, i) => ({
          name: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ][i],
          sales: Math.floor(Math.random() * 200000) + 100000,
          orders: Math.floor(Math.random() * 2000) + 1000,
          standard: Math.floor(Math.random() * 1000) + 500,
          express: Math.floor(Math.random() * 600) + 300,
          priority: Math.floor(Math.random() * 400) + 200,
        }),
      )
    }
  }
  const data = generateData()
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Sales Trends</h2>
        <div className="text-sm text-gray-500 capitalize">{timeRange} view</div>
      </div>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'sales' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'shipmode' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('shipmode')}
        >
          Ship Mode
        </button>
      </div>
      <div className="h-[400px]">
        {activeTab === 'sales' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
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
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales ($)"
                stroke="#3B82F6"
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {activeTab === 'orders' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
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
              <Line
                type="monotone"
                dataKey="orders"
                name="Order Count"
                stroke="#10B981"
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {activeTab === 'shipmode' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
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
              <Line
                type="monotone"
                dataKey="standard"
                name="Standard"
                stroke="#3B82F6"
              />
              <Line
                type="monotone"
                dataKey="express"
                name="Express"
                stroke="#10B981"
              />
              <Line
                type="monotone"
                dataKey="priority"
                name="Priority"
                stroke="#6366F1"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
