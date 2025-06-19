import { useState, useEffect } from 'react';
import {
  Tooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { getCustomerInsightData } from '../../services/Api';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const CustomerInsights = ({ selectedRegion = 'all' }) => {
  const [segmentationData, setSegmentationData] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color mapping for segments
  const segmentColors = {
    'Consumer': '#3B82F6',
    'Corporate': '#10B981',
    'Home Office': '#6366F1'
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Construct the correct endpoint based on selectedRegion
        const endpoint = selectedRegion === 'all' 
          ? '/customer-segment-data' 
          : `/customer-segment-data?state=${selectedRegion}`;
        
        const data = await getCustomerInsightData(endpoint);
        
        if (data && data.customerSegments && data.topCustomers) {
          // Transform customer segments data for pie chart
          const transformedSegments = data.customerSegments.map(segment => ({
            name: segment.segment,
            value: parseFloat(segment.percentage.replace('%', '')),
            color: segmentColors[segment.segment] || '#8884D8',
            total: segment.total
          }));

          // Transform top customers data
          const transformedCustomers = data.topCustomers.map(customer => ({
            name: customer.customerName,
            segment: customer.segment,
            sales: formatCurrency(customer.sales2018)
          }));

          setSegmentationData(transformedSegments);
          setTopCustomers(transformedCustomers);
        } else {
          setError('No data available for the selected region');
        }
      } catch (err) {
        setError('Failed to load customer data');
        console.error('Error fetching customer data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [selectedRegion]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading customer data...</span>
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Customer Segmentation
        </h2>
        <div className="text-sm text-gray-500">
          {selectedRegion === 'all'
            ? 'All Regions'
            : `Region: ${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}`}
        </div>
      </div>
      
      <div className="flex flex-col space-y-6">
        {/* Customer Segmentation Chart */}
        {segmentationData.length > 0 ? (
          <div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentationData}
                    cx="50%"
                    cy="45%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={false}
                  >
                    {segmentationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `${value.toFixed(1)}% (${props.payload.total} customers)`, 
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color }}>
                        {value} ({entry.payload.value.toFixed(1)}%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No segmentation data available
          </div>
        )}
        
        {/* Top Customers */}
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Top Customers
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Segment
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {customer.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {customer.segment}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {customer.sales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;