import { useEffect, useState } from 'react'
import { TrendingUpIcon, TrendingDownIcon, Loader2 } from 'lucide-react'
import { getTopRegionData } from '../../services/Api'

export const GeographicAnalysis = ({ selectedRegion = 'all' }) => {
  const [topRegions, setTopRegions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRegionData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = selectedRegion !== 'all' ? { state: selectedRegion } : {};
        const data = await getTopRegionData(params);
        setTopRegions(data || []);
      } catch (err) {
        setError('Failed to load region data')
        console.error('Error fetching region data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRegionData()
  }, [selectedRegion]);

  const getRegionDisplay = () => {
    if (!selectedRegion || selectedRegion === 'all') {
      return 'All Regions'
    }
    return `Region: ${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Top Region Sales
        </h2>
        <div className="text-sm text-gray-500">
          {getRegionDisplay()}
        </div>
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span className="text-gray-500">Loading region data...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
            >
              Try again
            </button>
          </div>
        ) : topRegions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No data available for the selected filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topRegions.map((region, index) => (
                  <tr key={region.id || index}>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {region.name || region.region_name || region.state}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {typeof region.sales === 'number' 
                        ? `$${region.sales.toLocaleString()}` 
                        : `$${region.sales}`}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <div
                        className={`flex items-center ${
                          (region.growth || '').toString().startsWith('+') || 
                          (typeof region.growth === 'number' && region.growth > 0)
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`}
                      >
                        {((region.growth || '').toString().startsWith('+') || 
                          (typeof region.growth === 'number' && region.growth > 0)) ? (
                          <TrendingUpIcon size={16} className="mr-1" />
                        ) : (
                          <TrendingDownIcon size={16} className="mr-1" />
                        )}
                        {typeof region.growth === 'number' 
                          ? `${region.growth > 0 ? '+' : ''}${region.growth}%`
                          : region.growth}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}