import React, { useState } from 'react';
import KPIOverview from './components/KPI/kpiOverview';
import Sidebar  from './components/Sidebar/Sidebar';
import { GeographicAnalysis } from './components/Geographic/Geographic';
import { CustomerInsights } from './components/Customer/Customer';

import './styles/App.css';

function App() {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const resetFilters = () => {
    setSelectedRegion('all')
    setSelectedCategory('all')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          resetFilters={resetFilters}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Sales Dashboard
          </h1>
          <KPIOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm h-full">
              <GeographicAnalysis selectedRegion={selectedRegion} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm h-full">
              <CustomerInsights selectedRegion={selectedRegion} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App