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
import { getShipModeData } from '../../services/Api'

export const ShipModeTab = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchShipModeData = async () => {
      try {
        setLoading(true)
        const response = await getShipModeData()

        let apiData = null
        if (response && response.status === 200 && response.data) {
          apiData = response.data
        } else if (response && Array.isArray(response)) {
          apiData = response
        } else if (response && response.data && Array.isArray(response.data)) {
          apiData = response.data
        }
        
        if (apiData && Array.isArray(apiData) && apiData.length > 0) {
          const firstItem = apiData[0]
          if (firstItem && firstItem.years) {
            const years = Object.keys(firstItem.years)
            
            const transformedData = years.map(year => {
              const yearData = { name: year }
              
              apiData.forEach(shipModeItem => {
                const cleanKey = shipModeItem.shipMode.toLowerCase().replace(/\s+/g, '')
                yearData[cleanKey] = shipModeItem.years[year] || 0
              })
              
              return yearData
            })
            
            if (transformedData.length > 0) {
              setData(transformedData)
            } else {
              setError('No valid ship mode data to display')
            }
          } else {
            setError('Invalid ship mode data structure')
          }
        } else {
          setError('Invalid data format received from API')
        }
      } catch (err) {
        setError('Failed to fetch ship mode data')
        console.error('Error fetching ship mode data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchShipModeData()
  }, [])

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-gray-500">Loading ship mode data...</div>
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
        <div className="text-gray-500">No ship mode data available</div>
      </div>
    )
  }

  // Define colors for different ship modes
  const colors = {
    firstclass: '#3B82F6',
    sameday: '#EF4444',
    secondclass: '#10B981',
    standardclass: '#6366F1'
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
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              value.toLocaleString(), 
              name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')
            ]}
          />
          <Legend 
            formatter={(value) => 
              value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1')
            }
          />
          <Line
            type="monotone"
            dataKey="firstclass"
            name="First Class"
            stroke={colors.firstclass}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="sameday"
            name="Same Day"
            stroke={colors.sameday}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="secondclass"
            name="Second Class"  
            stroke={colors.secondclass}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="standardclass"
            name="Standard Class"
            stroke={colors.standardclass}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}