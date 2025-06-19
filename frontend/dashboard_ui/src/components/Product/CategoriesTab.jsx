import { useState, useEffect } from 'react'
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

// Import your API function
import { getCategorySalesData } from '../../services/Api'

export const CategoriesTab = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await getCategorySalesData()
        
        const apiData = response.data || response || []
        const chartData = apiData.map(item => ({
          name: item.category,
          sales: item.sales,
          color: getColorForCategory(item.category)
        }))
        
        setData(chartData)
        setError(null)
      } catch (err) {
        setError('Failed to load category data')
        console.error('Error loading category data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getColorForCategory = (category) => {
    const colors = {
      'Furniture': '#3B82F6',
      'Office Supplies': '#10B981',
      'Technology': '#6366F1',
    }
    return colors[category] || '#8B5CF6'
  }

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-gray-500">Loading category data...</div>
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
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
          />
          <Legend />
          <Bar dataKey="sales" name="Sales ($)" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}