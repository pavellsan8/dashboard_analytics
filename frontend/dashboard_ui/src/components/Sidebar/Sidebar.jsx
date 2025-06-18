import {
  MapPin,
  ShoppingBag,
  Filter,
  RefreshCw,
} from 'lucide-react'

function Sidebar({
  selectedRegion,
  setSelectedRegion,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4 hidden md:block">
      <div className="flex items-center justify-center mb-8 mt-2">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
      </div>

      {/* Region Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <MapPin size={18} className="mr-2" />
          <h3 className="font-semibold">Region</h3>
        </div>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-800"
        >
          <option value="all">All Regions</option>
          <option value="west">West</option>
          <option value="east">East</option>
          <option value="central">Central</option>
          <option value="south">South</option>
          <option value="north">North</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3 text-gray-700">
          <ShoppingBag size={18} className="mr-2" />
          <h3 className="font-semibold">Category</h3>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-800"
        >
          <option value="all">All Categories</option>
          <option value="furniture">Furniture</option>
          <option value="office">Office Supplies</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      {/* Reset Filters Button */}
      <div className="mt-4">
        <button className="flex items-center justify-center w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors">
          <RefreshCw size={16} className="mr-2" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar;