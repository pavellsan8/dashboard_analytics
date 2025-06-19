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

import { getSubCategorySalesData } from '../../services/Api'

export const SubcategoriesTab = ({}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await getSubCategorySalesData()
        
        const apiData = response.data || response || []
        let chartData = apiData.map(item => ({
          name: item.subCategory,
          sales: item.sales,
        }))
        
        setData(chartData)
        setError(null)
      } catch (err) {
        setError('Failed to load subcategory data')
        console.error('Error loading subcategory data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

//   const filterByCategory = (data, category) => {
//     const categoryMapping = {
//       furniture: ['Chairs', 'Tables', 'Storage'],
//       'office supplies': ['Paper', 'Binders', 'Art'],
//       technology: ['Phones', 'Computers', 'Accessories', 'Appliances']
//     }
    
//     const subcategories = categoryMapping[category.toLowerCase()] || []
//     return data.filter(item => subcategories.includes(item.name))
//   }

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-gray-500">Loading subcategory data...</div>
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