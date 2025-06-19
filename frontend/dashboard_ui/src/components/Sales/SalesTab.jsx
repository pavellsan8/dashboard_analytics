import React, { useState, useEffect } from 'react'
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
import { getTotalSalesData } from '../../services/Api' // Adjust import path

export const SalesTab = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true)
        const response = await getTotalSalesData()

        let apiData = null
        if (response && response.status === 200 && response.data) {
          apiData = response.data
        } else if (response && Array.isArray(response)) {
          apiData = response
        } else if (response && response.data && Array.isArray(response.data)) {
          apiData = response.data
        }
        
        if (apiData && Array.isArray(apiData)) {
          const transformedData = apiData.map(item => {
            return {
              name: item.year ? item.year.toString() : 'Unknown',
              sales: item.sales || 0
            }
          })
          
          if (transformedData.length > 0) {
            setData(transformedData)
          } else {
            setError('No valid data to display')
          }
        } else {
          setError('Invalid data format received from API')
        }
      } catch (err) {
        setError('Failed to fetch sales data')
        console.error('Error fetching sales data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSalesData()
  }, [])

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-gray-500">Loading sales data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-gray-500">No data available</div>
      </div>
    )
  }

  return (
    <div className="h-[400px]">
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
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
          />
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
    </div>
  )
}